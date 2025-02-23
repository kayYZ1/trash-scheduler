import { ColorMap, UtilityMap } from "./types";
import { Ionicons } from "@expo/vector-icons";

export const colorMap: ColorMap = {
  czarne: "black",
  zolte: "yellow",
  brazowe: "brown",
  zielone: "green",
  niebieskie: "blue",
};

export const utilityMap: UtilityMap = {
  czarne: "Mieszane",
  zolte: "Plastiki",
  brazowe: "Organiczne",
  zielone: "Szklane",
  niebieskie: "Papiery",
};

export const utilityIconMap = {
  czarne: "trash-bin", // Mixed waste
  zolte: "cube", // Plastics
  brazowe: "leaf", // Organic waste
  zielone: "wine-outline", // Glass
  niebieskie: "document-text", // Paper
} as const;

export const scheduleMonths = [
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
  "styczeń",
  "luty",
  "marzec",
] as const;

export const months = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
] as const;

//In Zeller's congruence days start from saturday
const days = {
  0: "Sobota",
  1: "Niedziela",
  2: "Poniedziałek",
  3: "Wtorek",
  4: "Środa",
  5: "Czwartek",
  6: "Piątek",
} as const;

export const whichWeekDay = (day: number, month: (typeof months)[number]) => {
  let year = new Date().getFullYear();
  let m = months.indexOf(month) + 1;

  if (m < 3) {
    m += 12;
    year -= 1;
  }

  const q = day;
  const K = year % 100;
  const J = Math.floor(year / 100);

  //Use Zeller's congruence to calculate day of the week for Gregorian calendar
  const h = Math.floor(
    (q +
      Math.floor((13 * (m + 1)) / 5) +
      K +
      Math.floor(K / 4) +
      Math.floor(J / 4) +
      5 * J) %
      7,
  );

  return days[h as keyof typeof days];
};
