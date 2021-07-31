export const fib = (n: number): number => {
  let a: number = 1;
  let b: number = 1;
  for (let i: number = 3; i <= n; i++) {
    let c: number = a + b;
    a = b;
    b = c;
  }
  return b;
}