import Foundation

enum FastingAlgorithm {

    // MARK: - Mifflin-St Jeor BMR
    static func calculateBMR(weightKg: Double, heightCm: Double, ageYears: Int, sex: String) -> Double {
        let s = (sex == "male") ? 5.0 : -161.0
        return (10.0 * weightKg) + (6.25 * heightCm) - (5.0 * Double(ageYears)) + s
    }

    // MARK: - TDEE
    static func calculateTDEE(bmr: Double, activityLevel: String) -> Double {
        let multipliers: [String: Double] = [
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very_active": 1.9
        ]
        return bmr * (multipliers[activityLevel] ?? 1.2)
    }

    // MARK: - Hydration Target
    static func calculateHydrationGoal(weightKg: Double) -> Double {
        return weightKg * 0.035
    }

    // MARK: - Glycogen Depletion (Exponential Decay)
    static func calculateGlycogenDepletion(hoursFasted: Double, activityLevel: String) -> Double {
        let depletionRates: [String: Double] = [
            "sedentary": 16,
            "light": 15,
            "moderate": 14,
            "active": 12,
            "very_active": 10
        ]

        let hoursToDeplete = depletionRates[activityLevel] ?? 16.0

        // k is calculated so that ~1% glycogen remains at hoursToDeplete
        // ln(0.01) = -k * hoursToDeplete => k = 4.605 / hoursToDeplete
        let k = 4.605 / hoursToDeplete

        // G(t) = G_0 * e^(-kt)
        let remainingGlycogen = 100.0 * exp(-k * hoursFasted)
        let percentageDepleted = 100.0 - remainingGlycogen

        return min(100.0, max(0.0, percentageDepleted))
    }

    // MARK: - Calories Burned (Circadian Distribution)
    static func calculateCaloriesBurned(tdee: Double, bmr: Double, hoursFasted: Double, fastStartHour: Double = 20.0) -> Double {
        let SLEEP_START = 22.0
        let SLEEP_END = 6.0

        let sleepHourlyBurn = (bmr * 0.85) / 24.0
        let totalDailySleepBurn = 8.0 * sleepHourlyBurn

        // Distribute the rest of the daily TDEE over the 16 waking hours
        let wakingHourlyBurn = (tdee - totalDailySleepBurn) / 16.0

        var totalBurn = 0.0

        // Calculate full hours
        let fullHours = Int(hoursFasted)
        for i in 0..<fullHours {
            let currentHour = Double((Int(fastStartHour) + i) % 24)
            let isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END
            totalBurn += isSleeping ? sleepHourlyBurn : wakingHourlyBurn
        }

        // Add fractional remainder for precision
        let fractionalHour = hoursFasted.truncatingRemainder(dividingBy: 1.0)
        if fractionalHour > 0 {
            let currentHour = Double((Int(fastStartHour) + fullHours) % 24)
            let isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END
            totalBurn += (isSleeping ? sleepHourlyBurn : wakingHourlyBurn) * fractionalHour
        }

        return totalBurn
    }

    // MARK: - Fat Burned (Sigmoid S-Curve)
    static func calculateFatBurned(hoursFasted: Double, tdee: Double, bmr: Double, fastStartHour: Double = 20.0) -> Double {
        let SLEEP_START = 22.0
        let SLEEP_END = 6.0

        let sleepHourlyBurn = (bmr * 0.85) / 24.0
        let wakingHourlyBurn = (tdee - (8.0 * sleepHourlyBurn)) / 16.0

        var fatCalories = 0.0

        // Full hours
        let fullHours = Int(hoursFasted)
        for i in 0..<fullHours {
            let currentHour = Double((Int(fastStartHour) + i) % 24)
            let isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END
            let hourlyBurn = isSleeping ? sleepHourlyBurn : wakingHourlyBurn

            // Sigmoid Function: f(x) = baseline + (max_gain / (1 + e^(-k(x - midpoint))))
            // Smooth ramp from ~20% baseline to ~85% ketosis, centered at hour 12
            let fatPercentage = 0.20 + (0.65 / (1.0 + exp(-0.5 * (Double(i) - 12.0))))

            fatCalories += hourlyBurn * fatPercentage
        }

        // Fractional hour handling
        let fractionalHour = hoursFasted.truncatingRemainder(dividingBy: 1.0)
        if fractionalHour > 0 {
            let currentHour = Double((Int(fastStartHour) + fullHours) % 24)
            let isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END
            let hourlyBurn = isSleeping ? sleepHourlyBurn : wakingHourlyBurn

            let fatPercentage = 0.20 + (0.65 / (1.0 + exp(-0.5 * (Double(fullHours) - 12.0))))
            fatCalories += (hourlyBurn * fractionalHour) * fatPercentage
        }

        return fatCalories / 9.0 // 1g of fat = 9 kcal
    }

    // MARK: - Fasting Phase
    static func getFastingPhase(hoursFasted: Double, activityLevel: String = "sedentary") -> FastingPhase {
        // Activity modifier only applied to glycogen-dependent early phases
        let earlyMod: Double = (activityLevel == "active" || activityLevel == "very_active") ? 0.85 : 1.0

        if hoursFasted < 4.0 * earlyMod {
            return FastingPhase(
                id: "anabolic",
                title: "Anabolic Phase",
                description: "Digesting and storing nutrients. Blood sugar and insulin are elevated."
            )
        }

        if hoursFasted < 12.0 * earlyMod {
            return FastingPhase(
                id: "catabolic",
                title: "Catabolic Phase",
                description: "Blood sugar normalizes. Insulin drops. Transitioning to stored glycogen."
            )
        }

        if hoursFasted < 16.0 * earlyMod {
            return FastingPhase(
                id: "fat-burning",
                title: "Fat Burning",
                description: "Glycogen depleted. Body is shifting to burning adipose tissue for fuel."
            )
        }

        if hoursFasted < 24.0 * earlyMod {
            return FastingPhase(
                id: "ketosis",
                title: "Mild Ketosis",
                description: "Liver generates ketones. Increased mental clarity and fat oxidation."
            )
        }

        if hoursFasted < 48.0 {
            return FastingPhase(
                id: "autophagy",
                title: "Autophagy",
                description: "Cellular repair initiated. Body recycles damaged proteins and cells."
            )
        }

        if hoursFasted < 72.0 {
            return FastingPhase(
                id: "hgh",
                title: "Growth Hormone Spike",
                description: "HGH levels increase dramatically to preserve muscle tissue."
            )
        }

        return FastingPhase(
            id: "deep",
            title: "Deep Fasting",
            description: "Maximum insulin sensitivity and immune stem cell regeneration."
        )
    }
}
