'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  WalletIcon, 
  SendIcon, 
  ReceiveIcon, 
  HistoryIcon, 
  CopyIcon, 
  ExternalLinkIcon,
  RefreshIcon,
  CheckIcon,
  ClockIcon,
  XIcon
} from './icons';

interface WalletDashboardProps {
  className?: string;
}

export default function WalletDashboard({ className = '' }: WalletDashboardProps) {
  const { 
    wallet, 
    transactions, 
    getBalance, 
    getTransactions,
    switchNetwork 
  } = useWallet();
  
  const [balance, setBalance] = useState('0');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'settings'>('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (wallet) {
      setBalance(wallet.balance);
    }
  }, [wallet]);

  const refreshBalance = async () => {
    setIsRefreshing(true);
    try {
      const newBalance = await getBalance();
      setBalance(newBalance);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTransactionStatus = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { color: 'text-green-600', icon: CheckIcon, text: 'Confirmed' };
      case 'pending':
        return { color: 'text-yellow-600', icon: ClockIcon, text: 'Pending' };
      case 'failed':
        return { color: 'text-red-600', icon: XIcon, text: 'Failed' };
      default:
        return { color: 'text-gray-600', icon: ClockIcon, text: 'Unknown' };
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!wallet) {
    return (
      <div className={`bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-200 ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <WalletIcon size="lg" className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Wallet Connected</h3>
        <p className="text-gray-600 mb-6">
          Connect your crypto wallet to view your dashboard
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

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Wallet Dashboard</h2>
            <p className="text-blue-100">Manage your crypto assets and transactions</p>
          </div>
          <button
            onClick={refreshBalance}
            disabled={isRefreshing}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshIcon size="md" className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'overview', label: 'Overview', icon: WalletIcon },
            { id: 'transactions', label: 'Transactions', icon: HistoryIcon },
            { id: 'settings', label: 'Settings', icon: SendIcon }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent size="md" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Balance</h3>
                <span className="text-sm text-gray-600">{wallet.network}</span>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {balance} ETH
              </div>
              <div className="text-sm text-gray-600">
                ≈ ${(parseFloat(balance) * 2000).toLocaleString()} USD
              </div>
            </div>

            {/* Wallet Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Wallet Address</h4>
                <div className="flex items-center space-x-3">
                  <code className="text-sm font-mono bg-white px-3 py-2 rounded-lg flex-1">
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

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Network</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{wallet.network}</span>
                  <span className="text-sm text-gray-500">Chain ID: {wallet.chainId}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl font-semibold hover:bg-blue-100 transition-all duration-300 flex items-center justify-center space-x-2">
                <SendIcon size="md" />
                <span>Send</span>
              </button>
              <button className="bg-green-50 text-green-600 px-6 py-4 rounded-2xl font-semibold hover:bg-green-100 transition-all duration-300 flex items-center justify-center space-x-2">
                <ReceiveIcon size="md" />
                <span>Receive</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button
                onClick={() => getTransactions()}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Refresh
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <HistoryIcon size="lg" className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No transactions yet</p>
                <p className="text-sm text-gray-500">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx, index) => {
                  const status = getTransactionStatus(tx.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <SendIcon size="sm" className="text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {tx.value} ETH
                            </div>
                            <div className="text-sm text-gray-600">
                              To: {formatAddress(tx.to)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center space-x-2 ${status.color}`}>
                            <StatusIcon size="sm" />
                            <span className="text-sm font-medium">{status.text}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(tx.timestamp)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <code className="text-xs font-mono text-gray-500">
                          {tx.hash.slice(0, 20)}...{tx.hash.slice(-8)}
                        </code>
                        <button
                          onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                        >
                          <span>View</span>
                          <ExternalLinkIcon size="sm" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Wallet Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Network Settings</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Switch between different blockchain networks
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Ethereum', chainId: 1 },
                    { name: 'Polygon', chainId: 137 },
                    { name: 'BSC', chainId: 56 },
                    { name: 'Arbitrum', chainId: 42161 }
                  ].map((network) => (
                    <button
                      key={network.chainId}
                      onClick={() => switchNetwork(network.chainId)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        wallet.chainId === network.chainId
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {network.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Keep your wallet secure with these best practices
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckIcon size="sm" className="text-green-600" />
                    <span className="text-sm text-gray-700">Never share your private key</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckIcon size="sm" className="text-green-600" />
                    <span className="text-sm text-gray-700">Use hardware wallets for large amounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckIcon size="sm" className="text-green-600" />
                    <span className="text-sm text-gray-700">Verify transaction details before signing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
