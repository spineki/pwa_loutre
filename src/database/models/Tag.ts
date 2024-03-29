export function sanitizeTagName(rawName: string): string {
  return rawName
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(".", "-")
    .replaceAll("_", "-");
}

export interface Tag {
  id?: number;
  isFavorite: boolean;
  name: string;
}
