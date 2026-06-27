import SwiftUI

struct StatCardView: View {
    let iconName: String
    let iconColor: Color
    let label: String
    let value: String
    var unit: String? = nil
    var progress: Double? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: iconName)
                    .font(.system(size: 16))
                    .foregroundColor(iconColor)
                Text(label.uppercased())
                    .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                    .foregroundColor(DesignTokens.muted)
                    .tracking(.wider)
            }

            Text(value)
                .font(.system(size: DesignTokens.fontStatValue, weight: .black, design: .rounded))
                .foregroundColor(.white)
                .monospacedDigit()

            if let unit = unit {
                Text(unit)
                    .font(.system(size: DesignTokens.fontCaption))
                    .foregroundColor(DesignTokens.muted)
            }

            if let progress = progress {
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule()
                            .fill(DesignTokens.black)
                            .overlay(
                                Capsule()
                                    .stroke(Color.white.opacity(0.05), lineWidth: 0.5)
                            )
                        Capsule()
                            .fill(Color.yellow)
                            .frame(width: geo.size.width * min(progress, 100) / 100)
                            .animation(.easeInOut(duration: 1.0), value: progress)
                    }
                }
                .frame(height: 6)
            }
        }
        .padding(DesignTokens.space2)
        .frame(maxWidth: .infinity, alignment: .leading)
        .glassInnerCard()
    }
}

#Preview {
    ZStack {
        Color.black
        HStack(spacing: 12) {
            StatCardView(
                iconName: "flame.fill",
                iconColor: .orange,
                label: "Est. calories",
                value: "342",
                unit: "kcal (estimate)"
            )
            StatCardView(
                iconName: "bolt.fill",
                iconColor: DesignTokens.accent,
                label: "Fat oxidized",
                value: "12.4",
                unit: "grams (estimate)"
            )
        }
        .padding()
    }
}
