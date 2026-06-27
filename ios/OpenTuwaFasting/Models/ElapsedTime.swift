import Foundation

struct ElapsedTime {
    var hours: Int
    var minutes: Int
    var seconds: Int
    var totalHours: Double

    static let zero = ElapsedTime(hours: 0, minutes: 0, seconds: 0, totalHours: 0)

    static func from(startDate: Date) -> ElapsedTime {
        let now = Date()
        let diffMs = now.timeIntervalSince(startDate) * 1000.0
        let totalHours = diffMs / (1000.0 * 60.0 * 60.0)

        return ElapsedTime(
            hours: Int(totalHours),
            minutes: Int((diffMs / (1000.0 * 60.0)).truncatingRemainder(dividingBy: 60.0)),
            seconds: Int((diffMs / 1000.0).truncatingRemainder(dividingBy: 60.0)),
            totalHours: max(0, totalHours)
        )
    }
}
