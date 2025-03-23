import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ConnectButton />
      {isConnected && (
        <p className="mt-4">Connected Wallet: {address}</p>
      )}
    </div>
  );
}