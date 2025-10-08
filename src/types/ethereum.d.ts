/**
 * Type declarations for Ethereum provider (MetaMask)
 */

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: never[]) => void) => void;
  removeListener: (event: string, callback: (...args: never[]) => void) => void;
  selectedAddress: string | null;
}

interface Window {
  ethereum?: EthereumProvider;
}
