import { ColorMap, UtilityMap } from "./types";

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

const day = {
  0: "Poniedziałek",
  1: "Wtorek",
  2: "Środa",
  3: "Czwartek",
  4: "Piątek",
  5: "Sobota",
  6: "Niedziela",
} as const;

const gregorianMonths = {
  1: "styczen",
};

export const whichWeekDay = (day: number, month: string) => {
  const q = day;
};
