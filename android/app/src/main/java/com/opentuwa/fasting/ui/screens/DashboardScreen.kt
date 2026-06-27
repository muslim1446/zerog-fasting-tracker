package com.opentuwa.fasting.ui.screens

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BatteryChargingFull
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material.icons.filled.TrackChanges
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.MoreHorizontal
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.withFrameNanos
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opentuwa.fasting.algorithm.FastingAlgorithm
import com.opentuwa.fasting.data.ElapsedTime
import com.opentuwa.fasting.data.PreferencesManager
import com.opentuwa.fasting.ui.components.FastingFooter
import com.opentuwa.fasting.ui.components.FastingRing
import com.opentuwa.fasting.ui.components.ZeroGBrand
import com.opentuwa.fasting.ui.components.StatCard
import com.opentuwa.fasting.ui.theme.CardBorder
import com.opentuwa.fasting.ui.theme.GlassElevation
import com.opentuwa.fasting.ui.theme.GlassRegular
import com.opentuwa.fasting.ui.theme.GlassThin
import com.opentuwa.fasting.ui.theme.Grid
import com.opentuwa.fasting.ui.theme.Orange400
import com.opentuwa.fasting.ui.theme.SquircleShape
import com.opentuwa.fasting.ui.theme.SystemBackground
import com.opentuwa.fasting.ui.theme.SystemBlue
import com.opentuwa.fasting.ui.theme.SystemLabel
import com.opentuwa.fasting.ui.theme.SystemSecondaryBackground
import com.opentuwa.fasting.ui.theme.SystemSecondaryFill
import com.opentuwa.fasting.ui.theme.SystemSecondaryLabel
import com.opentuwa.fasting.ui.theme.White20
import com.opentuwa.fasting.ui.theme.Yellow400
import com.opentuwa.fasting.ui.theme.glassMaterial
import java.time.Instant

private data class TabItem(
    val label: String,
    val icon: ImageVector,
    val selectedIcon: ImageVector
)

private val tabs = listOf(
    TabItem("Home", Icons.Default.Home, Icons.Default.Home),
    TabItem("Stats", Icons.Default.BarChart, Icons.Default.BarChart),
    TabItem("Profile", Icons.Default.Person, Icons.Default.Person)
)

@Composable
fun DashboardScreen(
    prefs: PreferencesManager,
    onNavigateToOnboarding: () -> Unit
) {
    val profile = remember { mutableStateOf(prefs.getProfile()) }

    LaunchedEffect(Unit) {
        if (profile.value == null) {
            onNavigateToOnboarding()
        }
    }

    if (profile.value == null) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(SystemBackground)
                .padding(Grid.horizontalPadding.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            ZeroGBrand(subinfo = "Intermittent fasting tracker")
            Spacer(modifier = Modifier.height(32.dp))
            Text(
                text = "Loading your fasting profile\u2026",
                style = MaterialTheme.typography.bodyMedium,
                color = SystemSecondaryLabel,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Set up profile \u2192",
                style = MaterialTheme.typography.labelLarge,
                color = SystemBlue,
                modifier = Modifier.clickable { onNavigateToOnboarding() }
            )
        }
        return
    }

    val userProfile = profile.value!!
    var isFasting by remember { mutableStateOf(false) }
    var startTimeMillis by remember { mutableStateOf(0L) }
    var elapsedTime by remember {
        mutableStateOf(ElapsedTime(0, 0, 0, 0.0))
    }

    LaunchedEffect(Unit) {
        prefs.getFastingStartTime()?.let { iso ->
            try {
                val instant = Instant.parse(iso)
                startTimeMillis = instant.toEpochMilli()
                isFasting = true
            } catch (_: Exception) {}
        }
    }

    LaunchedEffect(isFasting, startTimeMillis) {
        if (isFasting && startTimeMillis > 0) {
            while (true) {
                val now = System.currentTimeMillis()
                val diffMs = now - startTimeMillis
                val totalHours = diffMs / (1000.0 * 60.0 * 60.0)
                elapsedTime = ElapsedTime(
                    hours = totalHours.toInt(),
                    minutes = ((diffMs / (1000 * 60)) % 60).toInt(),
                    seconds = ((diffMs / 1000) % 60).toInt(),
                    totalHours = totalHours.coerceAtLeast(0.0)
                )
                withFrameNanos { }
            }
        } else {
            elapsedTime = ElapsedTime(0, 0, 0, 0.0)
        }
    }

    val bmr = FastingAlgorithm.calculateBMR(
        userProfile.weight, userProfile.height, userProfile.age, userProfile.sex
    )
    val tdee = FastingAlgorithm.calculateTDEE(bmr, userProfile.activityLevel)
    val hydrationGoal = FastingAlgorithm.calculateHydrationGoal(userProfile.weight)
    val currentPhase = FastingAlgorithm.getFastingPhase(
        elapsedTime.totalHours, userProfile.activityLevel
    )
    val targetHours = userProfile.targetHours
    val progressPercentage = ((elapsedTime.totalHours / targetHours) * 100).toFloat()
    val calsBurned = if (isFasting) FastingAlgorithm.calculateCaloriesBurned(
        tdee, bmr, elapsedTime.totalHours
    ) else 0.0
    val fatBurnedGrams = if (isFasting) FastingAlgorithm.calculateFatBurned(
        elapsedTime.totalHours, tdee, bmr
    ) else 0.0
    val glycogenPct = if (isFasting) FastingAlgorithm.calculateGlycogenDepletion(
        elapsedTime.totalHours, userProfile.activityLevel
    ) else 0.0

    var selectedTab by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SystemBackground)
    ) {
        // iOS-style Navigation Bar
        NavigationBar(
            modifier = Modifier
                .fillMaxWidth()
                .background(SystemBackground),
            containerColor = SystemBackground,
            tonalElevation = 0.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = Grid.horizontalPadding.dp)
                    .padding(top = 8.dp, bottom = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Fasting",
                        style = MaterialTheme.typography.titleLarge.copy(
                            fontWeight = FontWeight.Bold
                        ),
                        color = SystemLabel
                    )
                    Text(
                        text = currentPhase.title,
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(currentPhase.color)
                    )
                }
                // Settings button - capsule
                val settingsInteraction = remember { MutableInteractionSource() }
                val settingsPressed by settingsInteraction.collectIsPressedAsState()
                val settingsScale by animateFloatAsState(
                    targetValue = if (settingsPressed) 0.92f else 1f,
                    animationSpec = spring(
                        dampingRatio = Spring.DampingRatioMediumBouncy,
                        stiffness = Spring.StiffnessMedium
                    ),
                    label = "settingsScale"
                )
                IconButton(
                    onClick = onNavigateToOnboarding,
                    modifier = Modifier
                        .size(36.dp)
                        .graphicsLayer {
                            scaleX = settingsScale
                            scaleY = settingsScale
                        }
                        .glassMaterial(
                            cornerRadius = 18.dp,
                            cornerSmoothing = 0.6f,
                            backgroundColor = GlassRegular,
                            elevation = GlassElevation.Level0
                        )
                ) {
                    Icon(
                        imageVector = Icons.Default.Settings,
                        contentDescription = "Settings",
                        tint = SystemSecondaryLabel,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // Tab content
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) {
            when (selectedTab) {
                0 -> DashboardContent(
                    userProfile = userProfile,
                    isFasting = isFasting,
                    elapsedTime = elapsedTime,
                    currentPhase = currentPhase,
                    targetHours = targetHours.toDouble(),
                    progressPercentage = progressPercentage,
                    calsBurned = calsBurned,
                    fatBurnedGrams = fatBurnedGrams,
                    glycogenPct = glycogenPct,
                    hydrationGoal = hydrationGoal,
                    onStartFast = {
                        val now = Instant.now()
                        prefs.saveFastingStartTime(now.toString())
                        startTimeMillis = now.toEpochMilli()
                        isFasting = true
                    },
                    onEndFast = {
                        prefs.clearFastingStartTime()
                        isFasting = false
                    },
                    onNavigateToOnboarding = onNavigateToOnboarding
                )
                1 -> StatsTab()
                2 -> ProfileTab(userProfile)
            }
        }

        // iOS-style Tab Bar (floating glass)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp)
                .padding(bottom = 8.dp)
        ) {
            NavigationBar(
                modifier = Modifier
                    .fillMaxWidth()
                    .glassMaterial(
                        cornerRadius = 34.dp,
                        cornerSmoothing = 0.6f,
                        backgroundColor = GlassThin,
                        elevation = GlassElevation.Level2,
                        borderWidth = 0.dp
                    ),
                containerColor = Color.Transparent,
                tonalElevation = 0.dp,
                contentColor = SystemSecondaryLabel
            ) {
                tabs.forEachIndexed { index, tab ->
                    NavigationBarItem(
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        icon = {
                            Icon(
                                imageVector = if (selectedTab == index) tab.selectedIcon else tab.icon,
                                contentDescription = tab.label,
                                modifier = Modifier.size(24.dp)
                            )
                        },
                        label = {
                            Text(
                                text = tab.label,
                                style = MaterialTheme.typography.labelSmall.copy(
                                    fontSize = 10.sp,
                                    fontWeight = if (selectedTab == index) FontWeight.SemiBold else FontWeight.Regular
                                )
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = SystemLabel,
                            selectedTextColor = SystemLabel,
                            unselectedIconColor = SystemSecondaryLabel,
                            unselectedTextColor = SystemSecondaryLabel,
                            indicatorColor = SystemSecondaryFill
                        ),
                        alwaysShowLabel = true
                    )
                }
            }
        }
    }
}

@Composable
private fun DashboardContent(
    userProfile: com.opentuwa.fasting.data.UserProfile,
    isFasting: Boolean,
    elapsedTime: ElapsedTime,
    currentPhase: com.opentuwa.fasting.data.FastingPhase,
    targetHours: Double,
    progressPercentage: Float,
    calsBurned: Double,
    fatBurnedGrams: Double,
    glycogenPct: Double,
    hydrationGoal: Double,
    onStartFast: () -> Unit,
    onEndFast: () -> Unit,
    onNavigateToOnboarding: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = Grid.horizontalPadding.dp)
    ) {
        Spacer(modifier = Modifier.height(Grid.spacingSm.dp))

        // Target badge - capsule with glass
        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Row(
                modifier = Modifier
                    .glassMaterial(
                        cornerRadius = 14.dp,
                        cornerSmoothing = 0.6f,
                        backgroundColor = GlassThin,
                        elevation = GlassElevation.Level0,
                        borderWidth = 0.5.dp
                    )
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.TrackChanges,
                    contentDescription = null,
                    tint = SystemBlue,
                    modifier = Modifier.size(12.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "TARGET: ${targetHours.toInt()} HOURS",
                    style = MaterialTheme.typography.labelSmall.copy(
                        letterSpacing = 1.sp,
                        fontWeight = FontWeight.Bold,
                        fontSize = 10.sp
                    ),
                    color = SystemSecondaryLabel
                )
            }
        }

        Spacer(modifier = Modifier.height(Grid.spacingMd.dp))

        Text(
            text = if (isFasting) currentPhase.title else "Eating window",
            style = MaterialTheme.typography.displaySmall.copy(
                fontWeight = FontWeight.Bold,
                letterSpacing = (-0.5).sp
            ),
            color = Color(currentPhase.color),
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(Grid.spacingMd.dp))

        Text(
            text = if (isFasting) currentPhase.description
            else "You are in your eating window. Replenish with nutrient-dense foods when ready to break the fast.",
            style = MaterialTheme.typography.bodyMedium,
            color = SystemSecondaryLabel,
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = Grid.spacingMd.dp)
        )

        FastingRing(
            progressPercentage = progressPercentage,
            hours = elapsedTime.hours,
            minutes = elapsedTime.minutes,
            seconds = elapsedTime.seconds,
            currentPhase = currentPhase
        )

        // Fix the start/end fast button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = Grid.spacingMd.dp),
            contentAlignment = Alignment.Center
        ) {
            val buttonInteraction = remember { MutableInteractionSource() }
            val buttonPressed by buttonInteraction.collectIsPressedAsState()
            val buttonScale by animateFloatAsState(
                targetValue = if (buttonPressed) 0.96f else 1f,
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessMedium
                ),
                label = "buttonScale"
            )

            Button(
                onClick = { if (isFasting) onEndFast() else onStartFast() },
                modifier = Modifier
                    .width(200.dp)
                    .height(50.dp)
                    .graphicsLayer {
                        scaleX = buttonScale
                        scaleY = buttonScale
                    },
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isFasting) SystemSecondaryFill else SystemBlue,
                    contentColor = if (isFasting) SystemRed else SystemLabel
                ),
                shape = RoundedCornerShape(25.dp),
                interactionSource = buttonInteraction,
                border = if (isFasting) BorderStroke(0.5.dp, CardBorder) else null
            ) {
                Text(
                    text = if (isFasting) "End Fast" else "Start Fast",
                    style = MaterialTheme.typography.labelLarge.copy(
                        fontWeight = FontWeight.SemiBold
                    )
                )
            }
        }

        Text(
            text = "Figures are estimates only. Individual metabolism varies.",
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = White20,
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = Grid.spacingMd.dp, vertical = Grid.spacingSm.dp)
        )

        Spacer(modifier = Modifier.height(Grid.spacingMd.dp))

        // Stats cards
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(Grid.spacingMd.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Grid.spacingMd.dp)
            ) {
                StatCard(
                    icon = Icons.Default.LocalFireDepartment,
                    iconTint = Orange400,
                    label = "Est. calories",
                    value = kotlin.math.floor(calsBurned).toInt().toString(),
                    unit = "kcal (estimate)",
                    modifier = Modifier.weight(1f)
                )
                StatCard(
                    icon = Icons.Default.TrackChanges,
                    iconTint = SystemBlue,
                    label = "Fat oxidized",
                    value = String.format("%.1f", fatBurnedGrams),
                    unit = "grams (estimate)",
                    modifier = Modifier.weight(1f)
                )
            }
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Grid.spacingMd.dp)
            ) {
                StatCard(
                    icon = Icons.Default.BatteryChargingFull,
                    iconTint = Yellow400,
                    label = "Glycogen depleted",
                    value = "${kotlin.math.floor(glycogenPct).toInt()}%",
                    progress = glycogenPct.toFloat().coerceIn(0f, 100f),
                    modifier = Modifier.weight(1f)
                )
                StatCard(
                    icon = Icons.Default.WaterDrop,
                    iconTint = Color(0xFF60A5FA),
                    label = "Hydration target",
                    value = String.format("%.1f", hydrationGoal),
                    unit = "liters (H\u2082O)",
                    modifier = Modifier.weight(1f)
                )
            }
        }

        Spacer(modifier = Modifier.height(Grid.spacingXl.dp))
        FastingFooter()
    }
}

@Composable
private fun StatsTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SystemBackground)
            .padding(horizontal = Grid.horizontalPadding.dp, vertical = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Coming Soon",
            style = MaterialTheme.typography.titleLarge,
            color = SystemSecondaryLabel
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Detailed fasting history and trends",
            style = MaterialTheme.typography.bodyMedium,
            color = SystemSecondaryLabel.copy(alpha = 0.6f)
        )
    }
}

@Composable
private fun ProfileTab(userProfile: com.opentuwa.fasting.data.UserProfile) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SystemBackground)
            .padding(horizontal = Grid.horizontalPadding.dp, vertical = 32.dp)
    ) {
        Text(
            text = userProfile.username.uppercase(),
            style = MaterialTheme.typography.titleLarge,
            color = SystemLabel
        )
        Spacer(modifier = Modifier.height(24.dp))
        ProfileDetail("Age", if (userProfile.age > 0) "${userProfile.age} years" else "Not set")
        ProfileDetail("Sex", userProfile.sex.replaceFirstChar { it.uppercase() })
        ProfileDetail("Weight", "${userProfile.weight} kg")
        ProfileDetail("Height", "${userProfile.height} cm")
        ProfileDetail("Activity", userProfile.activityLevel.replace("_", " ").replaceFirstChar { it.uppercase() })
        ProfileDetail("Target", "${userProfile.targetHours}:8 fasting")
    }
}

@Composable
private fun ProfileDetail(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = SystemSecondaryLabel
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            color = SystemLabel
        )
    }
}
