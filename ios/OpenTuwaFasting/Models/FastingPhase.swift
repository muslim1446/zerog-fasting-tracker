import SwiftUI

struct FastingPhase: Identifiable {
    let id: String
    let title: String
    let description: String

    var color: Color {
        switch id {
        case "anabolic": return Color(red: 0.52, green: 0.83, blue: 0.60)
        case "catabolic": return Color(red: 0.23, green: 0.51, blue: 0.96)
        case "fat-burning": return Color(red: 0.98, green: 0.57, blue: 0.23)
        case "ketosis": return Color(red: 0.75, green: 0.52, blue: 0.99)
        case "autophagy": return Color(red: 0.96, green: 0.45, blue: 0.71)
        case "hgh": return Color(red: 0.98, green: 0.80, blue: 0.08)
        case "deep": return Color(red: 0.97, green: 0.44, blue: 0.44)
        default: return Color.white
        }
    }

    var glowColor: Color {
        switch id {
        case "anabolic": return Color(red: 0.20, green: 0.83, blue: 0.60).opacity(0.5)
        case "catabolic": return Color(red: 0.23, green: 0.51, blue: 0.96).opacity(0.5)
        case "fat-burning": return Color(red: 0.98, green: 0.57, blue: 0.23).opacity(0.5)
        case "ketosis": return Color(red: 0.75, green: 0.52, blue: 0.99).opacity(0.5)
        case "autophagy": return Color(red: 0.96, green: 0.45, blue: 0.71).opacity(0.5)
        case "hgh": return Color(red: 0.98, green: 0.80, blue: 0.08).opacity(0.5)
        case "deep": return Color(red: 0.97, green: 0.44, blue: 0.44).opacity(0.5)
        default: return Color.white.opacity(0.3)
        }
    }
}
