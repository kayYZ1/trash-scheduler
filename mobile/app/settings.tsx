import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Button, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import {
  saveNotificationSettings,
  loadNotificationSettings,
} from "../lib/helpers"; // Assuming you saved utils here

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Load notification settings on startup
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await loadNotificationSettings();
      if (savedSettings) {
        setIsEnabled(savedSettings.enabled);
        setTime(new Date(savedSettings.time));
        if (savedSettings.enabled) {
          scheduleNotification(savedSettings.time);
        }
      }
    };
    loadSettings();
  }, []);

  // Schedule notification
  const scheduleNotification = async (time: Date) => {
    await Notifications.cancelAllScheduledNotificationsAsync(); // Clear old notifications
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Czas na powiadomienie! 📢",
        body: "To jest twoje zaplanowane powiadomienie.",
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
  };

  // Toggle notification on/off
  const toggleSwitch = async () => {
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);
    await saveNotificationSettings({
      enabled: newStatus,
      time: time.toISOString(),
    });

    if (newStatus) {
      scheduleNotification(time);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  // Handle time change
  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
    await saveNotificationSettings({
      enabled: isEnabled,
      time: currentDate.toISOString(),
    });

    if (isEnabled) {
      scheduleNotification(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.text}>Powiadomienia</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#007aff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {isEnabled && (
        <View style={styles.settingRow}>
          <Text style={styles.text}>Godzina powiadomienia</Text>
          <Button
            title={time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            onPress={() => setShowPicker(true)}
          />
        </View>
      )}

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 12,
  },
});
