# Deployment Guide - GitHub Pages

## 🚀 Quick Deploy

Your app is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## 📋 Setup Steps

### 1. Push to GitHub

```bash
# Make sure you have a GitHub repository
git remote -v

# If you don't have a remote, create a repo on GitHub and add it:
# git remote add origin https://github.com/YOUR_USERNAME/connect-wallet.git

# Push your code
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Click **Save**

### 3. Wait for Deployment

- The GitHub Action will automatically run
- Check the **Actions** tab to see the deployment progress
- Once complete, your site will be live at:
  ```
  https://YOUR_USERNAME.github.io/connect-wallet/
  ```

## 🔧 Configuration

### Base URL
The app is configured with `base: '/connect-wallet/'` in `vite.config.ts`.

**If your repository name is different**, update it:
```typescript
// vite.config.ts
export default defineConfig({
  base: '/YOUR-REPO-NAME/',
})
```

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `/public` folder:
   ```
   yourdomain.com
   ```

2. Update `vite.config.ts`:
   ```typescript
   base: '/',
   ```

3. Configure DNS:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

4. In GitHub Settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## 🎯 Deployment Workflow

The `.github/workflows/deploy.yml` file handles:
- ✅ Installing dependencies with pnpm
- ✅ Building the production bundle
- ✅ Deploying to GitHub Pages
- ✅ Automatic deployment on every push to `main`

## 🔍 Verify Deployment

After deployment:
1. Visit: `https://YOUR_USERNAME.github.io/connect-wallet/`
2. Connect your MetaMask wallet
3. Test network switching
4. Verify all features work

## 🐛 Troubleshooting

### 404 Error
- Check that GitHub Pages is enabled
- Verify the `base` URL matches your repo name
- Wait a few minutes for DNS propagation

### Build Fails
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify the build works locally: `pnpm run build`

### Assets Not Loading
- Verify `base` is set correctly in `vite.config.ts`
- Check browser console for 404 errors
- Ensure all imports use relative paths

## 📦 Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
pnpm run build

# Install gh-pages
pnpm add -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
pnpm run deploy
```

## 🔄 Update Deployment

To update your deployed app:

```bash
# Make your changes
git add .
git commit -m "your changes"
git push origin main

# GitHub Actions will automatically redeploy
```

## ✅ Success!

Once deployed, share your link:
```
https://YOUR_USERNAME.github.io/connect-wallet/
```

Your wallet connection demo is now live! 🎉
