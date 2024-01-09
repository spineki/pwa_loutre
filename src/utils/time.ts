import { pad } from "./numbers";

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
