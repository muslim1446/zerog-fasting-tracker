import SwiftUI

struct DashboardView: View {
    @EnvironmentObject var preferences: PreferencesManager
    @State private var profile: UserProfile?
    @State private var isFasting: Bool = false
    @State private var startTime: Date?
    @State private var elapsedTime: ElapsedTime = .zero
    @State private var timer: Timer?
    @State private var showOnboarding = false

    var body: some View {
        Group {
            if let profile = profile {
                mainContent(profile: profile)
            } else {
                loadingView
            }
        }
        .onAppear(perform: loadProfile)
        .onDisappear(perform: stopTimer)
        .background(DesignTokens.black.ignoresSafeArea())
        .fullScreenCover(isPresented: $showOnboarding) {
            OnboardingView()
                .environmentObject(preferences)
        }
    }

    // MARK: - Loading View

    private var loadingView: some View {
        VStack(spacing: DesignTokens.space2) {
            BrandView(subinfo: "Metabolic timing & wellness estimates")
            Text("Loading your fasting profile…")
                .font(.system(size: DesignTokens.fontBody))
                .foregroundColor(DesignTokens.muted)
                .multilineTextAlignment(.center)
            Button("Set up profile →") {
                showOnboarding = true
            }
            .font(.system(size: DesignTokens.fontBody, weight: .medium))
            .foregroundColor(DesignTokens.accent)
        }
        .padding(.horizontal, DesignTokens.space2)
    }

    // MARK: - Main Content

    private func mainContent(profile: UserProfile) -> some View {
        let phase = FastingAlgorithm.getFastingPhase(
            hoursFasted: elapsedTime.totalHours,
            activityLevel: profile.activityLevel
        )
        let bmr = FastingAlgorithm.calculateBMR(
            weightKg: profile.weight,
            heightCm: profile.height,
            ageYears: profile.age,
            sex: profile.sex
        )
        let tdee = FastingAlgorithm.calculateTDEE(bmr: bmr, activityLevel: profile.activityLevel)
        let hydrationGoal = FastingAlgorithm.calculateHydrationGoal(weightKg: profile.weight)
        let targetHours = Double(profile.targetHours)
        let progressPercentage = (elapsedTime.totalHours / targetHours) * 100
        let calsBurned = isFasting
            ? FastingAlgorithm.calculateCaloriesBurned(tdee: tdee, bmr: bmr, hoursFasted: elapsedTime.totalHours)
            : 0.0
        let fatBurnedGrams = isFasting
            ? FastingAlgorithm.calculateFatBurned(hoursFasted: elapsedTime.totalHours, tdee: tdee, bmr: bmr)
            : 0.0
        let glycogenPct = isFasting
            ? FastingAlgorithm.calculateGlycogenDepletion(hoursFasted: elapsedTime.totalHours, activityLevel: profile.activityLevel)
            : 0.0

        return ScrollView {
            VStack(spacing: DesignTokens.space3) {
                // Nav: Brand + Settings
                HStack {
                    BrandView(subinfo: "Profile: \(profile.username)")
                    Spacer()
                    Button {
                        showOnboarding = true
                    } label: {
                        Image(systemName: "gearshape.fill")
                            .font(.system(size: 18))
                            .foregroundColor(DesignTokens.muted)
                            .frame(width: 40, height: 40)
                            .background(.ultraThinMaterial)
                            .clipShape(ContinuousCornerShape(radius: DesignTokens.radiusInner))
                            .overlay(
                                ContinuousCornerShape(radius: DesignTokens.radiusInner)
                                    .stroke(Color.white.opacity(0.1), lineWidth: 1)
                            )
                    }
                }
                .padding(.top, 8)

                // Target pill
                HStack(spacing: 6) {
                    Image(systemName: "target")
                        .font(.system(size: 11))
                        .foregroundColor(DesignTokens.accent)
                    Text("Target: \(profile.targetHours) hours")
                        .font(.system(size: DesignTokens.fontLabel, weight: .bold))
                        .foregroundColor(DesignTokens.muted)
                        .tracking(.widest)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(.ultraThinMaterial)
                .clipShape(ContinuousCornerShape(radius: DesignTokens.radiusInner))
                .overlay(
                    ContinuousCornerShape(radius: DesignTokens.radiusInner)
                        .stroke(Color.white.opacity(0.1), lineWidth: 1)
                )

                // Phase title + description
                VStack(spacing: 8) {
                    Text(isFasting ? phase.title : "Eating window")
                        .font(.system(size: DesignTokens.fontPhaseTitle, weight: .bold))
                        .foregroundColor(isFasting ? phase.color : .white)
                        .animation(.easeInOut(duration: 1.0), value: phase.id)

                    Text(isFasting
                        ? phase.description
                        : "You are in your eating window. Replenish with nutrient-dense foods when ready to break the fast.")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.muted)
                        .multilineTextAlignment(.center)
                        .lineSpacing(2)
                        .padding(.horizontal, 16)
                }

                // Fasting ring
                FastingRingView(
                    progressPercentage: progressPercentage,
                    hours: elapsedTime.hours,
                    minutes: elapsedTime.minutes,
                    seconds: elapsedTime.seconds,
                    phase: phase
                )

                // Start/End fast button
                GlassButton(
                    title: isFasting ? "End fast" : "Start fast",
                    isAccent: !isFasting
                ) {
                    toggleFast()
                }

                // Estimates note
                Text("Figures are estimates only. Individual metabolism varies.")
                    .font(.system(size: DesignTokens.fontMicro))
                    .foregroundColor(Color.white.opacity(0.2))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 16)

                // Stat grid
                LazyVGrid(columns: [
                    GridItem(.flexible(), spacing: 12),
                    GridItem(.flexible(), spacing: 12)
                ], spacing: 12) {
                    StatCardView(
                        iconName: "flame.fill",
                        iconColor: .orange,
                        label: "Est. calories",
                        value: "\(Int(calsBurned))",
                        unit: "kcal (estimate)"
                    )
                    StatCardView(
                        iconName: "bolt.fill",
                        iconColor: DesignTokens.accent,
                        label: "Fat oxidized",
                        value: String(format: "%.1f", fatBurnedGrams),
                        unit: "grams (estimate)"
                    )
                    StatCardView(
                        iconName: "battery.full.fill",
                        iconColor: .yellow,
                        label: "Glycogen depleted",
                        value: "\(Int(glycogenPct))%",
                        progress: min(100, glycogenPct)
                    )
                    StatCardView(
                        iconName: "drop.fill",
                        iconColor: .blue,
                        label: "Hydration target",
                        value: String(format: "%.1f", hydrationGoal),
                        unit: "liters (H\u{2082}O)"
                    )
                }

                // Legal footer
                FootnoteView()
                    .padding(.top, 8)
            }
            .padding(.horizontal, DesignTokens.space2)
            .padding(.bottom, DesignTokens.space6)
        }
    }

    // MARK: - Timer

    private func startTimer() {
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            guard let start = startTime else { return }
            elapsedTime = ElapsedTime.from(startDate: start)
        }
        // Fire immediately
        if let start = startTime {
            elapsedTime = ElapsedTime.from(startDate: start)
        }
    }

    private func stopTimer() {
        timer?.invalidate()
        timer = nil
    }

    // MARK: - Actions

    private func toggleFast() {
        if isFasting {
            preferences.clearFastingStartTime()
            isFasting = false
            stopTimer()
            elapsedTime = .zero
        } else {
            let now = Date()
            preferences.saveFastingStartTime(now)
            startTime = now
            isFasting = true
            startTimer()
        }
    }

    private func loadProfile() {
        guard let loadedProfile = preferences.loadProfile() else {
            showOnboarding = true
            return
        }
        profile = loadedProfile

        if let savedStart = preferences.loadFastingStartTime() {
            startTime = savedStart
            isFasting = true
            startTimer()
        }
    }
}

#Preview {
    DashboardView()
        .environmentObject(PreferencesManager())
}
