import { Request, Response } from 'express';
import { grpcInit } from '../grpc_init';

const PROTO_PATH = __dirname + '/protos/fibonacci.proto';

const fibonacciService = grpcInit(PROTO_PATH, 'FibonacciService', '0.0.0.0:8000');


export const fibonacci = async (req: Request, res: Response) => {
  fibonacciService.Fibonacci({
    num: req.body.num
  }, (err, response) => {
    if (response) {
      res.send({ ...response});
    } else {
      res.send(response);
    }
  });
}
