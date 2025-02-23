import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MonthSwitcher from "@/lib/components/MonthSwitcher";
import InfoAlert from "@/lib/components/InfoAlert";
import { useSchedule } from "@/lib/context";
import { ScheduleColor, ScheduleItem } from "@/lib/types";
import {
  colorMap,
  utilityMap,
  utilityIconMap,
  whichWeekDay,
} from "@/lib/utils";

export default function Home() {
  const { schedule, month } = useSchedule();

  const sortedSchedule: ScheduleItem[] = Object.entries(schedule)
    .flatMap(([color, days]) =>
      days.map((day) => ({ day, color: color as ScheduleColor })),
    )
    .sort((a, b) => a.day - b.day);

  return (
    <View style={styles.container}>
      <MonthSwitcher />
      <View style={styles.content}>
        {sortedSchedule.length === 0 ? (
          <Text style={styles.emptyText}>No schedule for this month.</Text>
        ) : (
          <FlatList
            data={sortedSchedule}
            keyExtractor={(item, index) => `${item.color}-${item.day}-${index}`}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  { borderBottomColor: colorMap[item.color] },
                ]}
              >
                <View style={styles.dayInfo}>
                  <Text style={styles.dayText}>
                    {whichWeekDay(item.day, month)}, {item.day}
                  </Text>
                </View>
                <View style={styles.iconTextContainer}>
                  <Ionicons
                    name={utilityIconMap[item.color]}
                    size={18}
                    color="#333"
                    style={styles.icon}
                  />
                  <Text style={styles.colorText}>
                    {utilityMap[item.color].toUpperCase()}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <InfoAlert />
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
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: "transparent", // Default border color
  },
  dayInfo: {
    flexDirection: "column",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
  },
  colorText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
});
