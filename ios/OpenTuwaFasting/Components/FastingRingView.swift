import SwiftUI

struct FastingRingView: View {
    let progressPercentage: Double
    let hours: Int
    let minutes: Int
    let seconds: Int
    let phase: FastingPhase

    private let radius: CGFloat = 140
    private let stroke: CGFloat = 12

    private var normalizedRadius: CGFloat { radius - stroke * 2 }
    private var circumference: CGFloat { normalizedRadius * 2 * .pi }
    private var clampedProgress: Double { min(progressPercentage, 100) }
    private var strokeDashoffset: CGFloat { circumference - (clampedProgress / 100) * circumference }

    var body: some View {
        ZStack {
            // Background track
            Circle()
                .stroke(DesignTokens.gray, lineWidth: stroke)
                .frame(width: normalizedRadius * 2, height: normalizedRadius * 2)

            // Progress arc
            Circle()
                .trim(from: 0, to: clampedProgress / 100)
                .stroke(
                    phase.color,
                    style: StrokeStyle(lineWidth: stroke, lineCap: .round)
                )
                .frame(width: normalizedRadius * 2, height: normalizedRadius * 2)
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.0), value: clampedProgress)
                .shadow(color: phase.glowColor, radius: 12, x: 0, y: 0)

            // Timer display
            VStack(spacing: 4) {
                HStack(alignment: .lastTextBaseline, spacing: 2) {
                    Text(String(format: "%02d", hours))
                        .font(.system(size: DesignTokens.fontTimerLarge, weight: .black, design: .rounded))
                        .foregroundColor(.white)
                        .monospacedDigit()
                    Text("h")
                        .font(.system(size: DesignTokens.fontTimerUnit, weight: .medium))
                        .foregroundColor(DesignTokens.muted)
                    Text(String(format: "%02d", minutes))
                        .font(.system(size: DesignTokens.fontTimerLarge, weight: .black, design: .rounded))
                        .foregroundColor(.white)
                        .monospacedDigit()
                    Text("m")
                        .font(.system(size: DesignTokens.fontTimerUnit, weight: .medium))
                        .foregroundColor(DesignTokens.muted)
                }

                Text("\(String(format: "%02d", seconds))s")
                    .font(.system(size: DesignTokens.fontCaption, weight: .semibold))
                    .foregroundColor(DesignTokens.muted)
                    .monospacedDigit()
                    .tracking(.wide)

                Text(phase.title.uppercased())
                    .font(.system(size: DesignTokens.fontCaption, weight: .bold))
                    .foregroundColor(phase.color)
                    .tracking(.widest)
            }
        }
        .frame(width: radius * 2, height: radius * 2)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Fast timer: \(hours) hours \(minutes) minutes \(seconds) seconds. \(phase.title)")
    }
}

#Preview {
    ZStack {
        Color.black
        FastingRingView(
            progressPercentage: 45,
            hours: 8,
            minutes: 23,
            seconds: 14,
            phase: FastingPhase(
                id: "fat-burning",
                title: "Fat Burning",
                description: "Glycogen depleted."
            )
        )
    }
}
