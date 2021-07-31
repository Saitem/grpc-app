import { fib } from '../utils/fib'

export const fibonacci = (call, callback) => {
  let num = call.request.num;

  callback(null, {num: fib(num)});
}