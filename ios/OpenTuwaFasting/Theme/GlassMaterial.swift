import SwiftUI

struct GlassCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(.ultraThinMaterial)
            .clipShape(ContinuousCornerShape(radius: DesignTokens.radiusOuter))
            .overlay(
                ContinuousCornerShape(radius: DesignTokens.radiusOuter)
                    .stroke(Color.white.opacity(0.1), lineWidth: 1)
            )
    }
}

struct GlassInnerCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(.thinMaterial)
            .clipShape(ContinuousCornerShape(radius: DesignTokens.radiusInner))
            .overlay(
                ContinuousCornerShape(radius: DesignTokens.radiusInner)
                    .stroke(Color.white.opacity(0.08), lineWidth: 0.5)
            )
    }
}

struct GlassButtonStyle: ButtonStyle {
    let isAccent: Bool

    init(isAccent: Bool = false) {
        self.isAccent = isAccent
    }

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: DesignTokens.fontBody, weight: .bold))
            .trackingWide()
            .foregroundColor(isAccent ? .white : DesignTokens.muted)
            .frame(minWidth: 180)
            .padding(.vertical, 14)
            .padding(.horizontal, 40)
            .background(isAccent ? DesignTokens.accent : .ultraThinMaterial)
            .clipShape(Capsule())
            .overlay(
                Capsule()
                    .stroke(
                        isAccent ? DesignTokens.accent.opacity(0.3) : Color.white.opacity(0.1),
                        lineWidth: 1
                    )
            )
            .shadow(
                color: isAccent ? DesignTokens.accent.opacity(0.25) : .clear,
                radius: 12, x: 0, y: 4
            )
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .animation(.spring(response: 0.35, dampingFraction: 0.825), value: configuration.isPressed)
    }
}

struct GlassFormInputModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: DesignTokens.fontBody))
            .foregroundColor(.white)
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(DesignTokens.black.opacity(0.8))
            .clipShape(ContinuousCornerShape(radius: DesignTokens.radiusInner))
            .overlay(
                ContinuousCornerShape(radius: DesignTokens.radiusInner)
                    .stroke(Color.white.opacity(0.1), lineWidth: 1)
            )
    }
}

extension View {
    func glassCard() -> some View {
        modifier(GlassCardModifier())
    }

    func glassInnerCard() -> some View {
        modifier(GlassInnerCardModifier())
    }

    func glassInput() -> some View {
        modifier(GlassFormInputModifier())
    }
}
