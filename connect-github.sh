#!/bin/bash

echo "🔗 Connect PactaImpact to GitHub"
echo "=============================="
echo ""

echo "📋 **Prerequisites:**"
echo "✅ GitHub repository created (impacthub)"
echo "✅ Repository is PUBLIC"
echo "✅ You have the repository URL"
echo ""

echo "🔧 **To connect and push your code:**"
echo ""
echo "1. Replace YOUR_USERNAME with your actual GitHub username"
echo "2. Run these commands:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/impacthub.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

echo "📱 **Example (replace 'yourusername' with your actual username):**"
echo "git remote add origin https://github.com/yourusername/impacthub.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

echo "🎯 **After pushing, you can deploy to:**"
echo "1. Vercel (Frontend): https://vercel.com"
echo "2. Railway (Backend): https://railway.app"
echo ""

echo "📖 **For complete deployment guide:**"
echo "cat DEPLOYMENT_QUICK_REFERENCE.md"
echo ""

echo "🚀 **Ready to connect? Run the commands above!**"
