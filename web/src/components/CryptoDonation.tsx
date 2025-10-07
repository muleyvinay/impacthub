'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  WalletIcon, 
  SendIcon, 
  CheckIcon, 
  XIcon, 
  ExternalLinkIcon,
  CopyIcon,
  AlertIcon
} from './icons';

interface CryptoDonationProps {
  projectId: string;
  projectTitle: string;
  recipientAddress: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function CryptoDonation({ 
  projectId, 
  projectTitle, 
  recipientAddress,
  onSuccess,
  onError,
  className = ''
}: CryptoDonationProps) {
  const { wallet, sendTransaction, isConnecting } = useWallet();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const presetAmounts = ['0.01', '0.1', '0.5', '1', '5'];

  const handleDonate = async () => {
    if (!wallet) {
      setError('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > parseFloat(wallet.balance)) {
      setError('Insufficient balance');
      return;
    }

    try {
      setIsDonating(true);
      setError(null);

      const hash = await sendTransaction(recipientAddress, amount, message);
      
      if (hash) {
        setTxHash(hash);
        setShowSuccess(true);
        onSuccess?.(hash);
        
        // Reset form
        setAmount('');
        setMessage('');
      } else {
        setError('Transaction failed. Please try again.');
        onError?.('Transaction failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsDonating(false);
    }
  };

  const copyTxHash = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
    }
  };

  const viewOnEtherscan = () => {
    if (txHash) {
      window.open(`https://etherscan.io/tx/${txHash}`, '_blank');
    }
  };

  if (!wallet) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <WalletIcon size="lg" className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600 mb-6">
          Connect your crypto wallet to make a donation to this project
        </p>
        <button
          onClick={() => window.location.href = '/auth'}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (showSuccess && txHash) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckIcon size="lg" className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Donation Successful!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for supporting <strong>{projectTitle}</strong>
        </p>
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Transaction Hash</div>
          <div className="flex items-center space-x-2">
            <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg flex-1">
              {txHash.slice(0, 20)}...{txHash.slice(-8)}
            </code>
            <button
              onClick={copyTxHash}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <CopyIcon size="sm" />
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={viewOnEtherscan}
            className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-200 flex items-center justify-center space-x-2"
          >
            <ExternalLinkIcon size="sm" />
            <span>View on Etherscan</span>
          </button>
          <button
            onClick={() => {
              setShowSuccess(false);
              setTxHash(null);
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-200 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Make a Crypto Donation</h3>
        <p className="text-gray-600">
          Support <strong>{projectTitle}</strong> with cryptocurrency
        </p>
      </div>

      {/* Wallet Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Connected Wallet</div>
            <div className="font-semibold text-gray-900">
              {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Balance</div>
            <div className="font-semibold text-gray-900">{wallet.balance} ETH</div>
          </div>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Amount (ETH)</label>
        
        {/* Preset Amounts */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                amount === preset
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter custom amount"
          step="0.001"
          min="0"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Message (Optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message for the project team..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
          <AlertIcon size="md" className="text-red-500" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      )}

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        disabled={isDonating || !amount || parseFloat(amount) <= 0}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
      >
        {isDonating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing Donation...</span>
          </>
        ) : (
          <>
            <SendIcon size="md" />
            <span>Donate {amount} ETH</span>
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          🔒 Your transaction is secured by blockchain technology
        </p>
      </div>
    </div>
  );
}
