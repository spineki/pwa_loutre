// courtesy to https://dexie.org/docs/Collection/Collection.offset()

// allow pagination to jump directly from the last element
export function fastForward<T>(
  lastRow: T,
  idProp: keyof T,
  filter: (entry: T) => boolean,
) {
  let fastForwardComplete = false;
  return (item: T) => {
    if (fastForwardComplete) return filter(item);
    if (item[idProp] === lastRow[idProp]) {
      fastForwardComplete = true;
    }
    return false;
  };
}
