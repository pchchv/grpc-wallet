import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { WalletInfoResponse } from '../protos/wallet';

async function walletInfo(call: ServerUnaryCall<string, string>, callback: sendUnaryData<WalletInfoResponse>) {
    const address = call.request;
    try {
        const result = {
            total: 100,
            available: 80,
        };

        const transactions = [
            {
                toAddress: '0x1234567890',
                points: 10,
                timestamp: Date.now(),
                metadata: "",
            },
            {
                toAddress: '0x0987654321',
                points: 20,
                timestamp: Date.now(),
                metadata: "",
            },
        ];
        
        callback(null, {
            total: result.total,
            available: result.available,
            transactions: transactions
        });
    } catch (err) {
        callback(null, null);
    }
}
