export function arrNumber(startNumber: number, endNumber: number): number[] {
  const arr = [];
  for (let i = startNumber; i <= endNumber; i++) {
    arr.push(i);
  }
  return arr;
}
