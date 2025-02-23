import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { months } from "../utils";

export default function MonthSwitcher() {
  const currentMonth = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonth);

  const handlePrev = () => {
    if (monthIndex > 0) {
      setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    }
  };

  const handleNext = () => {
    if (monthIndex < 11) {
      setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    }
  };

  return (
    <View style={styles.monthSwitcher}>
      <TouchableOpacity onPress={handlePrev} disabled={monthIndex === 0}>
        <Ionicons
          name="arrow-back-sharp"
          size={28}
          color={monthIndex === 0 ? "gray" : "black"}
        />
      </TouchableOpacity>

      <Text style={styles.monthText}>{months[monthIndex]}</Text>

      <TouchableOpacity onPress={handleNext} disabled={monthIndex === 11}>
        <Ionicons
          name="arrow-forward-sharp"
          size={28}
          color={monthIndex === 11 ? "gray" : "black"}
        />
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
