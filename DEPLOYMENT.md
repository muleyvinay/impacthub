# 🚀 Deployment Guide - ImpactHub

This guide will help you deploy ImpactHub to make it available for everyone to test.

## 🎯 Quick Start Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project root:**
   ```bash
   cd production
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set framework preset to "Other"
   - Configure build settings

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   cd production/web
   npm run build
   netlify deploy --prod --dir=out
   ```

### Option 3: Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

## 🔧 Manual Deployment Steps

### 1. Prepare for Production

```bash
# Install dependencies
cd production
npm install

# Build the application
cd web
npm run build

cd ../api
npm run build
```

### 2. Environment Configuration

Create production environment variables:

```bash
# Copy example environment file
cp env.example .env.production

# Edit with your production values
nano .env.production
```

### 3. Database Setup

```bash
# Generate Prisma client
cd api
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed the database
npx prisma db seed
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Purchase a domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

3. **Add domain to Vercel:**
   ```bash
   vercel domains add yourdomain.com
   ```

## 📊 Monitoring & Analytics

### Google Analytics Setup

1. Create Google Analytics account
2. Add tracking ID to environment variables:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Error Tracking with Sentry

1. Create Sentry account
2. Add DSN to environment variables:
   ```env
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

## 🔒 Security Configuration

### SSL/HTTPS
- Automatically handled by Vercel/Netlify
- Custom domains get free SSL certificates

### Environment Variables Security
- Never commit `.env` files
- Use platform-specific secret management
- Rotate API keys regularly

## 📱 Mobile Testing

### Test on Real Devices
1. **Share the live URL** with testers
2. **Use QR codes** for easy mobile access
3. **Test on different devices:**
   - iOS Safari
   - Android Chrome
   - Desktop browsers

### Performance Testing
```bash
# Install Lighthouse CLI
npm i -g lighthouse

# Test performance
lighthouse https://your-domain.com --view
```

## 🚀 Advanced Deployment Options

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Deploy with Docker:
```bash
docker build -t impacthub .
docker run -p 3000:3000 impacthub
```

### Kubernetes Deployment

Create `k8s-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: impacthub
spec:
  replicas: 3
  selector:
    matchLabels:
      app: impacthub
  template:
    metadata:
      labels:
        app: impacthub
    spec:
      containers:
      - name: impacthub
        image: impacthub:latest
        ports:
        - containerPort: 3000
```

## 📈 Scaling Considerations

### Database Scaling
- Use managed database services (PlanetScale, Supabase)
- Implement connection pooling
- Add read replicas for high traffic

### CDN Configuration
- Enable Vercel Edge Network
- Configure custom CDN if needed
- Optimize image delivery

### Performance Optimization
- Enable compression
- Implement caching strategies
- Use service workers for offline functionality

## 🔄 CI/CD Pipeline

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection:**
   - Verify DATABASE_URL is correct
   - Check network connectivity
   - Ensure database is accessible

3. **Environment Variables:**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure proper formatting

### Getting Help

- Check deployment logs in platform dashboard
- Review application logs
- Test locally first
- Use platform-specific debugging tools

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review error logs
3. Test locally first
4. Contact platform support if needed

---

**Ready to deploy?** Choose your preferred option and follow the steps above! 🚀
