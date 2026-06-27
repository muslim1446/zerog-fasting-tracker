package com.opentuwa.fasting.ui.theme

import android.app.Activity
import android.provider.Settings
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat

val LocalReducedMotion = compositionLocalOf { false }

private val DarkColorScheme = darkColorScheme(
    primary = SystemBlue,
    onPrimary = SystemLabel,
    secondary = SystemBlue,
    onSecondary = SystemLabel,
    tertiary = SystemGold,
    background = SystemBackground,
    onBackground = SystemLabel,
    surface = SystemSecondaryBackground,
    onSurface = SystemLabel,
    surfaceVariant = SystemTertiaryBackground,
    onSurfaceVariant = SystemSecondaryLabel,
    outline = CardBorder,
    error = SystemRed,
    onError = SystemLabel
)

@Composable
fun ZeroGFastingTheme(content: @Composable () -> Unit) {
    val colorScheme = DarkColorScheme
    val typography = appleTypography()
    val view = LocalView.current
    val context = LocalContext.current

    val prefersReducedMotion = remember {
        try {
            Settings.Global.getInt(
                context.contentResolver,
                Settings.Global.ANIMATOR_DURATION_SCALE,
                1
            ) == 0
        } catch (_: Exception) {
            false
        }
    }

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = SystemBackground.toArgb()
            window.navigationBarColor = SystemBackground.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    CompositionLocalProvider(LocalReducedMotion provides prefersReducedMotion) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = typography,
            content = content
        )
    }
}
