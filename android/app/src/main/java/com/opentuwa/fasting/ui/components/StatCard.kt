package com.opentuwa.fasting.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.ui.theme.GlassRegular
import com.opentuwa.fasting.ui.theme.SquircleShape
import com.opentuwa.fasting.ui.theme.TuwaBlack
import com.opentuwa.fasting.ui.theme.TuwaMuted
import com.opentuwa.fasting.ui.theme.Yellow400

@Composable
fun StatCard(
    icon: ImageVector,
    iconTint: Color,
    label: String,
    value: String,
    unit: String? = null,
    progress: Float? = null,
    modifier: Modifier = Modifier
) {
    val outerRadius = 16.dp
    val innerPadding = 12.dp
    val outerShape = SquircleShape(outerRadius, 0.6f)
    val innerShape = SquircleShape(8.dp, 0.6f)

    Column(
        modifier = modifier
            .graphicsLayer {
                clip = true
                shape = outerShape
            }
            .background(GlassRegular)
            .padding(innerPadding)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = iconTint,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = label.uppercase(),
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = TuwaMuted
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = value,
            style = MaterialTheme.typography.displayLarge.copy(
                fontWeight = FontWeight.Black,
                fontSize = 30.sp,
                letterSpacing = (-0.5).sp
            ),
            color = Color.White
        )

        if (unit != null) {
            Text(
                text = unit,
                style = MaterialTheme.typography.bodySmall,
                color = TuwaMuted,
                modifier = Modifier.padding(top = 4.dp)
            )
        }

        if (progress != null) {
            Spacer(modifier = Modifier.height(12.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .graphicsLayer {
                        clip = true
                        shape = innerShape
                    }
                    .background(TuwaBlack)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(fraction = (progress / 100f).coerceIn(0f, 1f))
                        .height(6.dp)
                        .graphicsLayer {
                            clip = true
                            shape = innerShape
                        }
                        .background(Yellow400)
                )
            }
        }
    }
}
