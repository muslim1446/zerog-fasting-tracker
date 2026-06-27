package com.opentuwa.fasting.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.data.FastingPhase
import com.opentuwa.fasting.ui.theme.GlassThin
import com.opentuwa.fasting.ui.theme.LocalReducedMotion
import com.opentuwa.fasting.ui.theme.SquircleShape
import com.opentuwa.fasting.ui.theme.TuwaGray
import com.opentuwa.fasting.ui.theme.TuwaMuted
import com.opentuwa.fasting.ui.theme.TuwaText
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween

@Composable
fun FastingRing(
    progressPercentage: Float,
    hours: Int,
    minutes: Int,
    seconds: Int,
    currentPhase: FastingPhase,
    modifier: Modifier = Modifier
) {
    val clampedProgress = progressPercentage.coerceIn(0f, 100f)
    val reducedMotion = LocalReducedMotion.current

    val animatedProgress by animateFloatAsState(
        targetValue = clampedProgress,
        animationSpec = if (reducedMotion) {
            tween(durationMillis = 0)
        } else {
            spring(
                dampingRatio = Spring.DampingRatioMediumBouncy,
                stiffness = Spring.StiffnessLow
            )
        },
        label = "progress"
    )

    val phaseColor = Color(currentPhase.color)
    val ringSize = 280.dp
    val strokeWidth = 12.dp
    val squircleShape = remember { SquircleShape(24.dp, 0.6f) }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 40.dp),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .size(ringSize + 32.dp)
                .shadow(
                    elevation = 16.dp,
                    shape = squircleShape,
                    ambientColor = glowColor.copy(alpha = 0.15f),
                    spotColor = glowColor.copy(alpha = 0.20f)
                )
                .clip(squircleShape)
                .background(GlassThin)
        )

        Canvas(
            modifier = Modifier.size(ringSize)
        ) {
            val canvasSize = size.minDimension
            val radius = (canvasSize - strokeWidth.toPx()) / 2
            val topLeft = Offset(
                (size.width - canvasSize) / 2 + strokeWidth.toPx() / 2,
                (size.height - canvasSize) / 2 + strokeWidth.toPx() / 2
            )
            val arcSize = Size(radius * 2, radius * 2)

            drawArc(
                color = TuwaGray,
                startAngle = 0f,
                sweepAngle = 360f,
                useCenter = false,
                topLeft = topLeft,
                size = arcSize,
                style = Stroke(
                    width = strokeWidth.toPx(),
                    cap = StrokeCap.Round
                )
            )

            drawArc(
                color = phaseColor,
                startAngle = -90f,
                sweepAngle = animatedProgress * 3.6f,
                useCenter = false,
                topLeft = topLeft,
                size = arcSize,
                style = Stroke(
                    width = strokeWidth.toPx(),
                    cap = StrokeCap.Round
                )
            )
        }

        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m",
                style = MaterialTheme.typography.displayLarge.copy(
                    fontWeight = FontWeight.Black,
                    letterSpacing = (-2).sp,
                    fontSize = 48.sp
                ),
                color = TuwaText
            )

            Text(
                text = "${seconds.toString().padStart(2, '0')}s",
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.SemiBold,
                    letterSpacing = 2.sp
                ),
                color = TuwaMuted,
                modifier = Modifier.padding(top = 4.dp)
            )

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = currentPhase.title.uppercase(),
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 2.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = phaseColor
            )
        }
    }
}

private val glowColor = Color(0xFF34D399)
