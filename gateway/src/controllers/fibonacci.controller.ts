import { Request, Response } from 'express';
import { grpcInit } from '../grpc_init';
import retryGrpcCall from '../helpers/retry';

const PROTO_PATH = __dirname + '/protos/fibonacci.proto';

const fibonacciService = grpcInit(PROTO_PATH, 'FibonacciService', '0.0.0.0:8000');

export const fibonacci = async (req: Request, res: Response) => {
  const response = await retryGrpcCall(fibonacciService, 'Fibonacci', {
    num: req.body.num
  })

  res.send(response);
}