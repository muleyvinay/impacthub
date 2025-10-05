# 🚀 ImpactHub Deployment - Quick Reference

## ⚡ **5-Minute Deployment (Vercel + Railway)**

### **Step 1: GitHub Repository**
```bash
# 1. Go to https://github.com/new
# 2. Repository name: impacthub
# 3. Make it PUBLIC
# 4. Don't initialize with README
# 5. Click 'Create repository'

# 6. Run these commands (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/impacthub.git
git branch -M main
git push -u origin main
```

### **Step 2: Deploy Frontend (Vercel)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `impacthub` repository
5. Framework: Next.js (auto-detected)
6. **Root Directory: `web`**
7. Deploy!

### **Step 3: Deploy Backend (Railway)**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub"
4. Select your `impacthub` repository
5. **Choose `api` folder**
6. Deploy!

### **Step 4: Connect Services**
1. Get your Railway backend URL (e.g., `https://impacthub-api.railway.app`)
2. In Vercel dashboard → Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL = https://your-railway-url.railway.app`
4. Redeploy your frontend

## 🎉 **Result**
- **Frontend**: `https://impacthub.vercel.app`
- **Backend**: `https://impacthub-api.railway.app`
- **Custom Domain**: Optional (free)
- **SSL**: Automatic
- **CDN**: Global

## 🆓 **Free Tier Limits**
- **Vercel**: Unlimited projects, 100GB bandwidth/month
- **Railway**: $5 credit/month (plenty for small apps)
- **Database**: PostgreSQL included

## 🔧 **Alternative: All-in-One (DigitalOcean)**
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Connect GitHub repository
3. Deploy both frontend and backend together
4. $5 credit monthly (FREE for small apps)

## 📱 **Current Local Access**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Network: `http://192.168.1.18:3000`

---

**🚀 Your ImpactHub will be live on the internet in minutes!**
