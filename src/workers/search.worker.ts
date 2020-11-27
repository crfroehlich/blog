export function search(time) {
  debugger
  let start = Date.now(),
      count = 0
  while (Date.now() - start < time) count++
  return count
}
