import Foundation

class PreferencesManager: ObservableObject {
    private let profileKey = "user_profile"
    private let fastingStartTimeKey = "fasting_start_time"

    // MARK: - Profile

    func loadProfile() -> UserProfile? {
        guard let data = UserDefaults.standard.data(forKey: profileKey) else { return nil }
        return try? JSONDecoder().decode(UserProfile.self, from: data)
    }

    func saveProfile(_ profile: UserProfile) {
        if let data = try? JSONEncoder().encode(profile) {
            UserDefaults.standard.set(data, forKey: profileKey)
            objectWillChange.send()
        }
    }

    func deleteProfile() {
        UserDefaults.standard.removeObject(forKey: profileKey)
        objectWillChange.send()
    }

    // MARK: - Fasting Start Time

    func loadFastingStartTime() -> Date? {
        guard let dateString = UserDefaults.standard.string(forKey: fastingStartTimeKey) else { return nil }
        return ISO8601DateFormatter().date(from: dateString)
    }

    func saveFastingStartTime(_ date: Date) {
        let formatter = ISO8601DateFormatter()
        UserDefaults.standard.set(formatter.string(from: date), forKey: fastingStartTimeKey)
        objectWillChange.send()
    }

    func clearFastingStartTime() {
        UserDefaults.standard.removeObject(forKey: fastingStartTimeKey)
        objectWillChange.send()
    }
}
