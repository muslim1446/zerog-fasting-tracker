package com.opentuwa.fasting.algorithm

import com.opentuwa.fasting.data.FastingPhase
import kotlin.math.exp
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min

object FastingAlgorithm {

    // Mifflin-St Jeor Equation for BMR
    fun calculateBMR(weightKg: Double, heightCm: Double, ageYears: Int, sex: String): Double {
        val s = if (sex == "male") 5.0 else -161.0
        return (10.0 * weightKg) + (6.25 * heightCm) - (5.0 * ageYears) + s
    }

    // Total Daily Energy Expenditure
    fun calculateTDEE(bmr: Double, activityLevel: String): Double {
        val multipliers = mapOf(
            "sedentary" to 1.2,
            "light" to 1.375,
            "moderate" to 1.55,
            "active" to 1.725,
            "very_active" to 1.9
        )
        return bmr * (multipliers[activityLevel] ?: 1.2)
    }

    // Hydration Target (~35ml per kg)
    fun calculateHydrationGoal(weightKg: Double): Double {
        return weightKg * 0.035
    }

    // Glycogen Depletion (Exponential Decay)
    fun calculateGlycogenDepletion(hoursFasted: Double, activityLevel: String): Double {
        val depletionRates = mapOf(
            "sedentary" to 16.0,
            "light" to 15.0,
            "moderate" to 14.0,
            "active" to 12.0,
            "very_active" to 10.0
        )
        val hoursToDeplete = depletionRates[activityLevel] ?: 16.0
        val k = 4.605 / hoursToDeplete
        val remainingGlycogen = 100.0 * exp(-k * hoursFasted)
        val percentageDepleted = 100.0 - remainingGlycogen
        return min(100.0, max(0.0, percentageDepleted))
    }

    // Dynamic Energy Expenditure (Circadian Distribution)
    fun calculateCaloriesBurned(tdee: Double, bmr: Double, hoursFasted: Double, fastStartHour: Int = 20): Double {
        val sleepStart = 22
        val sleepEnd = 6

        val sleepHourlyBurn = (bmr * 0.85) / 24.0
        val totalDailySleepBurn = 8.0 * sleepHourlyBurn
        val wakingHourlyBurn = (tdee - totalDailySleepBurn) / 16.0

        var totalBurn = 0.0
        val fullHours = floor(hoursFasted).toInt()

        for (i in 0 until fullHours) {
            val currentHour = (fastStartHour + i) % 24
            val isSleeping = currentHour >= sleepStart || currentHour < sleepEnd
            totalBurn += if (isSleeping) sleepHourlyBurn else wakingHourlyBurn
        }

        val fractionalHour = hoursFasted - fullHours
        if (fractionalHour > 0) {
            val currentHour = (fastStartHour + fullHours) % 24
            val isSleeping = currentHour >= sleepStart || currentHour < sleepEnd
            totalBurn += (if (isSleeping) sleepHourlyBurn else wakingHourlyBurn) * fractionalHour
        }

        return totalBurn
    }

    // Substrate Utilization (Sigmoid S-Curve)
    fun calculateFatBurned(hoursFasted: Double, tdee: Double, bmr: Double, fastStartHour: Int = 20): Double {
        val sleepStart = 22
        val sleepEnd = 6

        val sleepHourlyBurn = (bmr * 0.85) / 24.0
        val wakingHourlyBurn = (tdee - (8.0 * sleepHourlyBurn)) / 16.0

        var fatCalories = 0.0
        val fullHours = floor(hoursFasted).toInt()

        for (i in 0 until fullHours) {
            val currentHour = (fastStartHour + i) % 24
            val isSleeping = currentHour >= sleepStart || currentHour < sleepEnd
            val hourlyBurn = if (isSleeping) sleepHourlyBurn else wakingHourlyBurn
            val fatPercentage = 0.20 + (0.65 / (1.0 + exp(-0.5 * (i - 12))))
            fatCalories += hourlyBurn * fatPercentage
        }

        val fractionalHour = hoursFasted - fullHours
        if (fractionalHour > 0) {
            val currentHour = (fastStartHour + fullHours) % 24
            val isSleeping = currentHour >= sleepStart || currentHour < sleepEnd
            val hourlyBurn = if (isSleeping) sleepHourlyBurn else wakingHourlyBurn
            val fatPercentage = 0.20 + (0.65 / (1.0 + exp(-0.5 * (fullHours - 12))))
            fatCalories += (hourlyBurn * fractionalHour) * fatPercentage
        }

        return fatCalories / 9.0 // 1g fat = 9 kcal
    }

    // Fasting Phase Timelines
    fun getFastingPhase(hoursFasted: Double, activityLevel: String = "sedentary"): FastingPhase {
        val earlyMod = if (activityLevel == "active" || activityLevel == "very_active") 0.85 else 1.0

        return when {
            hoursFasted < 4 * earlyMod -> FastingPhase(
                id = "anabolic",
                title = "Anabolic Phase",
                description = "Digesting and storing nutrients. Blood sugar and insulin are elevated.",
                color = 0xFFE5E5E5,
                glowColor = 0xFFE5E5E5
            )
            hoursFasted < 12 * earlyMod -> FastingPhase(
                id = "catabolic",
                title = "Catabolic Phase",
                description = "Blood sugar normalizes. Insulin drops. Transitioning to stored glycogen.",
                color = 0xFF3B82F6,
                glowColor = 0xFF3B82F6
            )
            hoursFasted < 16 * earlyMod -> FastingPhase(
                id = "fat-burning",
                title = "Fat Burning",
                description = "Glycogen depleted. Body is shifting to burning adipose tissue for fuel.",
                color = 0xFF34D399,
                glowColor = 0xFF34D399
            )
            hoursFasted < 24 * earlyMod -> FastingPhase(
                id = "ketosis",
                title = "Mild Ketosis",
                description = "Liver generates ketones. Increased mental clarity and fat oxidation.",
                color = 0xFFF472B6,
                glowColor = 0xFFF472B6
            )
            hoursFasted < 48 -> FastingPhase(
                id = "autophagy",
                title = "Autophagy",
                description = "Cellular repair initiated. Body recycles damaged proteins and cells.",
                color = 0xFFC084FC,
                glowColor = 0xFFC084FC
            )
            hoursFasted < 72 -> FastingPhase(
                id = "hgh",
                title = "Growth Hormone Spike",
                description = "HGH levels increase dramatically to preserve muscle tissue.",
                color = 0xFFFFFB26,
                glowColor = 0xFFFAA415
            )
            else -> FastingPhase(
                id = "deep",
                title = "Deep Fasting",
                description = "Maximum insulin sensitivity and immune stem cell regeneration.",
                color = 0xFFF87171,
                glowColor = 0xFFF87171
            )
        }
    }
}
