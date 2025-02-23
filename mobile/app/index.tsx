import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import MonthSwitcher from "@/lib/components/MonthSwitcher";
import { useSchedule } from "@/lib/context";
import { ScheduleColor, ScheduleItem } from "@/lib/types";
import { colorMap, utilityMap } from "@/lib/utils";

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
              <View style={styles.itemContainer}>
                <View style={styles.dayInfo}>
                  <Text style={styles.dayText}>Day {item.day}</Text>
                  <View
                    style={[
                      styles.underline,
                      { backgroundColor: colorMap[item.color] },
                    ]}
                  />
                </View>
                <Text style={styles.colorText}>
                  {utilityMap[item.color].toUpperCase()}
                </Text>
              </View>
            )}
          />
        )}
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
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  dayInfo: {
    flexDirection: "column",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
  },
  underline: {
    height: 4,
    width: "100%",
    marginTop: 4,
    borderRadius: 2,
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
});
