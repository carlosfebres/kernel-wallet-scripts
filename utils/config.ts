import "dotenv/config";
import { createPublicClient, createWalletClient, Hex, http } from "viem";
import { optimism } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { createKernelAccount } from "@zerodev/sdk";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";

export const account = privateKeyToAccount(
  process.env.ACCOUNT_PRIVATE_KEY! as Hex,
);

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const walletClient = createWalletClient({
  account,
  chain: optimism,
  transport: http(),
});

const kernelVersion = KERNEL_V3_1;

// Entry point V0.7 address
const entryPoint = "0x0000000071727de22e5e9d8baf0edac6f37da032" as any;

export async function getKernelWalletClient() {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: account,
    entryPoint,
    kernelVersion,
  });
  return createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion,
  });
}
