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
      // Ethereum
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      17000: 'Holesky Testnet',
      // Polygon
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
      80002: 'Amoy Testnet',
      // BSC
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
      // Arbitrum
      42161: 'Arbitrum One',
      42170: 'Arbitrum Nova',
      421613: 'Arbitrum Goerli',
      421614: 'Arbitrum Sepolia',
      // Optimism
      10: 'Optimism',
      420: 'Optimism Goerli',
      11155420: 'Optimism Sepolia',
      // Base
      8453: 'Base',
      84531: 'Base Goerli',
      84532: 'Base Sepolia',
      // Avalanche
      43114: 'Avalanche C-Chain',
      43113: 'Avalanche Fuji',
      // Fantom
      250: 'Fantom Opera',
      4002: 'Fantom Testnet',
      // zkSync
      324: 'zkSync Era',
      280: 'zkSync Era Testnet',
      // Linea
      59144: 'Linea',
      59140: 'Linea Testnet',
      // Scroll
      534352: 'Scroll',
      534351: 'Scroll Sepolia',
      // Mantle
      5000: 'Mantle',
      5001: 'Mantle Testnet',
      // Celo
      42220: 'Celo',
      44787: 'Celo Alfajores',
      // Gnosis
      100: 'Gnosis Chain',
      10200: 'Gnosis Chiado',
      // Moonbeam
      1284: 'Moonbeam',
      1287: 'Moonbase Alpha',
      // Local/Dev
      1337: 'Localhost',
      31337: 'Hardhat Network',
      // Intuition
      13579: 'Intuition Testnet',
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  /**
   * Get native token symbol from chain ID
   */
  const getNativeTokenSymbol = (chainId: number): string => {
    const symbols: Record<number, string> = {
      // Ethereum & L2s using ETH
      1: 'ETH',
      5: 'ETH',
      11155111: 'ETH',
      17000: 'ETH',
      42161: 'ETH',
      42170: 'ETH',
      421613: 'ETH',
      421614: 'ETH',
      10: 'ETH',
      420: 'ETH',
      11155420: 'ETH',
      8453: 'ETH',
      84531: 'ETH',
      84532: 'ETH',
      324: 'ETH',
      280: 'ETH',
      59144: 'ETH',
      59140: 'ETH',
      534352: 'ETH',
      534351: 'ETH',
      1284: 'GLMR',
      1287: 'DEV',
      // Polygon
      137: 'MATIC',
      80001: 'MATIC',
      80002: 'MATIC',
      // BSC
      56: 'BNB',
      97: 'BNB',
      // Avalanche
      43114: 'AVAX',
      43113: 'AVAX',
      // Fantom
      250: 'FTM',
      4002: 'FTM',
      // Mantle
      5000: 'MNT',
      5001: 'MNT',
      // Celo
      42220: 'CELO',
      44787: 'CELO',
      // Gnosis
      100: 'xDAI',
      10200: 'xDAI',
      // Local/Dev
      1337: 'ETH',
      31337: 'ETH',
      13579: 'TRUST',
    };
    return symbols[chainId] || 'ETH';
  };

  /**
   * Fetch the balance and network info for a given address
   */
  const fetchBalance = useCallback(async (address: string) => {
    try {
      if (!window.ethereum) {
        console.error('❌ window.ethereum not found');
        return;
      }
      
      console.log('📡 Fetching balance for address:', address);
      
      const provider = new BrowserProvider(window.ethereum);
      
      // Get network info FIRST
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      const networkName = getNetworkName(chainId);
      const tokenSymbol = getNativeTokenSymbol(chainId);
      
      console.log(`🌐 Current MetaMask network: Chain ID ${chainId} = ${networkName} (${tokenSymbol})`);
      
      // Then get balance
      const balance = await provider.getBalance(address);
      const formattedBalance = formatEther(balance);
      
      console.log(`🔍 Network Detection Complete:
        Address: ${address.slice(0, 6)}...${address.slice(-4)}
        Network: ${networkName} (Chain ID: ${chainId})
        Token: ${tokenSymbol}
        Balance: ${parseFloat(formattedBalance).toFixed(4)} ${tokenSymbol}`);
      
      setWalletState(prev => ({
        ...prev,
        balance: parseFloat(formattedBalance).toFixed(4),
        chainId,
        networkName,
      }));
    } catch (error) {
      console.error('❌ Error fetching balance:', error);
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
   * Handle account and network changes
   */
  useEffect(() => {
    if (!window.ethereum) {
      console.log('⚠️ window.ethereum not available for event listeners');
      return;
    }

    console.log('🎧 Setting up event listeners...');
    console.log('🔍 window.ethereum type:', typeof window.ethereum);
    console.log('🔍 window.ethereum.on exists:', typeof window.ethereum.on === 'function');

    const handleAccountsChanged = async (accounts: string[]) => {
      console.log('👤 accountsChanged event fired:', accounts);
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        console.log('👤 Account changed to:', accounts[0]);
        setWalletState(prev => ({
          ...prev,
          address: accounts[0],
          balance: null,
          chainId: null,
          networkName: null,
        }));
        await fetchBalance(accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex: any) => {
      console.log(`🔄🔄🔄 chainChanged event FIRED! 🔄🔄🔄`);
      console.log(`Chain ID (hex): ${chainIdHex}`);
      console.log(`Chain ID (decimal): ${parseInt(chainIdHex, 16)}`);
      console.log('Reloading page in 1 second...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    // Test if events work
    console.log('🧪 Testing event system...');
    const testHandler = () => console.log('✅ Test event fired!');
    window.ethereum.on('test', testHandler);
    // @ts-ignore - testing event emission
    if (window.ethereum.emit) window.ethereum.emit('test');
    window.ethereum.removeListener('test', testHandler);

    // Register event listeners
    try {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      console.log('✅ Event listeners registered successfully');
    } catch (error) {
      console.error('❌ Error registering event listeners:', error);
    }

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up event listeners');
      if (!window.ethereum) return;
      try {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        console.log('✅ Event listeners removed');
      } catch (error) {
        console.error('❌ Error removing event listeners:', error);
      }
    };
  }, [disconnectWallet, fetchBalance]);

  /**
   * Check if wallet was previously connected on mount
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled() || !window.ethereum) return;

      try {
        console.log('🔌 Checking for existing wallet connection...');
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        
        if (accounts.length > 0) {
          console.log('✅ Found connected account:', accounts[0]);
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
          }));
          await fetchBalance(accounts[0]);
        } else {
          console.log('ℹ️ No connected accounts found');
        }
      } catch (error) {
        console.error('❌ Error checking connection:', error);
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
