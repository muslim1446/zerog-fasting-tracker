package com.opentuwa.fasting.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.ui.components.FastingFooter
import com.opentuwa.fasting.ui.components.OpenTuwaBrand
import com.opentuwa.fasting.ui.theme.CardBorder
import com.opentuwa.fasting.ui.theme.Red600
import com.opentuwa.fasting.ui.theme.TuwaAccent
import com.opentuwa.fasting.ui.theme.TuwaBlack
import com.opentuwa.fasting.ui.theme.TuwaMuted
import com.opentuwa.fasting.ui.theme.TuwaText
import com.opentuwa.fasting.ui.theme.White20

@Composable
fun LegalScreen(
    onNavigateToDashboard: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(TuwaBlack)
            .padding(horizontal = 24.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(
            modifier = Modifier
                .fillMaxWidth()
                .height(3.dp)
                .background(Red600)
        )

        Spacer(modifier = Modifier.height(48.dp))

        OpenTuwaBrand(
            subinfo = "Legal & health disclaimers",
            onClick = onNavigateToDashboard
        )

        Spacer(modifier = Modifier.height(40.dp))

        Text(
            text = "Legal & health disclaimers",
            style = MaterialTheme.typography.headlineMedium.copy(
                fontWeight = FontWeight.Bold,
                letterSpacing = (-0.5).sp
            ),
            color = TuwaText,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        SectionHeading("HEALTH & ADVISORY NOTICE")
        BodyText("OpenTuwa Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.")
        Spacer(modifier = Modifier.height(16.dp))
        BodyText("All calorie, hydration, glycogen, and phase estimates are illustrative models for educational use only\u2014not diagnoses, prescriptions, or treatment plans. Consult a qualified healthcare provider before changing diet, medication, or fasting routines, especially if you are pregnant, under 18, or have a medical condition.")
        Spacer(modifier = Modifier.height(16.dp))
        FinePrint("Disclaimer: Metrics shown are algorithmic approximations stored locally on your device. OpenTuwa is not affiliated with any healthcare provider, government body, or religious institution. We disclaim liability for health outcomes arising from use of this tool.")

        Spacer(modifier = Modifier.height(40.dp))

        SectionHeading("PRIVACY & LOCAL STORAGE")
        BodyText("Profile data and fasting timers are stored in your device\u2019s local storage only. OpenTuwa Fasting does not transmit biometric data to our servers by default. Clearing app data removes your profile.")

        Spacer(modifier = Modifier.height(40.dp))

        SectionHeading("OPERATOR")
        BodyText("OpenTuwa Fasting is operated by OpenTuwa Media as an independent wellness utility, separate from editorial content on OpenTuwa News. Canonical URL: fasting.opentuwa.com")

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "\u2190 Back to fasting timer",
            style = MaterialTheme.typography.bodyMedium,
            color = TuwaAccent,
            modifier = Modifier
                .clip(RoundedCornerShape(6.dp))
                .clickable { onNavigateToDashboard() }
                .padding(vertical = 8.dp)
        )

        Spacer(modifier = Modifier.height(48.dp))

        FastingFooter(compact = true)
    }
}

@Composable
private fun SectionHeading(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.labelSmall.copy(
            letterSpacing = 2.sp,
            fontWeight = FontWeight.Bold
        ),
        color = TuwaText,
        modifier = Modifier.padding(bottom = 16.dp)
    )
    Divider(color = CardBorder)
    Spacer(modifier = Modifier.height(16.dp))
}

@Composable
private fun BodyText(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.bodyMedium,
        color = TuwaMuted,
        lineHeight = 22.sp
    )
}

@Composable
private fun FinePrint(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
        color = White20,
        lineHeight = 16.sp
    )
}
