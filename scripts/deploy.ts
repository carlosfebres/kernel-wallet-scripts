import { Hex } from "viem";
import { waitForTransactionReceipt } from "viem/actions";

import { account, getKernelWalletClient, walletClient } from "../utils/config";

export async function deploy() {
  console.log("Kernel signer/owner address: ", account.address);

  const kernelAccount = await getKernelWalletClient();
  const initCode = await kernelAccount.getInitCode();

  const factoryAddr = ("0x" + initCode.substring(2, 42)) as Hex;
  const factoryCallData = ("0x" + initCode.substring(42)) as Hex;

  try {
    const deployTxHash = await walletClient.sendTransaction({
      to: factoryAddr,
      data: factoryCallData,
    });

    console.log("Deploy transaction sent...");

    await waitForTransactionReceipt(walletClient, { hash: deployTxHash });

    console.log("Kernel wallet deployed! Address: ", kernelAccount.address);
  } catch (error) {
    console.log("Deployment failed: ", (error as any).details);
  }
}

deploy();
