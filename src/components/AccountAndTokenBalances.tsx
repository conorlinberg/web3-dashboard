import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { erc20Abi } from 'viem';

const tokenAddresses: `0x${string}`[] = [
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
];

export default function AccountAndTokenBalances() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    token: undefined, // ETH balance
  });

  const { data: tokenData } = useReadContracts({
    contracts: tokenAddresses.flatMap((token) => ([
      { address: token, abi: erc20Abi, functionName: 'symbol' },
      { address: token, abi: erc20Abi, functionName: 'decimals' },
      { address: token, abi: erc20Abi, functionName: 'balanceOf', args: [address!] },
    ])),
    query: { enabled: !!address },
  });

  if (!isConnected) return null;

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p><strong>Wallet Address:</strong> {address}</p>
      <p><strong>ETH Balance:</strong> {ethBalance?.formatted} ETH</p>

      {/* ✅ Token balances */}
      {tokenData && tokenAddresses.map((token, index) => {
        const symbol = tokenData[index * 3]?.result;
        const decimals = tokenData[index * 3 + 1]?.result;
        const balanceRaw = tokenData[index * 3 + 2]?.result;

        const balance =
          decimals !== undefined && balanceRaw !== undefined
            ? Number(balanceRaw) / 10 ** Number(decimals)
            : null;

        const symbolText = symbol !== undefined ? symbol.toString() : 'Token';

        return (
          <p key={token}>
            <strong>{symbolText} Balance:</strong>{' '}
            {balance !== null ? balance.toFixed(4) : 'Loading...'}
          </p>
        );
      })}
    </div>
  );
}
