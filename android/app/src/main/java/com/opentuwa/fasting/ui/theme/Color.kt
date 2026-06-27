package com.opentuwa.fasting.ui.theme

import androidx.compose.ui.graphics.Color

// ──────────────────────────────────────────────
// Apple System Colors (semantic naming)
// ──────────────────────────────────────────────

// System background colors (iOS dark mode)
val SystemBackground = Color(0xFF000000)
val SystemSecondaryBackground = Color(0xFF1C1C1E)
val SystemTertiaryBackground = Color(0xFF2C2C2E)

// System grouped background colors
val SystemGroupedBackground = Color(0xFF000000)
val SystemSecondaryGroupedBackground = Color(0xFF1C1C1E)
val SystemTertiaryGroupedBackground = Color(0xFF2C2C2E)

// System label colors
val SystemLabel = Color(0xFFFFFFFF)
val SystemSecondaryLabel = Color(0xFFEBEBF5).copy(alpha = 0.6f)
val SystemTertiaryLabel = Color(0xFFEBEBF5).copy(alpha = 0.3f)
val SystemQuaternaryLabel = Color(0xFFEBEBF5).copy(alpha = 0.18f)

// System fill colors
val SystemFill = Color(0xFF787880).copy(alpha = 0.2f)
val SystemSecondaryFill = Color(0xFF787880).copy(alpha = 0.16f)
val SystemTertiaryFill = Color(0xFF767680).copy(alpha = 0.12f)
val SystemQuaternaryFill = Color(0xFF747480).copy(alpha = 0.08f)

// System tint / accent colors (iOS blue)
val SystemBlue = Color(0xFF007AFF)
val SystemGreen = Color(0xFF34C759)
val SystemIndigo = Color(0xFF5856D6)
val SystemOrange = Color(0xFFFF9500)
val SystemPink = Color(0xFFFF2D55)
val SystemPurple = Color(0xFFAF52DE)
val SystemRed = Color(0xFFFF3B30)
val SystemTeal = Color(0xFF5AC8FA)
val SystemYellow = Color(0xFFFFCC00)
val SystemGold = Color(0xFFD4AF37)

// Fasting phase colors (vibrant, Apple-like)
val PhaseAnabolic = Color(0xFFE5E5E5)
val PhaseCatabolic = Color(0xFF007AFF)
val PhaseFatBurning = Color(0xFF34C759)
val PhaseKetosis = Color(0xFFFF2D55)
val PhaseAutophagy = Color(0xFFAF52DE)
val PhaseHGH = Color(0xFFFFCC00)
val PhaseDeep = Color(0xFFFF3B30)

// UI chrome colors
val CardBorder = Color(0x1AFFFFFF)
val CardBackground = Color(0x99161618)
val InputBackground = Color(0xCC0A0A0B)
val InputBorder = Color(0x1AFFFFFF)
val Red600 = Color(0xFFDC2626)
val Red400 = Color(0xFFF87171)
val Red300 = Color(0xFFFCA5A5)
val Orange400 = Color(0xFFFB923C)
val Yellow400 = Color(0xFFFACC15)
val Blue400 = Color(0xFF60A5FA)
val Blue600 = Color(0xFF2563EB)
val SubtleWhite5 = Color(0x0DFFFFFF)
val SubtleWhite10 = Color(0x1AFFFFFF)
val SubtleWhite20 = Color(0x33FFFFFF)
val White20 = Color(0x33FFFFFF)
val MutedPlaceholder = Color(0x80C4C4C4)

// ──────────────────────────────────────────────
// Apple Liquid Glass material colors
// ──────────────────────────────────────────────

val GlassUltraThin = Color(0x0AFFFFFF)
val GlassThin = Color(0x14FFFFFF)
val GlassRegular = Color(0x1FFFFFFF)
val GlassThick = Color(0x29FFFFFF)
val GlassOpaque = Color(0x33FFFFFF)

val GlassBlueThin = Color(0x14007AFF)
val GlassBlueRegular = Color(0x1F007AFF)
val GlassGreenThin = Color(0x1434C759)
val GlassGreenRegular = Color(0x1F34C759)

// ──────────────────────────────────────────────
// Shadow colors (SAP Fiori / Apple elevation)
// ──────────────────────────────────────────────

val ShadowAmbient1 = Color(0x21000000)
val ShadowSpot1 = Color(0x0A000000)
val ShadowAmbient2 = Color(0x21000000)
val ShadowSpot2 = Color(0x14000000)
val ShadowAmbient3 = Color(0x29000000)
val ShadowSpot3 = Color(0x1F000000)
val ShadowAmbient4 = Color(0x33000000)
val ShadowSpot4 = Color(0x29000000)

// ──────────────────────────────────────────────
// 8pt Grid Spacing Tokens
// ──────────────────────────────────────────────
object Grid {
    val sub = 4
    val base = 8
    val horizontalPadding = 16
    val spacingXs = 4
    val spacingSm = 8
    val spacingMd = 16
    val spacingLg = 24
    val spacingXl = 32
}
