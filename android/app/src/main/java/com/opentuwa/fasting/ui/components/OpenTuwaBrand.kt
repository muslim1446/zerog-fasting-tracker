package com.opentuwa.fasting.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.ui.theme.SystemLabel
import com.opentuwa.fasting.ui.theme.SystemSecondaryLabel

private val SFFamily = FontFamily.SansSerif

@Composable
fun ZeroGBrand(
    subinfo: String? = null,
    onClick: (() -> Unit)? = null,
    modifier: Modifier = Modifier
) {
    val detail = subinfo ?: "Intermittent fasting tracker"

    Column(
        modifier = modifier.let { if (onClick != null) it.clickable { onClick() } else it }
    ) {
        Text(
            text = buildAnnotatedString {
                withStyle(
                    SpanStyle(
                        fontFamily = SFFamily,
                        fontWeight = FontWeight.Black,
                        letterSpacing = (-1).sp
                    )
                ) {
                    append("ZeroG")
                }
                withStyle(
                    SpanStyle(
                        fontFamily = SFFamily,
                        fontWeight = FontWeight.Light,
                        letterSpacing = (-1).sp
                    )
                ) {
                    append(" Fasting")
                }
            },
            style = MaterialTheme.typography.headlineMedium.copy(
                fontSize = 24.sp
            ),
            color = SystemLabel
        )
        if (detail.isNotEmpty()) {
            Text(
                text = detail.uppercase(),
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Medium
                ),
                color = SystemSecondaryLabel,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
    }
}
