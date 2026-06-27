package com.opentuwa.fasting.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.ui.theme.CardBorder
import com.opentuwa.fasting.ui.theme.TuwaMuted
import com.opentuwa.fasting.ui.theme.TuwaText
import com.opentuwa.fasting.ui.theme.White20

@Composable
fun FastingFooter(
    compact: Boolean = false,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp)
            .padding(
                top = if (compact) 32.dp else 48.dp,
                bottom = 48.dp
            )
    ) {
        Divider(color = CardBorder)
        Spacer(modifier = Modifier.height(if (compact) 32.dp else 48.dp))

        Text(
            text = "HEALTH & ADVISORY NOTICE",
            style = MaterialTheme.typography.labelSmall.copy(
                letterSpacing = 2.sp,
                fontWeight = FontWeight.Bold
            ),
            color = TuwaText,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Divider(color = CardBorder.copy(alpha = 0.5f))
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "OpenTuwa Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.",
            style = MaterialTheme.typography.bodyMedium,
            color = TuwaMuted,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Text(
            text = "All calorie, hydration, glycogen, and phase estimates are illustrative models for educational use only\u2014not diagnoses, prescriptions, or treatment plans. Consult a qualified healthcare provider before changing diet, medication, or fasting routines, especially if you are pregnant, under 18, or have a medical condition.",
            style = MaterialTheme.typography.bodyMedium,
            color = TuwaMuted,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        Text(
            text = "Disclaimer: Metrics shown are algorithmic approximations stored locally on your device. OpenTuwa is not affiliated with any healthcare provider, government body, or religious institution. We disclaim liability for health outcomes arising from use of this tool.",
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = White20
        )

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "\u00A9 2026 OpenTuwa Media. All rights reserved.",
            style = MaterialTheme.typography.bodySmall,
            color = TuwaMuted
        )
    }
}
