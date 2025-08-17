# Nadar Design Website - Deployment Guide

## 🚀 Deployment Options

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   - No environment variables required for basic setup

### Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### GitHub Pages

1. **Setup GitHub Actions**
   Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Configure Repository**
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

## 🔧 Build Optimization

### Performance Tips

1. **Bundle Analysis**

```bash
npm run build
npx vite-bundle-analyzer dist
```

2. **Image Optimization**
   - Use WebP format for images
   - Implement lazy loading
   - Optimize Lottie animations

3. **Code Splitting**
   - Already implemented with React.lazy (if needed)
   - Vite handles automatic code splitting

### SEO Optimization

1. **Meta Tags** (already implemented in index.html)
2. **Sitemap Generation**
3. **Open Graph Tags**

## 📊 Monitoring

### Analytics Setup

1. **Google Analytics**
   - Add tracking code to index.html
   - Set up conversion goals

2. **Performance Monitoring**
   - Use Lighthouse CI
   - Monitor Core Web Vitals

### Error Tracking

1. **Sentry Integration**

```bash
npm install @sentry/react
```

2. **Console Error Monitoring**
   - Implement error boundaries
   - Log critical errors

## 🔒 Security

### Content Security Policy

Add to index.html:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
/>
```

### HTTPS

- All deployment platforms provide HTTPS by default
- Ensure all external resources use HTTPS

## 📱 Mobile Optimization

### PWA Setup (Optional)

1. **Service Worker**
2. **Web App Manifest**
3. **Offline Functionality**

### Performance

- Already optimized for mobile with responsive design
- Touch-friendly interactions implemented
- Optimized for various screen sizes

## 🧪 Testing Before Deployment

### Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check all pages load correctly
- [ ] Verify animations work smoothly
- [ ] Test on different devices/browsers
- [ ] Validate HTML/CSS
- [ ] Check accessibility (WCAG compliance)
- [ ] Test loading performance

### Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Continuous Deployment

### Automated Deployment

Most platforms support automatic deployment on git push:

1. **Vercel** - Auto-deploys on push to main branch
2. **Netlify** - Auto-deploys with branch previews
3. **GitHub Pages** - Uses GitHub Actions workflow

### Branch Strategy

- `main` - Production deployment
- `develop` - Staging/preview deployment
- Feature branches - Preview deployments

This setup ensures your Nadar Design Website is deployed efficiently with optimal performance and user experience.
