import { Request, Response, NextFunction } from 'express';
import { grpcInit } from '../grpc_init';

const PROTO_PATH = __dirname + '/protos/auth.proto';

const authService = grpcInit(PROTO_PATH, 'AuthService', '0.0.0.0:8888');

declare global {
  namespace Express {
      interface Request {
        resp? : Record<string,any>
      }
  }
}

async function signUpPromise (req: Request, res: Response, retries: number = 3, timeout: number = 300)  {
    const result = await new Promise((async (resolve, reject) => {
      await authService.SignUp({
        username: req.body.username,
        password: req.body.password
      }, (err, response) => {
        if (!response) {
          setTimeout(() => {
            return signUpPromise(req, res, retries - 1, timeout * 2);

          }, timeout)
        } else {
          return resolve(response)
        }
      })
    }))

    return result
}

export const signUp = async (req: Request, res: Response) => {
  const response = await signUpPromise(req, res)
  res.send(response)
}



export const signIn = async (req: Request, res: Response) => {
  authService.SignIn({
    username: req.body.username,
    password: req.body.password
  }, (err, response) => {
    if (response) {
      res.send({ ...response });
    } else {
      res.send(response);
    }
  });
}