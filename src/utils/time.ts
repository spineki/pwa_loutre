import { pad } from "./numbers";

/**
 * Sleep for a provided amount of time current thread
 * @param ms
 * @returns
 */
export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * turns minutes into 3h40 format
 * @param minutes - minutes to format
 * @returns hours-minutes formated time
 */
export function formatTime(minutes: number): string {
  const minute = minutes % 60;
  const hour = Math.trunc(minutes / 60);
  if (hour === 0) {
    return `${minute} min`;
  }
  return `${hour}h${pad(minute, 2)}`;
}

/**
 * Example; 2024_01_23
 * @param date
 * @returns
 */
export function dateToPathCompatibleIsoFormat(date: Date) {
  return date.toISOString().split("T")[0].replaceAll("-", "_");
}
