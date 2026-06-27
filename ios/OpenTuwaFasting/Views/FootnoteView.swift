import SwiftUI

struct FootnoteView: View {
    @State private var showLegal = false

    var body: some View {
        VStack(spacing: DesignTokens.space2) {
            // Health disclaimer
            VStack(alignment: .leading, spacing: 8) {
                Text("HEALTH & ADVISORY NOTICE")
                    .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                    .foregroundColor(.white)
                    .tracking(.widest)

                Text("OpenTuwa Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.")
                    .font(.system(size: DesignTokens.fontBody))
                    .foregroundColor(DesignTokens.muted)
                    .lineSpacing(2)

                Text("All calorie, hydration, glycogen, and phase estimates are illustrative models for educational use only—not diagnoses, prescriptions, or treatment plans. Consult a qualified healthcare provider before changing diet, medication, or fasting routines, especially if you are pregnant, under 18, or have a medical condition.")
                    .font(.system(size: DesignTokens.fontBody))
                    .foregroundColor(DesignTokens.muted)
                    .lineSpacing(2)

                Text("Disclaimer: Metrics shown are algorithmic approximations stored locally on your device. OpenTuwa is not affiliated with any healthcare provider, government body, or religious institution. We disclaim liability for health outcomes arising from use of this tool.")
                    .font(.system(size: DesignTokens.fontMicro))
                    .foregroundColor(Color.white.opacity(0.2))
                    .lineSpacing(2)
            }

            // Divider
            Rectangle()
                .fill(Color.white.opacity(0.05))
                .frame(height: 1)

            // Footer row
            HStack {
                Text("© 2026 OpenTuwa Media. All rights reserved.")
                    .font(.system(size: DesignTokens.fontCaption))
                    .foregroundColor(DesignTokens.muted)

                Spacer()

                Button {
                    showLegal = true
                } label: {
                    Text("LEGAL")
                        .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                        .foregroundColor(DesignTokens.muted)
                        .tracking(.wider)
                }
            }
        }
        .fullScreenCover(isPresented: $showLegal) {
            LegalView()
        }
    }
}

#Preview {
    ScrollView {
        FootnoteView()
            .padding()
    }
    .background(DesignTokens.black)
}
