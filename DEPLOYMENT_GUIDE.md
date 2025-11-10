# 🚀 Deployment Guide: GitHub + Vercel

This guide will walk you through deploying your Diet Tracker to GitHub and Vercel for free hosting.

## **Step 1: Create GitHub Repository**

### **Option A: Using GitHub Web Interface**
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right and select **"New repository"**
3. Repository name: `diet-tracker` (or any name you prefer)
4. Description: `Personal diet tracker for weight loss journey`
5. Keep it **Public** (for free Vercel deployment)
6. **DON'T** initialize with README (we already have one)
7. Click **"Create repository"**

### **Option B: Using Command Line**
```bash
# Navigate to your project folder
cd /path/to/your/diet-tracker-folder

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Diet Tracker v1.0"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/diet-tracker.git

# Push to GitHub
git push -u origin main
```

## **Step 2: Upload Your Files**

### **Method 1: GitHub Web Upload**
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop all your files:
   - `index.html`
   - `progress.html`
   - `meals.html`
   - `cheat-day.html`
   - `main.js`
   - `package.json`
   - `README.md`
   - `.gitignore`
   - `resources/` folder (with images)
3. Click **"Commit changes"**

### **Method 2: Command Line Upload**
```bash
# Make sure you're in your project folder
cd diet-tracker

# Add all files to git
git add .

# Commit with message
git commit -m "Add all diet tracker files"

# Push to GitHub
git push origin main
```

## **Step 3: Deploy to Vercel (Recommended)**

### **Method 1: Vercel Dashboard (Easiest)**
1. Go to [Vercel.com](https://vercel.com) and sign up/in
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Find your `diet-tracker` repository and click **"Import"**
5. Vercel will auto-detect it's a static site
6. Click **"Deploy"**
7. Your site will be live in seconds!

### **Method 2: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - What's your project's name: diet-tracker
# - In which directory is your code: ./
# - Override settings: N
```

## **Step 4: Alternative - GitHub Pages (Free)**

### **Enable GitHub Pages:**
1. Go to your GitHub repository
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** section
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**
7. Your site will be live at: `https://YOUR_USERNAME.github.io/diet-tracker`

## **Step 5: Alternative - Netlify**

### **Deploy to Netlify:**
1. Go to [Netlify.com](https://netlify.com) and sign up/in
2. Drag your project folder to the deploy area
3. Your site will be live instantly!
4. Custom domain available for free

## **Step 6: Verify Your Deployment**

### **Check Your Live Site:**
1. Open your deployed URL
2. Test all functionality:
   - Log weight
   - Select meals
   - View progress charts
   - Plan cheat days
   - Navigate between pages

### **Expected URLs:**
- **Main Dashboard**: `yourdomain.com`
- **Progress Tracking**: `yourdomain.com/progress.html`
- **Meal Library**: `yourdomain.com/meals.html`
- **Cheat Day**: `yourdomain.com/cheat-day.html`

## **Step 7: Custom Domain (Optional)**

### **Add Custom Domain:**
1. **Vercel**: Go to project settings → Domains → Add domain
2. **GitHub Pages**: Go to repository settings → Pages → Custom domain
3. **Netlify**: Go to site settings → Domain management → Add custom domain

## **Troubleshooting**

### **Common Issues:**

1. **Images not loading?**
   - Check `resources/` folder is uploaded
   - Verify image paths in HTML files

2. **JavaScript not working?**
   - Check browser console for errors
   - Ensure `main.js` is uploaded
   - Verify file paths in HTML

3. **Styles not loading?**
   - Check Tailwind CSS CDN link
   - Verify all CSS classes are correct

4. **Navigation not working?**
   - Check HTML file names match links
   - Verify all files are uploaded

### **Debug Steps:**
1. Check browser developer console (F12)
2. Verify all files in GitHub repository
3. Test locally before deploying
4. Check network tab for loading errors

## **Success! 🎉**

Once deployed, you'll have:
- **Live website** accessible from anywhere
- **Free hosting** with automatic SSL
- **Fast loading** with global CDN
- **Mobile responsive** design
- **Offline functionality** with localStorage

## **Next Steps:**
1. **Share your URL** with family and friends
2. **Bookmark** the site on your phone
3. **Start tracking** your diet journey
4. **Customize** meals and preferences

## **Support:**
- **GitHub Issues**: Create issue in your repository
- **Vercel Support**: Check Vercel documentation
- **GitHub Pages**: Check GitHub Pages documentation

---

**Your diet tracker will be live and ready to use!** 🌟

**Estimated Time**: 15-30 minutes
**Cost**: Completely Free
**Maintenance**: Automatic updates on code push