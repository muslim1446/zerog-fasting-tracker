import SwiftUI

@main
struct OpenTuwaFastingApp: App {
    @StateObject private var preferences = PreferencesManager()

    var body: some Scene {
        WindowGroup {
            RootRouterView()
                .environmentObject(preferences)
                .preferredColorScheme(.dark)
        }
    }
}

struct RootRouterView: View {
    @EnvironmentObject var preferences: PreferencesManager
    @State private var hasProfile = false
    @State private var isLoading = true

    var body: some View {
        Group {
            if isLoading {
                ProgressView()
                    .tint(Color(DesignTokens.accent))
            } else if hasProfile {
                DashboardView()
            } else {
                OnboardingView()
            }
        }
        .onAppear {
            hasProfile = preferences.loadProfile() != nil
            isLoading = false
        }
    }
}
