#!/bin/bash

echo "🌐 ImpactHub Public Hosting Setup"
echo "================================="
echo ""

# Check if ngrok is authenticated
if ! ngrok config check > /dev/null 2>&1; then
    echo "❌ ngrok is not authenticated. Please run:"
    echo "   ngrok authtoken YOUR_AUTH_TOKEN"
    echo "   Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    echo ""
    echo "Or use the free version without authentication (limited):"
    echo "   ngrok http 3000 --log=stdout"
    exit 1
fi

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "next\|nest" 2>/dev/null || true
sleep 2

# Start API server
echo "🚀 Starting API server..."
cd /Users/admin/podcast\ plugin/production/api
npm run start:dev > /dev/null 2>&1 &
API_PID=$!
cd - > /dev/null

# Wait for API to start
echo "⏳ Waiting for API to start..."
sleep 5

# Check if API is running
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ API server is running on port 3001"
else
    echo "❌ API server failed to start"
    kill $API_PID 2>/dev/null
    exit 1
fi

# Start frontend server
echo "🚀 Starting frontend server..."
cd /Users/admin/podcast\ plugin/production/web
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
cd - > /dev/null

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 8

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend server is running on port 3000"
else
    echo "❌ Frontend server failed to start"
    kill $API_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

# Start ngrok tunnel
echo "🌐 Creating public tunnel..."
ngrok http 3000 > /dev/null 2>&1 &
NGROK_PID=$!

# Wait for ngrok to start
sleep 5

# Get the public URL
echo "🔍 Getting public URL..."
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data['tunnels']:
        print(data['tunnels'][0]['public_url'])
    else:
        print('')
except:
    print('')
" 2>/dev/null)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Failed to get ngrok URL. Trying alternative method..."
    NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | head -1 | cut -d'"' -f4)
fi

if [ -z "$NGROK_URL" ]; then
    echo "❌ Could not get ngrok URL. Please check ngrok status."
    kill $API_PID $FRONTEND_PID $NGROK_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 ImpactHub is now publicly accessible!"
echo "🌐 Public URL: $NGROK_URL"
echo "📱 Share this URL with anyone to test the application"
echo ""
echo "📊 Local URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API: http://localhost:3001"
echo "   Network: http://192.168.1.18:3000"
echo ""
echo "🛑 To stop the servers, press Ctrl+C"

# Keep the script running
trap "echo 'Shutting down servers...'; kill $API_PID $FRONTEND_PID $NGROK_PID 2>/dev/null; exit" INT TERM
wait $API_PID $FRONTEND_PID $NGROK_PID
