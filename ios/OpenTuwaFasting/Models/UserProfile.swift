import Foundation

struct UserProfile: Codable, Equatable {
    var username: String
    var age: Int
    var sex: String
    var weight: Double
    var height: Double
    var activityLevel: String
    var targetHours: Int

    static let defaultProfile = UserProfile(
        username: "",
        age: 30,
        sex: "male",
        weight: 75.0,
        height: 175.0,
        activityLevel: "sedentary",
        targetHours: 16
    )
}
