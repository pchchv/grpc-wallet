import {
  WalletService,
  WalletInfoResponse,
  BalanceResponse,
  BalanceRequest,
  TransactionResponse,
  TransactionRequest,
  CreateAddressResponse,
  CreateAddressRequest,
} from "../protos/wallet";
import {
  Server,
  ServerUnaryCall,
  sendUnaryData,
  ServerCredentials,
} from "@grpc/grpc-js";

async function walletInfo(
  call: ServerUnaryCall<string, string>,
  callback: sendUnaryData<WalletInfoResponse>,
) {
  const address = call.request;
  try {
    const result = {
      total: 100,
      available: 80,
    };

    const transactions = [
      {
        toAddress: "0x1234567890",
        points: 10,
        timestamp: Date.now(),
        metadata: "",
      },
      {
        toAddress: "0x0987654321",
        points: 20,
        timestamp: Date.now(),
        metadata: "",
      },
    ];

    callback(null, {
      total: result.total,
      available: result.available,
      transactions: transactions,
    });
  } catch (err) {
    callback(null, null);
  }
}

function balance(
  call: ServerUnaryCall<BalanceRequest, BalanceResponse>,
  callback: sendUnaryData<BalanceResponse>,
) {
  // Perform necessary business logic
  const total = 100;
  const available = 50;
  const balanceResponse = new BalanceResponse();
  balanceResponse.setTotal(total);
  balanceResponse.setAvailable(available);
  callback(null, balanceResponse);
}

function transaction(
  call: ServerUnaryCall<TransactionRequest, TransactionResponse>,
  callback: sendUnaryData<TransactionResponse>,
) {
  // Perform necessary business logic
  const transactionId = Date.now();
  const transactionResponse = new TransactionResponse();
  transactionResponse.setTransactionId(transactionId);
  callback(null, transactionResponse);
}

function createAddress(
  call: ServerUnaryCall<CreateAddressRequest, CreateAddressResponse>,
  callback: sendUnaryData<CreateAddressResponse>,
) {
  // Perform necessary business logic
  const address = "0x1234567890abcdef";
  const createAddressResponse = new CreateAddressResponse();
  createAddressResponse.setAddress(address);
  callback(null, createAddressResponse);
}

const server = new Server();
server.addService(WalletService, {
  createAddress,
  transaction,
  balance,
  walletInfo,
});
server.bindAsync("localhost:8080", ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://localhost:8080");
});
