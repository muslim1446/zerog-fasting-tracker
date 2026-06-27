package com.opentuwa.fasting

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.rememberNavController
import com.opentuwa.fasting.data.PreferencesManager
import com.opentuwa.fasting.navigation.NavGraph
import com.opentuwa.fasting.navigation.Screen
import com.opentuwa.fasting.ui.theme.ZeroGFastingTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val prefs = PreferencesManager(applicationContext)

        val startDestination = if (prefs.getProfile() != null) {
            Screen.Dashboard.route
        } else {
            Screen.Onboarding.route
        }

        setContent {
            ZeroGFastingTheme {
                val navController = rememberNavController()
                NavGraph(
                    navController = navController,
                    prefs = prefs,
                    startDestination = startDestination
                )
            }
        }
    }
}
