import { useAccount, useBalance, useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

export function TokenBalance({ tokenAddress, symbol }: { tokenAddress: `0x${string}`; symbol: string }) {
  const { address } = useAccount();

  const { data } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address!],
  });

  if (!address) return null;

  const formattedBalance = data ? Number(data) / 1e6 : 0; // Adjust decimals as needed (USDC = 6)

  return (
    <p><strong>{symbol} Balance:</strong> {formattedBalance}</p>
  );
}

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    token: undefined, // ETH balance
  });

  if (!isConnected) return null;

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p><strong>Wallet Address:</strong> {address}</p>
      <p><strong>ETH Balance:</strong> {ethBalance?.formatted} ETH</p>

      {/* ✅ Add token balances below */}
      <TokenBalance tokenAddress="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" symbol="USDC" />
      <TokenBalance tokenAddress="0x6B175474E89094C44Da98b954EedeAC495271d0F" symbol="DAI" />
    </div>
  );
}