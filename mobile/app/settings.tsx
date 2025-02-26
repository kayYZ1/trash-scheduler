import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Button, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  saveNotificationSettings,
  loadNotificationSettings,
} from "../lib/helpers";

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await loadNotificationSettings();
      if (savedSettings) {
        setIsEnabled(savedSettings.enabled);
        setTime(new Date(savedSettings.time));
      }
    };
    loadSettings();
  }, []);

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await saveNotificationSettings({
      enabled: newState,
      time: time.toISOString(),
    });
  };

  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
    await saveNotificationSettings({
      enabled: isEnabled,
      time: currentDate.toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.text}>Powiadomienia</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#007aff" : "#f4f3f4"}
          value={isEnabled}
          onValueChange={toggleSwitch}
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
          display="compact"
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
