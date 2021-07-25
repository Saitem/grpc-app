import { Request, Response } from 'express';
import { grpcInit } from '../grpc_init';

const PROTO_PATH = __dirname + '/protos/auth.proto';

const authService = grpcInit(PROTO_PATH, 'AuthService', '0.0.0.0:8888');

export const signUp = async (req: Request, res: Response) => {
  authService.SignUp({
    username: req.body.username,
    password: req.body.password
  }, (err, response) => {
    if (response) {
      res.send({ ...response});
    } else {
      res.send(response);
    }
  });
}

export const signIn = async (req: Request, res: Response) => {
  authService.SignIn({
    username: req.body.username,
    password: req.body.password
  }, (err, response) => {
    if (response) {
      res.send({ ...response});
    } else {
      res.send(response);
    }
  });
}