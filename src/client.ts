import { WalletClient, WalletInfoRequest } from "../protos/wallet";
import { credentials } from "@grpc/grpc-js";

const client = new WalletClient("localhost:8080", credentials.createInsecure());

const request = new WalletInfoRequest();
request.setAddress("0x1234567890abcdef");

client.walletInfo(request, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.getTotal());
    console.log(response.getAvailable());
    console.log(response.getTransactionsList());
  }
});
