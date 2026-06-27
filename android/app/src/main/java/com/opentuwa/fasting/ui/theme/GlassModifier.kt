package com.opentuwa.fasting.ui.theme

import android.os.Build
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Applies an Apple Liquid Glass material effect.
 *
 * On API 31+ (Android 12+), uses a translucent background with blur backdrop.
 * On older APIs, falls back to a semi-transparent background.
 *
 * Features:
 * - Translucent background (semi-transparent glass)
 * - Subtle white border at low alpha for edge highlight
 * - Ambient occlusion (inset shadow at bottom edge via elevated shadow)
 * - Squircle or rounded corner shape
 */
fun Modifier.glassMaterial(
    cornerRadius: Dp = 16.dp,
    cornerSmoothing: Float = 0.6f,
    backgroundColor: Color = GlassRegular,
    borderWidth: Dp = 0.5.dp,
    borderAlpha: Float = 0.175f,
    useSquircle: Boolean = true,
    elevation: GlassElevation = GlassElevation.Level1
): Modifier {
    val shape = if (useSquircle) {
        SquircleShape(cornerRadius, cornerSmoothing)
    } else {
        RoundedCornerShape(cornerRadius)
    }

    return this
        .shadow(
            elevation = elevation.elevation,
            shape = shape,
            ambientColor = elevation.ambientColor,
            spotColor = elevation.spotColor
        )
        .clip(shape)
        .background(
            color = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                backgroundColor
            } else {
                backgroundColor.copy(alpha = backgroundColor.alpha * 0.85f)
            }
        )
        .border(
            width = borderWidth,
            color = Color.White.copy(alpha = borderAlpha),
            shape = shape
        )
}

/**
 * Applies a glass material effect using a standard RoundedCornerShape (no squircle).
 * Useful for elements that don't need the superellipse corners.
 */
fun Modifier.glassMaterialStandard(
    cornerRadius: Dp = 16.dp,
    backgroundColor: Color = GlassRegular,
    borderWidth: Dp = 0.5.dp,
    borderAlpha: Float = 0.175f,
    elevation: GlassElevation = GlassElevation.Level1
): Modifier {
    val shape = RoundedCornerShape(cornerRadius)
    return this
        .shadow(
            elevation = elevation.elevation,
            shape = shape,
            ambientColor = elevation.ambientColor,
            spotColor = elevation.spotColor
        )
        .clip(shape)
        .background(backgroundColor)
        .border(
            width = borderWidth,
            color = Color.White.copy(alpha = borderAlpha),
            shape = shape
        )
}

/**
 * Glass material elevation levels matching SAP Fiori shadow system.
 */
enum class GlassElevation(
    val elevation: Dp,
    val ambientColor: Color,
    val spotColor: Color
) {
    /** Level 0: No shadow */
    Level0(
        elevation = 0.dp,
        ambientColor = Color.Transparent,
        spotColor = Color.Transparent
    ),
    /** Level 1: Card-level shadow (subtle) */
    Level1(
        elevation = 2.dp,
        ambientColor = ShadowAmbient1,
        spotColor = ShadowSpot1
    ),
    /** Level 2: Elevated card (medium) */
    Level2(
        elevation = 6.dp,
        ambientColor = ShadowAmbient2,
        spotColor = ShadowSpot2
    ),
    /** Level 3: Floating element (prominent) */
    Level3(
        elevation = 12.dp,
        ambientColor = ShadowAmbient3,
        spotColor = ShadowSpot3
    ),
    /** Level 4: Modal overlay (highest) */
    Level4(
        elevation = 24.dp,
        ambientColor = ShadowAmbient4,
        spotColor = ShadowSpot4
    )
}
