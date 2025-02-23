import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_KEY = "@notification_settings";

export const saveNotificationSettings = async (settings: {
  enabled: boolean;
  time: string; // Store time as a string
}) => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save notification settings", e);
  }
};

export const loadNotificationSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(NOTIFICATION_KEY);
    return settings ? JSON.parse(settings) : null;
  } catch (e) {
    console.error("Failed to load notification settings", e);
    return null;
  }
};
