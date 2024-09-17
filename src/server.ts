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
import { AppDataSource } from "./data-source";

async function walletInfo(
  call: ServerUnaryCall<string, string>,
  callback: sendUnaryData<WalletInfoResponse>,
) {
  const address = call.request;
  try {
    const result = await AppDataSource.query(
      `SELECT SUM(value) as total, SUM(CASE WHEN to_address = '${address}' THEN value ELSE 0 END) as available FROM transactions WHERE from_address = '${address}'`,
    );
    const transactions = await AppDataSource.query(
      `SELECT to_address, value, timestamp, metadata FROM transactions WHERE from_address = '${address}'`,
    );
    callback(null, {
      total: result[0].total,
      available: result[0].available,
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
