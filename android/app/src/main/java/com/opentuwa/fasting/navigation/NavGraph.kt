package com.opentuwa.fasting.navigation

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.opentuwa.fasting.data.PreferencesManager
import com.opentuwa.fasting.ui.screens.DashboardScreen
import com.opentuwa.fasting.ui.screens.LegalScreen
import com.opentuwa.fasting.ui.screens.OnboardingScreen

sealed class Screen(val route: String) {
    data object Dashboard : Screen("dashboard")
    data object Onboarding : Screen("onboarding")
    data object Legal : Screen("legal")
}

@Composable
fun NavGraph(
    navController: NavHostController,
    prefs: PreferencesManager,
    startDestination: String = Screen.Dashboard.route
) {
    val context = LocalContext.current
    val reducedMotion = remember {
        try {
            android.provider.Settings.Global.getInt(
                context.contentResolver,
                android.provider.Settings.Global.ANIMATOR_DURATION_SCALE,
                1
            ) == 0
        } catch (_: Exception) {
            false
        }
    }

    val transitionDuration = if (reducedMotion) 0 else 350

    NavHost(
        navController = navController,
        startDestination = startDestination,
        enterTransition = {
            slideInHorizontally(
                initialOffsetX = { it / 3 },
                animationSpec = if (reducedMotion) tween(0) else spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessMedium
                )
            ) + fadeIn(
                animationSpec = tween(transitionDuration)
            )
        },
        exitTransition = {
            slideOutHorizontally(
                targetOffsetX = { -it / 3 },
                animationSpec = if (reducedMotion) tween(0) else spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessMedium
                )
            ) + fadeOut(
                animationSpec = tween(transitionDuration)
            )
        },
        popEnterTransition = {
            slideInHorizontally(
                initialOffsetX = { -it / 3 },
                animationSpec = if (reducedMotion) tween(0) else spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessMedium
                )
            ) + fadeIn(
                animationSpec = tween(transitionDuration)
            )
        },
        popExitTransition = {
            slideOutHorizontally(
                targetOffsetX = { it / 3 },
                animationSpec = if (reducedMotion) tween(0) else spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessMedium
                )
            ) + fadeOut(
                animationSpec = tween(transitionDuration)
            )
        }
    ) {
        composable(Screen.Dashboard.route) {
            DashboardScreen(
                prefs = prefs,
                onNavigateToOnboarding = {
                    navController.navigate(Screen.Onboarding.route) {
                        popUpTo(Screen.Dashboard.route) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.Onboarding.route) {
            OnboardingScreen(
                prefs = prefs,
                onNavigateToDashboard = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Onboarding.route) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.Legal.route) {
            LegalScreen(
                onNavigateToDashboard = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Legal.route) { inclusive = true }
                    }
                }
            )
        }
    }
}
