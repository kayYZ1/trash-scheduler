import { View, StyleSheet, Text } from "react-native";

export default function InfoAlert() {
  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>📢 Ważna Informacja</Text>
      <Text style={styles.alertText}>
        Wystawienie odpadów zalecane jest najpóźniej do{" "}
        <Text style={styles.bold}>godziny 6:00</Text> w dniu wywozu. Terminarz
        obowiązuje od <Text style={styles.bold}>kwietnia</Text> do{" "}
        <Text style={styles.bold}>marca {new Date().getFullYear()} roku</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: "flex-start",
    padding: 10, // Reduced padding
    backgroundColor: "#fff8e1",
    borderRadius: 8, // Slightly smaller corners
    borderLeftWidth: 4, // Thinner border
    borderLeftColor: "#ffa000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // Smaller shadow
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Subtler shadow on Android
  },
  alertTitle: {
    fontSize: 14, // Smaller title
    fontWeight: "700",
    marginBottom: 4, // Less space below the title
    color: "#d84315",
  },
  alertText: {
    fontSize: 12, // Smaller text
    color: "#333",
    lineHeight: 18, // Tighter line spacing
  },
  bold: {
    fontWeight: "700",
  },
});
