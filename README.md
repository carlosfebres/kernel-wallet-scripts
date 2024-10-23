# Kernel Wallet Scripts

This project demonstrates how to send transactions to a Kernel wallet without using account abstraction.

## Scripts

### Deploy a Kernel wallet

This script deploys a Kernel wallet using the signer without the entry point contract.

### Execute transactions using a Kernel wallet

This script executes a transaction using a Kernel wallet and the signer without using an EntryPoint contract.

#### Execute a single transaction

```typescript
// Define the call to be executed
const calls: KernelEncodeCallDataArgs = {
  data: "0x",
  value: 1n,
  to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
  callType: "call",
};

// Set transactions directly to the Kernel wallet using the signer
const txHash = await walletClient.sendTransaction({
  to: kernelWallet.address,
  data: await kernelWallet.encodeCallData(calls),
});
```

#### Execute a multiple transactions

```typescript
// To execute multiple calls, use an array of calls
const calls = [
  {
    data: "0x",
    value: 1n,
    to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
    callType: "call",
  },
  {
    data: "0x",
    value: 1n,
    to: "0x256B70644f5D77bc8e2bb82C731Ddf747ecb1471",
    callType: "call",
  },
];

// Set transactions directly to the Kernel wallet using the signer
const txHash = await walletClient.sendTransaction({
  to: kernelWallet.address,
  data: await kernelWallet.encodeCallData(calls),
});
```

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd kernel-wallet-scripts
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```dotenv
   ACCOUNT_PRIVATE_KEY=your_private_key_here
   ```

## Usage

### Deploying the Kernel Wallet

Run the `deploy.ts` script to deploy the Kernel wallet:

```sh
npx ts-node scripts/deploy.ts
```

Executing a Transaction
Run the execute.ts script to execute a transaction using the Kernel wallet:

```sh
npx ts-node scripts/execute.ts
```
