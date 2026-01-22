# Vercel Deployment Checklist

## ✅ Pre-Deployment (Completed)

- [x] Removed all debug console.log statements
- [x] Fixed security issue in .env.example (removed exposed secrets)
- [x] Removed unused dependencies
- [x] Updated better-auth to fix security vulnerabilities
- [x] Fixed linting issues (quotes, type imports)
- [x] Verified build passes successfully
- [x] Updated package-lock.json

## 🔐 Security Actions Required (BEFORE DEPLOY)

- [ ] **Rotate OpenAI API Key** (old key was exposed in git)
- [ ] **Rotate Pinecone API Key** (old key was exposed in git)
- [ ] **Rotate Database Password** (credentials were exposed in git)
- [ ] **Generate New Better Auth Secret** (old secret was exposed in git)
  ```bash
  openssl rand -base64 32
  ```

## 🚀 Vercel Configuration

### 1. Environment Variables to Set

In Vercel Dashboard → Settings → Environment Variables:

```bash
# Database (Production)
DATABASE_URL=postgresql://user:NEW_PASSWORD@host:5432/database?sslmode=require

# OpenAI (Get new key from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-YOUR_NEW_KEY_HERE

# Pinecone (Get new key from https://app.pinecone.io/)
PINECONE_API_KEY=pcsk_YOUR_NEW_KEY_HERE

# Better Auth (Generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=YOUR_NEW_32_CHAR_SECRET_HERE

# Better Auth URL (Update with your Vercel domain)
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-app.vercel.app
```

### 2. Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x (recommended)

### 3. Recommended Vercel Settings

- [ ] Enable **Automatic HTTPS**
- [ ] Enable **Security Headers** (Vercel → Settings → Headers)
- [ ] Set up **Preview Deployments** with separate environment variables
- [ ] Configure **Custom Domain** (if applicable)
- [ ] Enable **Analytics** for monitoring

## 📋 Post-Deployment Verification

### Immediately After Deploy:

1. [ ] Test landing page loads correctly
2. [ ] Test sign up flow works
3. [ ] Test sign in flow works
4. [ ] Test tenant onboarding flow
5. [ ] Verify database connections work
6. [ ] Check Vercel logs for errors
7. [ ] Test environment variables are loaded correctly

### Within 24 Hours:

1. [ ] Monitor OpenAI API usage
2. [ ] Monitor Pinecone usage
3. [ ] Check database connection pool
4. [ ] Review Vercel analytics
5. [ ] Test on mobile devices
6. [ ] Test on different browsers

## ⚠️ Known Limitations

### Features Not Ready for Production:

1. **Landlord Dashboard** - Placeholder only
   - Route: `/dashboard/landlord`
   - Status: Minimal implementation
   - Action: Hide from navigation or add "Coming Soon"

2. **Landlord Onboarding** - Placeholder only
   - Route: `/onboarding/landlord`
   - Status: Minimal implementation
   - Action: Hide from navigation or add "Coming Soon"

### Optional Improvements:

- Fix remaining TypeScript linting warnings (non-blocking)
- Add rate limiting for API routes
- Add error monitoring (Sentry, LogRocket, etc.)
- Add performance monitoring
- Optimize bundle size (ai-elements components)

## 🎯 Deployment Steps

1. **Prepare Secrets**:
   ```bash
   # Generate new Better Auth secret
   openssl rand -base64 32
   
   # Get new OpenAI key from platform.openai.com
   # Get new Pinecone key from app.pinecone.io
   # Update database password in Neon dashboard
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Pre-deployment cleanup and security fixes"
   git push origin main
   ```

3. **Deploy to Vercel**:
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy!

4. **Verify Deployment**:
   - Check deployment logs
   - Test all critical flows
   - Monitor for errors

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth Docs**: https://better-auth.com/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

**Ready to Deploy**: ✅ Yes (after rotating secrets)
**Build Status**: ✅ Passing
**Security Status**: ⚠️ Rotate exposed credentials first
**Last Updated**: January 22, 2026
