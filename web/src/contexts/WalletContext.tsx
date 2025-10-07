'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  chainId: number;
  isConnected: boolean;
  provider?: any;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
  gasPrice?: string;
}

interface WalletContextType {
  wallet: WalletInfo | null;
  isConnecting: boolean;
  transactions: Transaction[];
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string, data?: string) => Promise<string | null>;
  switchNetwork: (chainId: number) => Promise<boolean>;
  getBalance: () => Promise<string>;
  getTransactions: () => Promise<Transaction[]>;
  signMessage: (message: string) => Promise<string | null>;
  isWalletInstalled: boolean;
  supportedWallets: string[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  const supportedWallets = [
    'MetaMask',
    'WalletConnect',
    'Coinbase Wallet',
    'Trust Wallet',
    'Rainbow',
    'Phantom',
    'Brave Wallet'
  ];

  useEffect(() => {
    // Check if wallet is installed
    const checkWalletInstalled = () => {
      const ethereum = (window as any).ethereum;
      setIsWalletInstalled(!!ethereum);
    };

    checkWalletInstalled();

    // Check for existing connection
    const checkExistingConnection = async () => {
      try {
        const ethereum = (window as any).ethereum;
        if (ethereum && ethereum.selectedAddress) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const balance = await getBalance();
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            
            setWallet({
              address: accounts[0],
              balance,
              network: getNetworkName(parseInt(chainId)),
              chainId: parseInt(chainId),
              isConnected: true,
              provider: ethereum
            });
          }
        }
      } catch (error) {
        console.error('Error checking existing connection:', error);
      }
    };

    checkExistingConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWallet(null);
      } else {
        setWallet(prev => prev ? { ...prev, address: accounts[0] } : null);
      }
    };

    // Listen for chain changes
    const handleChainChanged = (chainId: string) => {
      const newChainId = parseInt(chainId);
      setWallet(prev => prev ? {
        ...prev,
        chainId: newChainId,
        network: getNetworkName(newChainId)
      } : null);
    };

    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const getNetworkName = (chainId: number): string => {
    const networks: { [key: number]: string } = {
      1: 'Ethereum Mainnet',
      3: 'Ropsten Testnet',
      4: 'Rinkeby Testnet',
      5: 'Goerli Testnet',
      42: 'Kovan Testnet',
      137: 'Polygon',
      80001: 'Polygon Mumbai',
      56: 'BSC',
      97: 'BSC Testnet',
      250: 'Fantom',
      4002: 'Fantom Testnet',
      43114: 'Avalanche',
      43113: 'Avalanche Fuji',
      10: 'Optimism',
      420: 'Optimism Goerli',
      42161: 'Arbitrum',
      421613: 'Arbitrum Goerli'
    };
    return networks[chainId] || `Chain ${chainId}`;
  };

  const connectWallet = async (): Promise<boolean> => {
    try {
      setIsConnecting(true);
      
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error('No crypto wallet found. Please install MetaMask or another compatible wallet.');
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const balance = await getBalance();
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      
      const walletInfo: WalletInfo = {
        address: accounts[0],
        balance,
        network: getNetworkName(parseInt(chainId)),
        chainId: parseInt(chainId),
        isConnected: true,
        provider: ethereum
      };

      setWallet(walletInfo);
      
      // Store connection in localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);
      
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setTransactions([]);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  const getBalance = async (): Promise<string> => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum || !wallet) return '0';

      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [wallet.address, 'latest']
      });

      // Convert from wei to ether
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      return balanceInEth.toFixed(4);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };

  const sendTransaction = async (to: string, amount: string, data?: string): Promise<string | null> => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum || !wallet) return null;

      const value = (parseFloat(amount) * Math.pow(10, 18)).toString(16);
      
      const transactionParams = {
        from: wallet.address,
        to,
        value: `0x${value}`,
        data: data || '0x'
      };

      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      });

      // Add to transactions list
      const newTransaction: Transaction = {
        hash: txHash,
        from: wallet.address,
        to,
        value: amount,
        timestamp: Date.now(),
        status: 'pending'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      return null;
    }
  };

  const switchNetwork = async (chainId: number): Promise<boolean> => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) return false;

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });

      return true;
    } catch (error) {
      console.error('Error switching network:', error);
      return false;
    }
  };

  const getTransactions = async (): Promise<Transaction[]> => {
    // In a real implementation, you would fetch from a blockchain explorer API
    // For now, return the stored transactions
    return transactions;
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum || !wallet) return null;

      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, wallet.address]
      });

      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  };

  const value: WalletContextType = {
    wallet,
    isConnecting,
    transactions,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    switchNetwork,
    getBalance,
    getTransactions,
    signMessage,
    isWalletInstalled,
    supportedWallets
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
