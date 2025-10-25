#!/bin/bash

# 🚀 PactaImpact Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 PactaImpact Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the production directory"
    exit 1
fi

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Deploy
    vercel --prod
    
    print_success "Deployed to Vercel! Check your dashboard for the URL."
}

# Function to deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    # Build the web app
    cd web
    npm run build
    
    # Deploy
    netlify deploy --prod --dir=out
    
    print_success "Deployed to Netlify! Check your dashboard for the URL."
}

# Function to deploy to Railway
deploy_railway() {
    print_status "Deploying to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    # Login and deploy
    railway login
    railway init
    railway up
    
    print_success "Deployed to Railway! Check your dashboard for the URL."
}

# Function to create a simple local server
create_local_server() {
    print_status "Creating local server for testing..."
    
    # Install serve globally if not installed
    if ! command -v serve &> /dev/null; then
        npm install -g serve
    fi
    
    # Build the application
    cd web
    npm run build
    
    # Start local server
    serve -s out -l 3000
    
    print_success "Local server running at http://localhost:3000"
    print_warning "This is only accessible on your local network"
}

# Function to create a tunnel for local testing
create_tunnel() {
    print_status "Creating tunnel for public access..."
    
    # Check if ngrok is installed
    if ! command -v ngrok &> /dev/null; then
        print_warning "ngrok not found. Please install from https://ngrok.com/"
        exit 1
    fi
    
    # Start the application
    print_status "Starting application..."
    cd web
    npm run dev &
    WEB_PID=$!
    
    # Wait a moment for the app to start
    sleep 5
    
    # Create tunnel
    ngrok http 3000
    
    print_success "Tunnel created! Share the ngrok URL with others."
    print_warning "Press Ctrl+C to stop the tunnel and application"
}

# Main menu
show_menu() {
    echo ""
    echo "Choose deployment option:"
    echo "1) Deploy to Vercel (Recommended)"
    echo "2) Deploy to Netlify"
    echo "3) Deploy to Railway"
    echo "4) Create local server"
    echo "5) Create tunnel with ngrok"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
}

# Main execution
main() {
    while true; do
        show_menu
        case $choice in
            1)
                deploy_vercel
                break
                ;;
            2)
                deploy_netlify
                break
                ;;
            3)
                deploy_railway
                break
                ;;
            4)
                create_local_server
                break
                ;;
            5)
                create_tunnel
                break
                ;;
            6)
                print_status "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please try again."
                ;;
        esac
    done
}

# Run main function
main
