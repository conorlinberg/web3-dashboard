import { ConnectButton } from '@rainbow-me/rainbowkit';
import AccountAndTokenBalances from './components/AccountAndTokenBalances';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ConnectButton />
      <AccountAndTokenBalances />
    </div>
  );
}