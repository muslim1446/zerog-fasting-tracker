import SwiftUI

struct BrandView: View {
    var subinfo: String?
    var compact: Bool = false

    private let tagline = "Metabolic timing & wellness estimates"

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 0) {
                Text("OpenTuwa")
                    .font(.custom("PlusJakartaSans", size: DesignTokens.fontBrand))
                    .fontWeight(.black)
                    .foregroundColor(.white)
                Text(" Fasting")
                    .font(.custom("PlusJakartaSans", size: DesignTokens.fontBrand))
                    .fontWeight(.light)
                    .foregroundColor(.white)
            }

            if let detail = subinfo ?? tagline {
                Text(detail.uppercased())
                    .font(.system(size: DesignTokens.fontMicro, weight: .medium))
                    .foregroundColor(DesignTokens.muted)
                    .tracking(.wide)
            }
        }
    }
}

#Preview {
    VStack(spacing: 24) {
        BrandView()
        BrandView(subinfo: "Profile: reader42")
        BrandView(subinfo: "Legal & health disclaimers")
        BrandView(compact: true)
    }
    .padding()
    .background(DesignTokens.black)
}
