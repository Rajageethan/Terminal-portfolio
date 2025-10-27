# Deployment Guide for Rajageethan's Terminal Portfolio

## 🚀 Quick Deployment Options

### Option 1: Netlify (Easiest)
1. Go to https://netlify.com
2. Sign up with your email or GitHub
3. Click "Deploy site" 
4. Drag the `dist` folder from your project to the deployment area
5. Your site will be live instantly!
6. You can later connect your GitHub repo for automatic deployments

### Option 2: Vercel
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Click "New Project"
4. Import your GitHub repository OR upload project folder
5. Vercel will auto-detect Vite configuration
6. Deploy!

### Option 3: GitHub Pages (If you have Git installed)
```bash
# Install git first, then:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/terminal-portfolio.git
git push -u origin main

# Then enable GitHub Pages in repository settings
```

### Option 4: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select dist as public directory
firebase deploy
```

## 📋 Pre-deployment Checklist
- ✅ Build completed successfully (`npm run build`)
- ✅ All assets in `dist` folder
- ✅ Resume PDF in `dist` folder
- ✅ No console errors

## 🔧 Build Commands
```bash
npm run build    # Creates production build in dist/
npm run preview  # Preview build locally
```

## 📱 Mobile Testing
Test your deployed site on:
- Phone browsers
- Tablet devices  
- Different screen sizes

## 🎯 Recommended: Netlify
- Easiest deployment
- Automatic HTTPS
- Custom domains available
- Excellent performance
- Built-in form handling (if needed later)

Your terminal portfolio is ready to impress! 🚀