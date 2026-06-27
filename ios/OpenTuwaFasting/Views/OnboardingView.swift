import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject var preferences: PreferencesManager
    @State private var username: String = ""
    @State private var age: String = ""
    @State private var sex: String = "male"
    @State private var weight: String = ""
    @State private var height: String = ""
    @State private var activityLevel: String = "sedentary"
    @State private var targetHours: String = "16"
    @State private var showContent = false

    private let activityOptions: [(value: String, label: String)] = [
        ("sedentary", "Sedentary (little to no exercise)"),
        ("light", "Lightly active (1–3 days/week)"),
        ("moderate", "Moderately active (3–5 days/week)"),
        ("active", "Active (6–7 days/week)"),
        ("very_active", "Very active (physical job / intense)")
    ]

    private let goalOptions: [(value: String, label: String)] = [
        ("12", "12:12 — Circadian rhythm"),
        ("14", "14:10 — Early time-restricted"),
        ("16", "16:8 — Standard intermittent"),
        ("18", "18:6 — Advanced fat burn"),
        ("20", "20:4 — Warrior diet"),
        ("24", "24h+ — Autophagy focus")
    ]

    var body: some View {
        ScrollView {
            VStack(spacing: DesignTokens.space3) {
                // Brand header
                BrandView(subinfo: "Metabolic timing & wellness estimates")
                    .frame(maxWidth: .infinity)
                    .padding(.top, DesignTokens.space5)

                // Form card
                VStack(spacing: DesignTokens.space3) {
                    // Header
                    VStack(spacing: 8) {
                        Text("Biological baseline")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(.white)
                        Text("Calibrate metabolic estimates to your physiology. Data stays on this device only.")
                            .font(.system(size: DesignTokens.fontBody))
                            .foregroundColor(DesignTokens.muted)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.bottom, 8)

                    // Username
                    FormField(label: "USERNAME", icon: "person.fill") {
                        TextField("e.g. reader42", text: $username)
                            .glassInput()
                    }

                    // Age & Sex
                    HStack(spacing: 12) {
                        FormField(label: "AGE", icon: nil) {
                            TextField("Years", text: $age)
                                .keyboardType(.numberPad)
                                .glassInput()
                        }
                        FormField(label: "BIOLOGICAL SEX", icon: nil) {
                            Picker("", selection: $sex) {
                                Text("Male").tag("male")
                                Text("Female").tag("female")
                            }
                            .pickerStyle(.segmented)
                            .tint(DesignTokens.accent)
                        }
                    }

                    // Weight & Height
                    HStack(spacing: 12) {
                        FormField(label: "WEIGHT (KG)", icon: "scalemass.fill") {
                            TextField("e.g. 75.5", text: $weight)
                                .keyboardType(.decimalPad)
                                .glassInput()
                        }
                        FormField(label: "HEIGHT (CM)", icon: "ruler.fill") {
                            TextField("e.g. 175", text: $height)
                                .keyboardType(.numberPad)
                                .glassInput()
                        }
                    }

                    // Activity level
                    FormField(label: "ACTIVITY LEVEL", icon: "figure.run") {
                        Picker("", selection: $activityLevel) {
                            ForEach(activityOptions, id: \.value) { option in
                                Text(option.label).tag(option.value)
                            }
                        }
                        .pickerStyle(.menu)
                        .tint(DesignTokens.accent)
                        .glassInput()
                    }

                    // Fasting goal
                    FormField(label: "FASTING GOAL", icon: "timer") {
                        Picker("", selection: $targetHours) {
                            ForEach(goalOptions, id: \.value) { option in
                                Text(option.label).tag(option.value)
                            }
                        }
                        .pickerStyle(.menu)
                        .tint(DesignTokens.accent)
                        .glassInput()
                    }

                    // Save button
                    GlassButton(title: "Save profile & continue", isAccent: true) {
                        saveProfile()
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top, 8)

                    // Disclaimer
                    Text("OpenTuwa Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.")
                        .font(.system(size: DesignTokens.fontMicro))
                        .foregroundColor(Color.white.opacity(0.2))
                        .multilineTextAlignment(.center)
                        .lineSpacing(2)
                }
                .padding(DesignTokens.space3)
                .glassCard()
                .padding(.horizontal, DesignTokens.space2)
            }
            .padding(.bottom, DesignTokens.space6)
        }
        .background(DesignTokens.black.ignoresSafeArea())
        .onAppear {
            loadExistingProfile()
        }
    }

    private func loadExistingProfile() {
        guard let profile = preferences.loadProfile() else { return }
        username = profile.username
        age = String(profile.age)
        sex = profile.sex
        weight = String(profile.weight)
        height = String(profile.height)
        activityLevel = profile.activityLevel
        targetHours = String(profile.targetHours)
    }

    private func saveProfile() {
        guard let ageInt = Int(age),
              let weightDouble = Double(weight),
              let heightDouble = Double(height),
              !username.isEmpty else { return }

        let profile = UserProfile(
            username: username,
            age: ageInt,
            sex: sex,
            weight: weightDouble,
            height: heightDouble,
            activityLevel: activityLevel,
            targetHours: Int(targetHours) ?? 16
        )
        preferences.saveProfile(profile)
    }
}

struct FormField<Content: View>: View {
    let label: String
    let icon: String?
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 6) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 12))
                        .foregroundColor(DesignTokens.muted)
                }
                Text(label)
                    .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                    .foregroundColor(DesignTokens.muted)
                    .tracking(.wider)
            }
            content
        }
    }
}

#Preview {
    OnboardingView()
        .environmentObject(PreferencesManager())
}
