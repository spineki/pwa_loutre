/**
 * Add zeros before number to create a number of size 'size'
 *
 * @param number - the number to pad
 * @param size - the size that must finally have the number
 * @returns the padded number
 */
export function pad(number: number, size: number): string {
  let buff = "";

  const exceding_size: number = size - number.toString().length;
  if (exceding_size < 0) {
    return number.toString();
  }

  for (let i = 0; i < exceding_size; i++) {
    buff += "0";
  }
  return buff + number;
}

export function pgcd(a: number, b: number) {
  do {
    const r = a;
    a = b;
    b = r % a;
  } while (b > 0);

  return a;
}
