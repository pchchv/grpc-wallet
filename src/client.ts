import { WalletClient, WalletInfoRequest } from "../protos/wallet";
import { credentials } from "@grpc/grpc-js";

const client = new WalletClient(
    "localhost:8080",
    credentials.createInsecure(),
);

const request = new WalletInfoRequest();
request.setAddress('0x1234567890abcdef');
