import { WalletClient } from "../protos/wallet";
import { credentials } from "@grpc/grpc-js";

const client = new WalletClient(
    "localhost:8080",
    credentials.createInsecure(),
);
