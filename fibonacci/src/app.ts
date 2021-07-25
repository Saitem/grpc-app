import { fibonacci } from './microservices/fibonacci';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/fibonacci.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  arrays: true,
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(customersProto.FibonacciService.service, {
  Fibonacci: fibonacci
});



const port = 8000;
const uri = `0.0.0.0:${port}`;
console.log(`Listening on ${uri}`);
server.bind(uri, grpc.ServerCredentials.createInsecure());

server.start();
