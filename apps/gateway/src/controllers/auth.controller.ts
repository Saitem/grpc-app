import { Request, Response } from 'express';
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

async function signUpPromise (req: Request, res: Response, retries: number = 3, timeout: number = 10000)  {
  console.log(`Retries: ${retries}`);
  return new Promise((async (resolve, reject) => {
      await authService.SignUp({
        username: req.body.username,
        password: req.body.password
      }, (err, response) => {
        if (!response && retries > 0) {
          setTimeout(() => {
            return signUpPromise(req, res, retries - 1, timeout);
          }, timeout)
        } else {
          return resolve(response)
        }
      })
    }))
}

export const signUp = async (req: Request, res: Response) => {
  const response = await signUpPromise(req, res)
  console.log(`Response: ${JSON.stringify(response)}`);
  res.send(response)
}



export const signIn = async (req: Request, res: Response) => {
  const response = await retryCall(async () => (
    await grpcCall(authService, 'SignIn', {
        username: req.body.username,
        password: req.body.password
    })
  ));

  console.log(response);
  res.send(response);

  // authService.SignIn({
  //   username: req.body.username,
  //   password: req.body.password
  // }, (err, response) => {
  //   if (response) {
  //     res.send({ ...response });
  //   } else {
  //     res.send(response);
  //   }
  // });
}


async function grpcCall(serviceFunction, serviceName: string, data) {
  return new Promise((resolve, reject) => {
    serviceFunction[serviceName](data, (err, response) => {
      if (response) {
        return resolve(response);
      } else {
        return reject(err);
      }
    });
  });
}

function sleep (milliseconds) {
  console.log(`Sleep on ${milliseconds / 1000} seconds`);
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function retryCall(callFunc, retries = 3) {
  console.log(`Attempts left ${retries}`);
  try {
      return await callFunc();
  } catch (e) {
    if (retries > 0) {
        await sleep(10000); // TODO: change it
        return retryCall(callFunc, retries - 1);
    } else {
        return {
            message: 'Service unavailable',
        }; // TODO: change it
    }
  }
}
