import { createContext, useContext, useMemo, useState, ReactNode } from "react";

import schedule from "./data/schedule.json";

type ScheduleType = typeof schedule;

interface ScheduleContextType {
  schedule: ScheduleType[keyof ScheduleType];
  month: keyof ScheduleType;
  changeMonthSchedule: (month: keyof ScheduleType) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined,
);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const initialMonth = Object.keys(schedule)[1] as keyof ScheduleType;
  const [month, setMonth] = useState<keyof ScheduleType>(initialMonth);
  const [currentSchedule, setCurrentSchedule] = useState<
    ScheduleType[keyof ScheduleType]
  >(schedule[initialMonth]);

  const changeMonthSchedule = (month: keyof ScheduleType) => {
    setMonth(month);
    setCurrentSchedule(schedule[month]);
  };

  const value = useMemo(
    () => ({
      schedule: currentSchedule,
      month,
      changeMonthSchedule,
    }),
    [currentSchedule, month],
  );

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = (): ScheduleContextType => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};
