# Security Notes for Deployment

## ⚠️ CRITICAL: Exposed Secrets

The `.env.example` file previously contained **real API keys and secrets** that were committed to version control. These have been removed, but the exposed credentials should be rotated immediately:

### Credentials to Rotate:

1. **OpenAI API Key**: `sk-proj-rl40WIsgiFvle4ADPxQz...` (exposed)
2. **Pinecone API Key**: `pcsk_3dfWjK_3qqae5b76dFFsm...` (exposed)
3. **Database URL**: Neon database credentials (exposed)
4. **Better Auth Secret**: `NBNoBYt79HP6JrRhhcBvdSq4b0kcLSJw` (exposed)

### Action Required:

1. **OpenAI**: Generate new API key at https://platform.openai.com/api-keys
2. **Pinecone**: Generate new API key at https://app.pinecone.io/
3. **Database**: Rotate database password in Neon dashboard
4. **Better Auth**: Generate new secret: `openssl rand -base64 32`

## 📦 Dependency Vulnerabilities

### Production Dependencies:
- **better-auth**: ✅ **FIXED** - Updated from 1.3.32 to 1.4.17
  - Resolved high severity DoS and path normalization issues
  - No action required

### Development Dependencies:
- **hono**: JWT algorithm confusion (affects Prisma dev tools)
- **lodash**: Prototype pollution (affects Prisma dev tools)
  - **Impact**: Low - only affects development environment
  - **Action**: Update when Prisma releases fixed version

## 🔒 Security Best Practices for Vercel Deployment

1. **Environment Variables**:
   - Set all secrets in Vercel dashboard (never in code)
   - Use different secrets for production vs preview deployments
   - Enable "Encrypted" option for sensitive values

2. **Better Auth Configuration**:
   - Update `NEXT_PUBLIC_BETTER_AUTH_URL` to your production domain
   - Ensure `BETTER_AUTH_SECRET` is at least 32 characters
   - Consider enabling rate limiting for auth endpoints

3. **Database Security**:
   - Use connection pooling (already configured with Neon)
   - Enable SSL mode (already configured)
   - Restrict database access to Vercel IPs if possible

4. **API Keys**:
   - Set spending limits on OpenAI API
   - Monitor Pinecone usage
   - Consider implementing API key rotation schedule

## 🚨 Immediate Actions Before Deploy

- [ ] Rotate all exposed API keys
- [ ] Generate new Better Auth secret
- [ ] Update database password
- [ ] Set environment variables in Vercel
- [ ] Enable Vercel's security headers
- [ ] Consider adding rate limiting middleware

## 📝 Post-Deployment Monitoring

- Monitor OpenAI API usage for anomalies
- Set up alerts for unusual database activity
- Review Vercel logs for suspicious requests
- Keep dependencies updated (especially better-auth)

---

**Last Updated**: January 22, 2026
**Status**: ⚠️ Action Required - Rotate Exposed Credentials
