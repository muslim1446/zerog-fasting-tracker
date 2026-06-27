package com.opentuwa.fasting.data

data class UserProfile(
    val username: String = "",
    val age: Int = 0,
    val sex: String = "male",
    val weight: Double = 0.0,
    val height: Double = 0.0,
    val activityLevel: String = "sedentary",
    val targetHours: Int = 16
)

data class ElapsedTime(
    val hours: Int = 0,
    val minutes: Int = 0,
    val seconds: Int = 0,
    val totalHours: Double = 0.0
)

data class FastingPhase(
    val id: String,
    val title: String,
    val description: String,
    val color: Long,
    val glowColor: Long
)
