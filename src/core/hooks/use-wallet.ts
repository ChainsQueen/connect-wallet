import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, formatEther } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  networkName: string | null;
  isConnecting: boolean;
  error: string | null;
}

interface UseWalletReturn extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
  nativeTokenSymbol: string;
}

/**
 * Custom hook for managing Ethereum wallet connection
 * Handles connection, disconnection, balance fetching, and error states
 */
export function useWallet(): UseWalletReturn {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    networkName: null,
    isConnecting: false,
    error: null,
  });

  /**
   * Check if MetaMask is installed
   */
  const isMetaMaskInstalled = useCallback((): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }, []);

  /**
   * Get network name from chain ID
   */
  const getNetworkName = (chainId: number): string => {
    const networks: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
      42161: 'Arbitrum One',
      421613: 'Arbitrum Goerli',
      10: 'Optimism',
      420: 'Optimism Goerli',
      43114: 'Avalanche C-Chain',
      43113: 'Avalanche Fuji',
      250: 'Fantom Opera',
      4002: 'Fantom Testnet',
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  /**
   * Get native token symbol from chain ID
   */
  const getNativeTokenSymbol = (chainId: number): string => {
    const symbols: Record<number, string> = {
      1: 'ETH',
      5: 'ETH',
      11155111: 'ETH',
      137: 'MATIC',
      80001: 'MATIC',
      56: 'BNB',
      97: 'BNB',
      42161: 'ETH',
      421613: 'ETH',
      10: 'ETH',
      420: 'ETH',
      43114: 'AVAX',
      43113: 'AVAX',
      250: 'FTM',
      4002: 'FTM',
    };
    return symbols[chainId] || 'ETH';
  };

  /**
   * Fetch the balance and network info for a given address
   */
  const fetchBalance = useCallback(async (address: string) => {
    try {
      if (!window.ethereum) return;
      
      const provider = new BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const formattedBalance = formatEther(balance);
      
      // Get network info
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      setWalletState(prev => ({
        ...prev,
        balance: parseFloat(formattedBalance).toFixed(4),
        chainId,
        networkName: getNetworkName(chainId),
      }));
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Don't set error state for balance fetch failures
      // as the main connection is still valid
    }
  }, []);

  /**
   * Connect to the user's Ethereum wallet
   */
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setWalletState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to continue.',
      }));
      return;
    }

    setWalletState(prev => ({
      ...prev,
      isConnecting: true,
      error: null,
    }));

    try {
      if (!window.ethereum) {
        throw new Error('Ethereum provider not found');
      }
      
      const provider = new BrowserProvider(window.ethereum);
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      const address = accounts[0];
      
      setWalletState(prev => ({
        ...prev,
        address,
        isConnecting: false,
      }));

      // Fetch balance after successful connection
      await fetchBalance(address);
      
    } catch (error: any) {
      let errorMessage = 'Failed to connect wallet.';
      
      // Handle specific error cases
      if (error.code === 4001) {
        errorMessage = 'Connection request rejected. Please approve the connection.';
      } else if (error.code === -32002) {
        errorMessage = 'Connection request already pending. Please check MetaMask.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
    }
  }, [isMetaMaskInstalled, fetchBalance]);

  /**
   * Disconnect the wallet
   */
  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      balance: null,
      chainId: null,
      networkName: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  /**
   * Handle account changes
   */
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (accounts[0] !== walletState.address) {
        // User switched accounts
        setWalletState(prev => ({
          ...prev,
          address: accounts[0],
        }));
        fetchBalance(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      // Reload the page when chain changes (recommended by MetaMask)
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, [walletState.address, disconnectWallet, fetchBalance]);

  /**
   * Check if wallet was previously connected on mount
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled() || !window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        
        if (accounts.length > 0) {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
          }));
          await fetchBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, [isMetaMaskInstalled, fetchBalance]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    isConnected: walletState.address !== null,
    nativeTokenSymbol: walletState.chainId ? getNativeTokenSymbol(walletState.chainId) : 'ETH',
  };
}
