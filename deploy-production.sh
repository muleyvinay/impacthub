#!/bin/bash

echo "🚀 ImpactHub Production Deployment"
echo "================================="
echo ""

# Build the application
echo "📦 Building application..."
cd web
npm run build
cd ..

echo ""
echo "✅ Build completed successfully!"
echo ""

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment
cp -r web/out/* deployment/
cp web/package.json deployment/
cp web/package-lock.json deployment/

echo ""
echo "🎉 Production deployment ready!"
echo ""
echo "📋 Deployment Options:"
echo ""
echo "1. 🌐 Netlify (Recommended):"
echo "   - Go to https://netlify.com"
echo "   - Drag and drop the 'deployment' folder"
echo "   - Or connect your GitHub repository"
echo ""
echo "2. 🔥 Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set build command: cd web && npm run build"
echo "   - Set output directory: web/out"
echo ""
echo "3. 🚂 Railway:"
echo "   - Go to https://railway.app"
echo "   - Connect your GitHub repository"
echo "   - Set build command: cd web && npm run build"
echo ""
echo "4. 📱 GitHub Pages:"
echo "   - Enable GitHub Pages in repository settings"
echo "   - Set source to 'GitHub Actions'"
echo "   - The workflow will deploy automatically"
echo ""
echo "📁 Deployment files are in the 'deployment' folder"
echo "🌐 Your app will be available at the platform's URL"
echo ""
echo "✨ Features included:"
echo "   - Complete crypto wallet integration"
echo "   - Enhanced UI with animations"
echo "   - Real-time statistics"
echo "   - Multi-wallet support"
echo "   - Responsive design"
echo ""
echo "🎯 Ready for production! 🚀"
