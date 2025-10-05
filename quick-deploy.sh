#!/bin/bash

echo "🌐 ImpactHub Quick Public Deployment"
echo "==================================="
echo ""

# Check if servers are running
echo "🔍 Checking current server status..."

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend: Running on http://localhost:3000"
    FRONTEND_RUNNING=true
else
    echo "❌ Frontend: Not running"
    FRONTEND_RUNNING=false
fi

# Check if API is running
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Backend: Running on http://localhost:3001"
    API_RUNNING=true
else
    echo "❌ Backend: Not running"
    API_RUNNING=false
fi

echo ""

# If servers aren't running, start them
if [ "$FRONTEND_RUNNING" = false ] || [ "$API_RUNNING" = false ]; then
    echo "🚀 Starting servers..."
    
    # Start API if not running
    if [ "$API_RUNNING" = false ]; then
        echo "Starting API server..."
        cd /Users/admin/podcast\ plugin/production/api
        npm run start:dev > /dev/null 2>&1 &
        API_PID=$!
        cd - > /dev/null
        sleep 5
    fi
    
    # Start frontend if not running
    if [ "$FRONTEND_RUNNING" = false ]; then
        echo "Starting frontend server..."
        cd /Users/admin/podcast\ plugin/production/web
        npm run dev > /dev/null 2>&1 &
        FRONTEND_PID=$!
        cd - > /dev/null
        sleep 8
    fi
    
    # Verify servers are running
    if curl -s http://localhost:3000 > /dev/null 2>&1 && curl -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Both servers are now running!"
    else
        echo "❌ Failed to start servers. Please check the logs."
        exit 1
    fi
fi

echo ""
echo "🎉 ImpactHub is now accessible!"
echo ""
echo "📱 Local Access:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔧 API: http://localhost:3001"
echo ""
echo "📱 Network Access (for others on your network):"
echo "   🌐 Frontend: http://192.168.1.18:3000"
echo "   🔧 API: http://192.168.1.18:3001"
echo ""

# Try to get the public IP
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "Unable to determine")
if [ "$PUBLIC_IP" != "Unable to determine" ]; then
    echo "🌍 Public Access (if port forwarding is configured):"
    echo "   🌐 Frontend: http://$PUBLIC_IP:3000"
    echo "   🔧 API: http://$PUBLIC_IP:3001"
    echo ""
fi

echo "📋 To make it publicly accessible:"
echo ""
echo "1. Quick Option - ngrok (requires free account):"
echo "   - Sign up at https://dashboard.ngrok.com"
echo "   - Get your authtoken"
echo "   - Run: ngrok authtoken YOUR_TOKEN"
echo "   - Run: ngrok http 3000"
echo "   - Share the public URL"
echo ""
echo "2. Professional Option - Deploy to cloud:"
echo "   - Frontend: Deploy to Vercel/Netlify"
echo "   - Backend: Deploy to Railway/Heroku"
echo "   - See HOSTING_GUIDE.md for details"
echo ""
echo "3. Local Network Option:"
echo "   - Share http://192.168.1.18:3000 with others on your network"
echo "   - Configure router port forwarding for public access"
echo ""

echo "🛑 To stop servers:"
echo "   pkill -f 'next|nest'"
echo ""

echo "📖 For detailed hosting instructions, see:"
echo "   cat HOSTING_GUIDE.md"