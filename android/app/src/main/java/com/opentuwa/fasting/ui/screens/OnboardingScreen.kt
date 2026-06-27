package com.opentuwa.fasting.ui.screens

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsRun
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Scale
import androidx.compose.material.icons.filled.Straighten
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.data.PreferencesManager
import com.opentuwa.fasting.data.UserProfile
import com.opentuwa.fasting.ui.components.ZeroGBrand
import com.opentuwa.fasting.ui.theme.CardBorder
import com.opentuwa.fasting.ui.theme.GlassElevation
import com.opentuwa.fasting.ui.theme.GlassRegular
import com.opentuwa.fasting.ui.theme.Grid
import com.opentuwa.fasting.ui.theme.SystemBackground
import com.opentuwa.fasting.ui.theme.SystemBlue
import com.opentuwa.fasting.ui.theme.SystemLabel
import com.opentuwa.fasting.ui.theme.SystemSecondaryLabel
import com.opentuwa.fasting.ui.theme.SystemTertiaryBackground
import com.opentuwa.fasting.ui.theme.White20
import com.opentuwa.fasting.ui.theme.concentricChild
import com.opentuwa.fasting.ui.theme.glassMaterial

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OnboardingScreen(
    prefs: PreferencesManager,
    onNavigateToDashboard: () -> Unit
) {
    var username by remember { mutableStateOf("") }
    var age by remember { mutableStateOf("") }
    var sex by remember { mutableStateOf("male") }
    var weight by remember { mutableStateOf("") }
    var heightCm by remember { mutableStateOf("") }
    var activityLevel by remember { mutableStateOf("sedentary") }
    var targetHours by remember { mutableStateOf("16") }

    LaunchedEffect(Unit) {
        prefs.getProfile()?.let { profile ->
            username = profile.username
            age = if (profile.age > 0) profile.age.toString() else ""
            sex = profile.sex
            weight = if (profile.weight > 0) profile.weight.toString() else ""
            heightCm = if (profile.height > 0) profile.height.toString() else ""
            activityLevel = profile.activityLevel
            targetHours = profile.targetHours.toString()
        }
    }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SystemBackground)
            .padding(horizontal = Grid.horizontalPadding.dp)
            .verticalScroll(scrollState),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(48.dp))

        ZeroGBrand(subinfo = "Intermittent fasting tracker")

        Spacer(modifier = Modifier.height(Grid.spacingXl.dp))

        // Form card - glass material with squircle corners
        val outerCardRadius = 16.dp
        val cardPadding = 32.dp
        val innerCardRadius = outerCardRadius.concentricChild(cardPadding)

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .glassMaterial(
                    cornerRadius = outerCardRadius,
                    cornerSmoothing = 0.6f,
                    backgroundColor = GlassRegular,
                    elevation = GlassElevation.Level1
                )
                .padding(cardPadding),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Biological Baseline",
                style = MaterialTheme.typography.headlineSmall,
                color = SystemLabel,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            Text(
                text = "Calibrate metabolic estimates to your physiology. Data stays on this device only.",
                style = MaterialTheme.typography.bodyMedium,
                color = SystemSecondaryLabel,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            FormField(
                label = "USERNAME",
                icon = Icons.Default.Person,
                value = username,
                onValueChange = { username = it },
                placeholder = "e.g. reader42"
            )

            Spacer(modifier = Modifier.height(24.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Grid.spacingMd.dp)
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    FormField(
                        label = "AGE",
                        value = age,
                        onValueChange = { age = it },
                        placeholder = "Years",
                        keyboardType = KeyboardType.Number
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    FormDropdown(
                        label = "BIOLOGICAL SEX",
                        value = sex,
                        onValueChange = { sex = it },
                        options = listOf("male" to "Male", "female" to "Female")
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Grid.spacingMd.dp)
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    FormField(
                        label = "WEIGHT (KG)",
                        icon = Icons.Default.Scale,
                        value = weight,
                        onValueChange = { weight = it },
                        placeholder = "e.g. 75.5",
                        keyboardType = KeyboardType.Decimal
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    FormField(
                        label = "HEIGHT (CM)",
                        icon = Icons.Default.Straighten,
                        value = heightCm,
                        onValueChange = { heightCm = it },
                        placeholder = "e.g. 175",
                        keyboardType = KeyboardType.Number
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            FormDropdown(
                label = "ACTIVITY LEVEL",
                icon = Icons.Default.DirectionsRun,
                value = activityLevel,
                onValueChange = { activityLevel = it },
                options = listOf(
                    "sedentary" to "Sedentary (little to no exercise)",
                    "light" to "Lightly active (1\u20133 days/week)",
                    "moderate" to "Moderately active (3\u20135 days/week)",
                    "active" to "Active (6\u20137 days/week)",
                    "very_active" to "Very active (physical job / intense)"
                )
            )

            Spacer(modifier = Modifier.height(24.dp))

            FormDropdown(
                label = "FASTING GOAL",
                icon = Icons.Default.Timer,
                value = targetHours,
                onValueChange = { targetHours = it },
                options = listOf(
                    "12" to "12:12 \u2014 Circadian rhythm",
                    "14" to "14:10 \u2014 Early time-restricted",
                    "16" to "16:8 \u2014 Standard intermittent",
                    "18" to "18:6 \u2014 Advanced fat burn",
                    "20" to "20:4 \u2014 Warrior diet",
                    "24" to "24h+ \u2014 Autophagy focus"
                )
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Save button - capsule
            Button(
                onClick = {
                    val profile = UserProfile(
                        username = username,
                        age = age.toIntOrNull() ?: 0,
                        sex = sex,
                        weight = weight.toDoubleOrNull() ?: 0.0,
                        height = heightCm.toDoubleOrNull() ?: 0.0,
                        activityLevel = activityLevel,
                        targetHours = targetHours.toIntOrNull() ?: 16
                    )
                    prefs.saveProfile(profile)
                    onNavigateToDashboard()
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = SystemBlue,
                    contentColor = SystemLabel
                ),
                shape = RoundedCornerShape(25.dp)
            ) {
                Text(
                    text = "Save Profile & Continue",
                    style = MaterialTheme.typography.labelLarge.copy(
                        fontWeight = FontWeight.SemiBold
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(Grid.spacingLg.dp))

        Text(
            text = "ZeroG Fasting is an independent wellness utility for personal intermittent-fasting timing. We do not provide medical, nutritional, clinical, or professional health advisory services.",
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = White20,
            modifier = Modifier.padding(bottom = 32.dp)
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun FormField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    keyboardType: KeyboardType = KeyboardType.Text,
    icon: androidx.compose.ui.graphics.vector.ImageVector? = null
) {
    Column {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(bottom = 6.dp)
        ) {
            if (icon != null) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = SystemSecondaryLabel,
                    modifier = Modifier.size(14.dp)
                )
                Spacer(modifier = Modifier.size(4.dp))
            }
            Text(
                text = label,
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = SystemSecondaryLabel
            )
        }
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            placeholder = {
                Text(placeholder, color = SystemSecondaryLabel.copy(alpha = 0.5f))
            },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = SystemTertiaryBackground,
                unfocusedContainerColor = SystemTertiaryBackground,
                focusedBorderColor = SystemBlue,
                unfocusedBorderColor = CardBorder,
                focusedTextColor = SystemLabel,
                unfocusedTextColor = SystemLabel,
                cursorColor = SystemBlue
            ),
            shape = RoundedCornerShape(12.dp)
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun FormDropdown(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    options: List<Pair<String, String>>,
    icon: androidx.compose.ui.graphics.vector.ImageVector? = null
) {
    var expanded by remember { mutableStateOf(false) }
    val selectedLabel = options.find { it.first == value }?.second ?: value

    Column {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(bottom = 6.dp)
        ) {
            if (icon != null) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = SystemSecondaryLabel,
                    modifier = Modifier.size(14.dp)
                )
                Spacer(modifier = Modifier.size(4.dp))
            }
            Text(
                text = label,
                style = MaterialTheme.typography.labelSmall.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = SystemSecondaryLabel
            )
        }
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = { expanded = !expanded }
        ) {
            OutlinedTextField(
                value = selectedLabel,
                onValueChange = {},
                readOnly = true,
                trailingIcon = {
                    ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .menuAnchor(),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = SystemTertiaryBackground,
                    unfocusedContainerColor = SystemTertiaryBackground,
                    focusedBorderColor = SystemBlue,
                    unfocusedBorderColor = CardBorder,
                    focusedTextColor = SystemLabel,
                    unfocusedTextColor = SystemLabel,
                    cursorColor = SystemBlue
                ),
                shape = RoundedCornerShape(12.dp)
            )
            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false }
            ) {
                options.forEach { (key, lbl) ->
                    DropdownMenuItem(
                        text = {
                            Text(
                                text = lbl,
                                color = if (key == value) SystemBlue else SystemLabel
                            )
                        },
                        onClick = {
                            onValueChange(key)
                            expanded = false
                        }
                    )
                }
            }
        }
    }
}
