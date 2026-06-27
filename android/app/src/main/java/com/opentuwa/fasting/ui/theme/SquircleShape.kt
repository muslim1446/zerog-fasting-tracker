package com.opentuwa.fasting.ui.theme

import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp

/**
 * A custom Shape that approximates Apple's continuous corners (squircle / superellipse).
 *
 * Uses cubic bezier curves to approximate the superellipse equation |x|^n + |y|^n = 1
 * where n=4, producing the characteristic "continuous" corner blending seen in iOS/macOS.
 */
class SquircleShape(
    private val cornerRadius: androidx.compose.ui.unit.Dp = 16.dp,
    private val cornerSmoothing: Float = 0.6f
) : Shape {

    override fun createOutline(
        size: Size,
        layoutDirection: LayoutDirection,
        density: Density
    ): Outline {
        val radiusPx = with(density) { cornerRadius.toPx() }
        return Outline.Generic(
            path = squirclePath(
                width = size.width,
                height = size.height,
                radius = radiusPx,
                smoothing = cornerSmoothing
            )
        )
    }

    companion object {
        /**
         * Build a path with squircle (superellipse) corners.
         *
         * Each corner uses a series of cubic bezier curves to approximate
         * the continuous curvature transition that distinguishes squircles
         * from standard rounded rectangles.
         */
        fun squirclePath(
            width: Float,
            height: Float,
            radius: Float,
            smoothing: Float = 0.6f
        ): Path {
            val r = radius.coerceAtMost(minOf(width, height) / 2f)
            // The smoothing factor controls how much the bezier control points
            // extend beyond the corner midpoint. At 0.0 it degenerates to a
            // rounded rect; at 1.0 it becomes a full superellipse.
            val s = smoothing.coerceIn(0f, 1f)
            // Control point extension: ~4/3 * tan(pi/8) * (1 + smoothing)
            // Standard circular arc uses ~0.5523; we scale this by the smoothing factor.
            val k = 0.5523f * (1f + s)

            val path = Path()

            // Start at top-left, after the corner
            path.moveTo(0f, r)

            // Top-left corner
            path.cubicTo(
                0f, r * (1f - k),
                r * (1f - k), 0f,
                r, 0f
            )

            // Top edge
            path.lineTo(width - r, 0f)

            // Top-right corner
            path.cubicTo(
                (width - r) + r * k, 0f,
                width, r * (1f - k),
                width, r
            )

            // Right edge
            path.lineTo(width, height - r)

            // Bottom-right corner
            path.cubicTo(
                width, (height - r) + r * k,
                (width - r) + r * k, height,
                width - r, height
            )

            // Bottom edge
            path.lineTo(r, height)

            // Bottom-left corner
            path.cubicTo(
                r * (1f - k), height,
                0f, (height - r) + r * k,
                0f, height - r
            )

            // Left edge back to start
            path.lineTo(0f, r)

            path.close()
            return path
        }

        /**
         * Create a capsule shape (half-circle ends).
         */
        fun capsulePath(width: Float, height: Float): Path {
            val r = height / 2f
            val path = Path()

            path.moveTo(0f, r)
            // Top-left arc
            path.cubicTo(0f, r * 0.4477f, r * 0.4477f, 0f, r, 0f)
            // Top edge
            path.lineTo(width - r, 0f)
            // Top-right arc
            path.cubicTo(
                width - r * 0.4477f, 0f,
                width, r * 0.4477f,
                width, r
            )
            // Bottom-right arc
            path.cubicTo(
                width, r + (height - r) * 0.5523f,
                width - r * 0.4477f, height,
                width - r, height
            )
            // Bottom edge
            path.lineTo(r, height)
            // Bottom-left arc
            path.cubicTo(
                r * 0.4477f, height,
                0f, r + (height - r) * 0.5523f,
                0f, r
            )

            path.close()
            return path
        }
    }
}

/**
 * Creates a squircle shape with the given parameters.
 */
fun Squircle(
    cornerRadius: androidx.compose.ui.unit.Dp = 16.dp,
    cornerSmoothing: Float = 0.6f
): Shape = SquircleShape(cornerRadius, cornerSmoothing)
