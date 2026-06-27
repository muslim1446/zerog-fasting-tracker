import SwiftUI

struct GlassCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(DesignTokens.space2)
            .glassCard()
    }
}

#Preview {
    ZStack {
        Color.black
        GlassCard {
            VStack(alignment: .leading, spacing: 8) {
                Text("Glass Card")
                    .font(.headline)
                    .foregroundColor(.white)
                Text("With blur material and subtle border")
                    .font(.subheadline)
                    .foregroundColor(DesignTokens.muted)
            }
        }
        .padding()
    }
}
