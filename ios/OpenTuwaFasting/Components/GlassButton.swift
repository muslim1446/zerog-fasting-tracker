import SwiftUI

struct GlassButton: View {
    let title: String
    let isAccent: Bool
    let action: () -> Void

    init(title: String, isAccent: Bool = false, action: @escaping () -> Void) {
        self.title = title
        self.isAccent = isAccent
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            Text(title)
        }
        .buttonStyle(GlassButtonStyle(isAccent: isAccent))
    }
}

#Preview {
    VStack(spacing: 16) {
        GlassButton(title: "Start fast", isAccent: true) {}
        GlassButton(title: "End fast", isAccent: false) {}
    }
    .padding()
    .background(DesignTokens.black)
}
