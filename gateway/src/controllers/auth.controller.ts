import { Request, Response } from 'express';
import { grpcInit } from '../grpc_init';
import retryGrpcCall from '../helpers/retry';

const PROTO_PATH = __dirname + '/protos/auth.proto';

const authService = grpcInit(PROTO_PATH, 'AuthService', '0.0.0.0:8888');

export const signUp = async (req: Request, res: Response) => {
  const response = await retryGrpcCall(authService, 'SignUp', {
      username: req.body.username,
      password: req.body.password
    })
 

  console.log(response);
  res.send(response);
}

export const signIn = async (req: Request, res: Response) => {
  const response = await retryGrpcCall(authService, 'SignIn', {
    username: req.body.username,
    password: req.body.password
  })


  console.log(response);
  res.send(response);
}