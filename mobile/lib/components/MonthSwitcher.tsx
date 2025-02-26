import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { months, scheduleMonths } from "../utils";
import { useSchedule } from "../context";

const getCurrentMonthIndex = () => {
  const currentMonthName = months[new Date().getMonth()];
  return scheduleMonths.findIndex((month) => month === currentMonthName);
};

export default function MonthSwitcher() {
  const [monthIndex, setMonthIndex] = useState(getCurrentMonthIndex);
  const { changeMonthSchedule } = useSchedule();

  useEffect(() => {
    changeMonthSchedule(scheduleMonths[monthIndex]);
  }, [monthIndex, changeMonthSchedule]);

  const handlePrev = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNext = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <View style={styles.monthSwitcher}>
      <TouchableOpacity onPress={handlePrev} disabled={monthIndex === 0}>
        <Ionicons
          name="arrow-back-sharp"
          size={28}
          color={monthIndex === 0 ? "gray" : "dark"}
        />
      </TouchableOpacity>
      <Text style={styles.monthText}>
        {scheduleMonths[monthIndex].toUpperCase()}
      </Text>
      <TouchableOpacity onPress={handleNext} disabled={monthIndex === 11}>
        <Ionicons
          name="arrow-forward-sharp"
          size={28}
          color={monthIndex === 11 ? "gray" : "dark"}
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
