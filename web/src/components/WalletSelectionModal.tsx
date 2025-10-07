'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  WalletIcon, 
  CopyIcon, 
  ExternalLinkIcon, 
  CheckIcon, 
  XIcon,
  ArrowRightIcon 
} from './icons';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  isInstalled: boolean;
  downloadUrl: string;
  isPopular?: boolean;
}

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletSelectionModal({ isOpen, onClose }: WalletSelectionModalProps) {
  const { connectWallet, isConnecting } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const walletOptions: WalletOption[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'The most popular Ethereum wallet',
      isInstalled: !!(window as any).ethereum,
      downloadUrl: 'https://metamask.io/download/',
      isPopular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect any wallet',
      isInstalled: true,
      downloadUrl: 'https://walletconnect.com/'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Secure wallet by Coinbase',
      isInstalled: !!(window as any).ethereum?.isCoinbaseWallet,
      downloadUrl: 'https://www.coinbase.com/wallet'
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Multi-chain wallet',
      isInstalled: !!(window as any).ethereum?.isTrust,
      downloadUrl: 'https://trustwallet.com/'
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      icon: '🌈',
      description: 'Beautiful Ethereum wallet',
      isInstalled: !!(window as any).ethereum?.isRainbow,
      downloadUrl: 'https://rainbow.me/'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: '👻',
      description: 'Solana & Ethereum wallet',
      isInstalled: !!(window as any).phantom,
      downloadUrl: 'https://phantom.app/'
    },
    {
      id: 'brave',
      name: 'Brave Wallet',
      icon: '🦁',
      description: 'Built into Brave browser',
      isInstalled: !!(window as any).ethereum?.isBraveWallet,
      downloadUrl: 'https://brave.com/wallet/'
    }
  ];

  const handleWalletSelect = async (walletId: string) => {
    setSelectedWallet(walletId);
    
    if (walletId === 'metamask' || walletId === 'coinbase' || walletId === 'trust' || walletId === 'rainbow' || walletId === 'brave') {
      // These wallets use the same connection method
      const success = await connectWallet();
      if (success) {
        onClose();
      }
    } else if (walletId === 'walletconnect') {
      // Handle WalletConnect integration
      // This would require additional setup
      console.log('WalletConnect integration needed');
    } else if (walletId === 'phantom') {
      // Handle Phantom wallet
      if ((window as any).phantom) {
        const success = await connectWallet();
        if (success) {
          onClose();
        }
      }
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connect Your Wallet</h2>
            <p className="text-gray-600 mt-1">Choose your preferred crypto wallet to get started</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <XIcon size="lg" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {walletOptions.map((wallet) => (
              <div
                key={wallet.id}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedWallet === wallet.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleWalletSelect(wallet.id)}
              >
                {wallet.isPopular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{wallet.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{wallet.name}</h3>
                      {wallet.isInstalled ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckIcon size="sm" />
                          <span className="text-sm font-medium">Installed</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <span className="text-sm">Not installed</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{wallet.description}</p>
                    
                    {!wallet.isInstalled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(wallet.downloadUrl);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Download</span>
                        <ExternalLinkIcon size="sm" />
                      </button>
                    )}
                  </div>
                </div>

                {selectedWallet === wallet.id && (
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <span>Selected</span>
                          <ArrowRightIcon size="sm" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have a wallet? We recommend starting with MetaMask for the best experience.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>🔒 Secure</span>
              <span>🌐 Multi-chain</span>
              <span>🆓 Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
