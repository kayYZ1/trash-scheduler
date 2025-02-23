import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { months } from "../utils";
import { useSchedule } from "../context";

export default function MonthSwitcher() {
  const currentMonth = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonth);
  const { changeMonthSchedule } = useSchedule();

  useEffect(() => {
    changeMonthSchedule(months[monthIndex]);
  }, [monthIndex]);

  const handlePrev = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNext = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <View style={styles.monthSwitcher}>
      <TouchableOpacity onPress={handlePrev}>
        <Ionicons name="arrow-back-sharp" size={28} />
      </TouchableOpacity>
      <Text style={styles.monthText}>{months[monthIndex].toUpperCase()}</Text>
      <TouchableOpacity onPress={handleNext}>
        <Ionicons name="arrow-forward-sharp" size={28} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  monthSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
