import { Buffer } from "buffer";

// courtesy https://stackoverflow.com/a/46639837
export async function getBase64FromBlob(
  file: Blob,
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function getBlobFromBase64(base64: string): Promise<Blob> {
  // in case of base 64 starting by data:image/jpeg;base64,, only using the datapart
  if (base64.includes(",")) {
    base64 = base64.split(",")[1];
  }
  const buffer = Buffer.from(base64, "base64");
  return new Blob([buffer]);
}
