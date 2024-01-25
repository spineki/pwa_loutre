export type Result<T, U> =
  | { success: true; data?: T }
  | { success: false; error: U };
