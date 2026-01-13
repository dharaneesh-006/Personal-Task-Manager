########################################
# React Native
########################################
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

########################################
# Hermes
########################################
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

########################################
# Notifee (Notifications)
########################################
-keep class app.notifee.** { *; }
-dontwarn app.notifee.**

########################################
# Reanimated
########################################
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.reanimated.**

########################################
# AlarmManager / Native Modules
########################################
-keep class com.mypa.** { *; }

########################################
# Kotlin Metadata
########################################
-keepclassmembers class kotlin.Metadata { *; }
