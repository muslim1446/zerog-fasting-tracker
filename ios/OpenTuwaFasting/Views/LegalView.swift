import SwiftUI

struct LegalView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DesignTokens.space3) {
                // Red top bar
                Rectangle()
                    .fill(Color.red)
                    .frame(height: 3)

                // Brand
                BrandView(subinfo: "Legal & health disclaimers")
                    .padding(.top, DesignTokens.space3)

                // Title
                Text("Legal & health disclaimers")
                    .font(.system(size: 28, weight: .bold))
                    .foregroundColor(.white)

                // Health advisory notice
                LegalSection(title: "HEALTH & ADVISORY NOTICE") {
                    Text("OpenTuwa Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.muted)
                        .lineSpacing(2)
                        .padding(.bottom, 12)

                    Text("All calorie, hydration, glycogen, and phase estimates are illustrative models for educational use only—not diagnoses, prescriptions, or treatment plans. Consult a qualified healthcare provider before changing diet, medication, or fasting routines, especially if you are pregnant, under 18, or have a medical condition.")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.muted)
                        .lineSpacing(2)
                        .padding(.bottom, 12)

                    Text("Disclaimer: Metrics shown are algorithmic approximations stored locally on your device. OpenTuwa is not affiliated with any healthcare provider, government body, or religious institution. We disclaim liability for health outcomes arising from use of this tool.")
                        .font(.system(size: DesignTokens.fontMicro))
                        .foregroundColor(Color.white.opacity(0.2))
                        .lineSpacing(2)
                }

                // Privacy
                LegalSection(title: "PRIVACY & LOCAL STORAGE") {
                    Text("Profile data and fasting timers are stored in your device's local storage only. OpenTuwa Fasting does not transmit biometric data to our servers by default. Clearing app data removes your profile.")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.muted)
                        .lineSpacing(2)
                }

                // Operator
                LegalSection(title: "OPERATOR") {
                    Text("OpenTuwa Fasting is operated by OpenTuwa Media as an independent wellness utility, separate from editorial content on OpenTuwa News.")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.muted)
                        .lineSpacing(2)
                }

                // Back link
                Button {
                    dismiss()
                } label: {
                    Text("← Back to fasting timer")
                        .font(.system(size: DesignTokens.fontBody))
                        .foregroundColor(DesignTokens.accent)
                }
                .padding(.top, DesignTokens.space1)
            }
            .padding(.horizontal, DesignTokens.space3)
            .padding(.bottom, DesignTokens.space6)
        }
        .background(DesignTokens.black.ignoresSafeArea())
    }
}

struct LegalSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                .foregroundColor(.white)
                .tracking(.widest)
                .padding(.bottom, 4)
                .overlay(
                    VStack {
                        Spacer()
                        Rectangle()
                            .fill(Color.white.opacity(0.1))
                            .frame(height: 1)
                    }
                )
            content
        }
        .padding(.bottom, DesignTokens.space3)
    }
}

#Preview {
    LegalView()
}
