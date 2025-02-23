import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }: { title: string }) {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
    color: "gray",
  },
});
