package com.opentuwa.fasting.data

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONObject

class PreferencesManager(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("opentuwa_fasting", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_USER_PROFILE = "user_profile"
        private const val KEY_FASTING_START = "fasting_start_time"
    }

    fun saveProfile(profile: UserProfile) {
        val json = JSONObject().apply {
            put("username", profile.username)
            put("age", profile.age)
            put("sex", profile.sex)
            put("weight", profile.weight)
            put("height", profile.height)
            put("activityLevel", profile.activityLevel)
            put("targetHours", profile.targetHours)
        }
        prefs.edit().putString(KEY_USER_PROFILE, json.toString()).apply()
    }

    fun getProfile(): UserProfile? {
        val json = prefs.getString(KEY_USER_PROFILE, null) ?: return null
        return try {
            val obj = JSONObject(json)
            UserProfile(
                username = obj.getString("username"),
                age = obj.getInt("age"),
                sex = obj.getString("sex"),
                weight = obj.getDouble("weight"),
                height = obj.getDouble("height"),
                activityLevel = obj.getString("activityLevel"),
                targetHours = obj.getInt("targetHours")
            )
        } catch (e: Exception) {
            null
        }
    }

    fun saveFastingStartTime(isoString: String) {
        prefs.edit().putString(KEY_FASTING_START, isoString).apply()
    }

    fun getFastingStartTime(): String? {
        return prefs.getString(KEY_FASTING_START, null)
    }

    fun clearFastingStartTime() {
        prefs.edit().remove(KEY_FASTING_START).apply()
    }
}
