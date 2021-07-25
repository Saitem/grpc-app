import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { signIn, signUp } from './microservices/auth';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

dotenv.config()

const PROTO_PATH = __dirname + '/protos/auth.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  arrays: true,
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(customersProto.AuthService.service, {
  SignUp: signUp,
  SignIn: signIn
});

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
(err) => {
  if (err) {
    console.log(err);
  }
  console.log('Сonnection established');
});

const port = 8888;
const uri = `0.0.0.0:${port}`;
console.log(`Listening on ${uri}`);
server.bind(uri, grpc.ServerCredentials.createInsecure());

server.start();
