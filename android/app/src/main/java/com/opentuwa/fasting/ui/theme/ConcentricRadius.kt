package com.opentuwa.fasting.ui.theme

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Utility to calculate concentric radius for nested rounded elements.
 *
 * When a child element sits inside a parent with rounded corners,
 * the child's corner radius should be smaller by the gap amount
 * to maintain visually consistent curvature.
 *
 * childRadius = max(0, parentRadius - gap)
 */
object ConcentricRadius {
    /**
     * Calculate the child corner radius given the parent radius and the gap
     * between the parent and child edges.
     *
     * @param parentRadius The corner radius of the outer/parent element.
     * @param gap The spacing between parent and child edges.
     * @return The child's corner radius, clamped to >= 0.
     */
    fun calculate(parentRadius: Dp, gap: Dp): Dp {
        return (parentRadius - gap).coerceAtLeast(0.dp)
    }

    /**
     * Calculate using raw dp values.
     */
    fun calculate(parentRadiusDp: Float, gapDp: Float): Float {
        return (parentRadiusDp - gapDp).coerceAtLeast(0f)
    }
}

/**
 * Extension function for convenient usage.
 * Returns concentric child radius given a parent radius and gap.
 */
fun Dp.concentricChild(gap: Dp): Dp = ConcentricRadius.calculate(this, gap)
