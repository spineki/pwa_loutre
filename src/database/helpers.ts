// courtesy to https://dexie.org/docs/Collection/Collection.offset()

// allow pagination to jump directly from the last element
export function fastForward<T, U extends keyof T>(
  lastId: T[U],
  idProp: U,
  filter: (entry: T) => boolean,
) {
  let fastForwardComplete = false;
  return (item: T) => {
    if (fastForwardComplete) return filter(item);
    if (item[idProp] === lastId) {
      fastForwardComplete = true;
    }
    return false;
  };
}
