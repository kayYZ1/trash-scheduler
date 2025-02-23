export type ScheduleColor =
  | "czarne"
  | "zolte"
  | "brazowe"
  | "zielone"
  | "niebieskie";

export type ScheduleItem = {
  day: number;
  color: ScheduleColor;
};

export type ColorMap = {
  [key in ScheduleColor]: string;
};

export type UtilityMap = ColorMap;
