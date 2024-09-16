# grpc-wallet

*A simple gRPC wallet service.*

## Compiling proto file
After any change in `auth.proto` file it needs to be recompiled by running the following command:
```sh
protoc --plugin=node_modules\ts-proto\protoc-gen-ts_proto --ts_proto_out=. ./protos/wallet.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true --experimental_allow_proto3_optional
```