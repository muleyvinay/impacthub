'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { WalletIcon, CopyIcon, ExternalLinkIcon, CheckIcon, XIcon } from './icons';

interface WalletConnectProps {
  className?: string;
  showBalance?: boolean;
  showNetwork?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function WalletConnect({ 
  className = '', 
  showBalance = true, 
  showNetwork = true,
  size = 'md'
}: WalletConnectProps) {
  const { 
    wallet, 
    isConnecting, 
    connectWallet, 
    disconnectWallet, 
    isWalletInstalled,
    supportedWallets 
  } = useWallet();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (wallet) {
      setBalance(wallet.balance);
    }
  }, [wallet]);

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getNetworkColor = (network: string) => {
    if (network.includes('Mainnet')) return 'bg-green-100 text-green-800';
    if (network.includes('Testnet')) return 'bg-yellow-100 text-yellow-800';
    if (network.includes('Polygon')) return 'bg-purple-100 text-purple-800';
    if (network.includes('BSC')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (!isWalletInstalled) {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white ${getSizeClasses()} rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}>
        <div className="flex items-center space-x-3">
          <WalletIcon size="md" />
          <span>Install Wallet</span>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white ${getSizeClasses()} rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isConnecting ? (
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <WalletIcon size="md" />
            <span>Connect Wallet</span>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`bg-white/90 backdrop-blur-sm text-gray-700 ${getSizeClasses()} rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200 hover:border-gray-300`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <WalletIcon size="sm" className="text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold">{formatAddress(wallet.address)}</div>
            {showBalance && (
              <div className="text-sm text-gray-600">{balance} ETH</div>
            )}
          </div>
        </div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 z-50 animate-fade-in">
          {/* Wallet Info */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Wallet Connected</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Address</div>
                <div className="flex items-center space-x-2">
                  <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg flex-1">
                    {wallet.address}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {copied ? <CheckIcon size="sm" /> : <CopyIcon size="sm" />}
                  </button>
                </div>
              </div>

              {showBalance && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Balance</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {balance} ETH
                  </div>
                </div>
              )}

              {showNetwork && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Network</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getNetworkColor(wallet.network)}`}>
                    {wallet.network}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="py-2">
            <button
              onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
              className="flex items-center space-x-3 w-full px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <ExternalLinkIcon size="sm" />
              <span>View on Etherscan</span>
            </button>
            
            <button
              onClick={disconnectWallet}
              className="flex items-center space-x-3 w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <XIcon size="sm" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
