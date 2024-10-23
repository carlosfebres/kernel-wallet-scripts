import { waitForTransactionReceipt } from "viem/actions";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types/kernel";
import { getKernelWalletClient, walletClient } from "../utils/config";

async function execute() {
  // Get the kernel wallet address
  const kernelWallet = await getKernelWalletClient();

  // Define the calls to be executed
  const calls: KernelEncodeCallDataArgs = {
    data: "0x",
    value: 1n,
    to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
    callType: "call",
  };

  // To execute multiple calls, use an array of calls
  // const calls: KernelEncodeCallDataArgs = [
  //   {
  //     data: "0x",
  //     value: 1n,
  //     to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
  //     callType: "call",
  //   },
  //   {
  //     data: "0x",
  //     value: 1n,
  //     to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
  //     callType: "call",
  //   },
  // ];

  // Set transactions directly to the Kernel wallet using the signer
  const txHash = await walletClient.sendTransaction({
    to: kernelWallet.address,
    data: await kernelWallet.encodeCallData(calls),
  });

  console.log("Transaction hash: " + txHash);

  // Wait for the transaction to be executed
  await waitForTransactionReceipt(walletClient, { hash: txHash });

  console.log("Transaction has been executed!");
}

execute();
