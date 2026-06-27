import SwiftUI

enum DesignTokens {

    // MARK: - Colors (matching Tailwind config)
    static let black = Color(red: 0.04, green: 0.04, blue: 0.043)      // #0A0A0B
    static let gray = Color(red: 0.086, green: 0.086, blue: 0.094)      // #161618
    static let text = Color(red: 0.898, green: 0.898, blue: 0.898)      // #E5E5E5
    static let muted = Color(red: 0.769, green: 0.769, blue: 0.769)     // #C4C4C4
    static let accent = Color(red: 0.231, green: 0.51, blue: 0.965)     // #3B82F6
    static let gold = Color(red: 0.831, green: 0.686, blue: 0.216)      // #D4AF37

    // MARK: - 8pt Grid Spacing Scale
    static let space1: CGFloat = 8
    static let space2: CGFloat = 16
    static let space3: CGFloat = 24
    static let space4: CGFloat = 32
    static let space5: CGFloat = 40
    static let space6: CGFloat = 48

    // MARK: - Concentric Radius Formula
    /// Concentric squircle: each nested level gets a smaller radius
    /// outer = 16, inner = 12, pill = height/2
    static let radiusOuter: CGFloat = 16
    static let radiusInner: CGFloat = 12
    static let radiusPill: CGFloat = 999

    // MARK: - SAP Fiori Elevation Shadows
    static func elevationShadow(level: Int = 1) -> some View {
        let opacity: Double
        let radius: CGFloat
        let y: CGFloat
        switch level {
        case 1:
            opacity = 0.15
            radius = 8
            y = 2
        case 2:
            opacity = 0.25
            radius = 16
            y = 4
        case 3:
            opacity = 0.35
            radius = 24
            y = 8
        default:
            opacity = 0.15
            radius = 8
            y = 2
        }
        return Rectangle()
            .fill(Color.black.opacity(opacity))
            .shadow(color: .black.opacity(opacity), radius: radius, x: 0, y: y)
    }

    // MARK: - Font Sizes
    static let fontBrand: CGFloat = 24
    static let fontPhaseTitle: CGFloat = 30
    static let fontTimerLarge: CGFloat = 48
    static let fontTimerUnit: CGFloat = 20
    static let fontStatValue: CGFloat = 32
    static let fontBody: CGFloat = 14
    static let fontCaption: CGFloat = 12
    static let fontMicro: CGFloat = 11
    static let fontLabel: CGFloat = 10
}
