export type DayAvailability = {
  key: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  label: string;
  slots: string[];
};

// Weekly availability shown on the Contact section.
// Adjust freely to match your real calendar.
export const weeklyAvailability: DayAvailability[] = [
  { key: "mon", label: "Mon", slots: ["10:00", "14:00", "16:00"] },
  { key: "tue", label: "Tue", slots: ["11:00", "13:00"] },
  { key: "wed", label: "Wed", slots: ["10:00", "13:00", "17:00"] },
  { key: "thu", label: "Thu", slots: ["14:00", "16:00"] },
  { key: "fri", label: "Fri", slots: ["10:00", "12:00"] },
  { key: "sat", label: "Sat", slots: [] },
  { key: "sun", label: "Sun", slots: [] },
];

// IST (Asia/Kolkata) active hours for the "Active / Sleeping" status pill.
export const activeHoursIST = { start: 9, end: 23 };
