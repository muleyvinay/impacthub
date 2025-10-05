'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    interests: [] as string[],
    walletConnected: false,
    notifications: true,
    profileComplete: false
  });

  const { user, connectWallet, completeOnboarding, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.isOnboarded) {
      router.push('/');
    }
  }, [user, router]);

  const interests = [
    { id: 'environment', label: 'Environment', icon: '🌱' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'arts', label: 'Arts & Culture', icon: '🎨' }
  ];

  const handleInterestToggle = (interestId: string) => {
    setOnboardingData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleWalletConnect = async () => {
    const success = await connectWallet();
    if (success) {
      setOnboardingData(prev => ({ ...prev, walletConnected: true }));
    }
  };

  const handleComplete = async () => {
    // Update user with onboarding data
    updateUser({
      ...onboardingData,
      isOnboarded: true
    });
    
    completeOnboarding();
    router.push('/');
  };

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Welcome to ImpactHub!',
      description: 'Let&apos;s get you set up to start making a difference.',
      component: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🎯</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">Welcome, {user?.name}!</h2>
            <p className="text-black">
              You&apos;re joining a community of changemakers working together to create positive impact.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Your Role:</strong> {user?.role?.replace('_', ' ').toUpperCase()}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'What causes interest you?',
      description: 'Help us personalize your experience by selecting your areas of interest.',
      component: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => handleInterestToggle(interest.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  onboardingData.interests.includes(interest.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{interest.icon}</div>
                <div className="font-medium text-sm">{interest.label}</div>
              </button>
            ))}
          </div>
          {onboardingData.interests.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">
                Great! You&apos;ve selected {onboardingData.interests.length} interest{onboardingData.interests.length > 1 ? 's' : ''}.
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 3,
      title: 'Connect Your Wallet',
      description: 'Link your Web3 wallet to enable secure donations and earn NFT badges.',
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Web3 Integration</h3>
            <p className="text-black text-sm">
              Connect your wallet to access decentralized features and transparent transactions.
            </p>
          </div>

          {!onboardingData.walletConnected ? (
            <button
              onClick={handleWalletConnect}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✅</span>
                <div>
                  <p className="font-medium text-green-800">Wallet Connected!</p>
                  <p className="text-green-600 text-sm">Your wallet is now linked to your account.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-black mb-2">Benefits of connecting:</h4>
            <ul className="text-sm text-black space-y-1">
              <li>• Secure, transparent donations</li>
              <li>• Earn NFT badges for contributions</li>
              <li>• Participate in governance voting</li>
              <li>• Track your impact on-chain</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Notification Preferences',
      description: 'Choose how you&apos;d like to stay updated on projects and community activities.',
      component: (
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="font-medium text-black">Project Updates</div>
                <div className="text-sm text-black">Get notified when projects you support have updates</div>
              </div>
              <input
                type="checkbox"
                checked={onboardingData.notifications}
                onChange={(e) => setOnboardingData(prev => ({ ...prev, notifications: e.target.checked }))}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="font-medium text-black">New Projects</div>
                <div className="text-sm text-black">Discover new initiatives in your areas of interest</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="font-medium text-black">Community Updates</div>
                <div className="text-sm text-black">Stay informed about community proposals and votes</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'You&apos;re All Set!',
      description: 'Welcome to the ImpactHub community. Let&apos;s start making a difference together.',
      component: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🎉</span>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">Welcome to ImpactHub!</h2>
            <p className="text-black">
              You&apos;re now ready to discover, support, and create meaningful change in your community.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="font-semibold text-black mb-3">What&apos;s Next?</h3>
            <div className="space-y-2 text-sm text-black">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Explore projects that match your interests
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Make your first donation
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Join community discussions
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Earn your first NFT badge
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = currentStep === 0 || 
    (currentStep === 1 && onboardingData.interests.length > 0) ||
    (currentStep === 2 && onboardingData.walletConnected) ||
    currentStep >= 3;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-black">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-black">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">{currentStepData.title}</h1>
            <p className="text-black">{currentStepData.description}</p>
          </div>

          <div className="mb-8">
            {currentStepData.component}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 text-black hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastStep ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
