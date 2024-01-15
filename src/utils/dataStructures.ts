export function groupBy<K, V>(
  array: Array<V>,
  keyExtractor: (element: V) => K
): Map<K, Array<V>> {
  const groupedMap: Map<K, Array<V>> = new Map();

  for (const element of array) {
    const key = keyExtractor(element);
    let group = groupedMap.get(key);
    if (group === undefined) {
      group = [];
      groupedMap.set(key, group);
    }
    group.push(element);
  }

  return groupedMap;
}
