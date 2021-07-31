import { loadSync } from "@grpc/proto-loader";
const grpc = require('@grpc/grpc-js');

export const grpcInit = (proto_path, proto_service, address) => {
  const packageDefinition = loadSync(proto_path,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  );
  
  const proto: any = grpc.loadPackageDefinition(packageDefinition);
  const service = new proto[proto_service](address, grpc.credentials.createInsecure());

  return service;
}