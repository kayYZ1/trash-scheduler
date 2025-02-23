import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import MonthSwitcher from "@/lib/components/MonthSwitcher";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MonthSwitcher />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Home Screen</Text>
        <Button
          title="Go to Settings"
          onPress={() => router.push("/settings")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
