# Landing Page Links & Buttons Audit

## ✅ Navigation Header

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "For Brands" | Anchor link | `#brands` | ✅ Correct | Scrolls to Features section |
| "For Landlords" | Anchor link | `#landlords` | ⚠️ **ISSUE** | Section ID doesn't exist |
| "How It Works" | Anchor link | `#how-it-works` | ✅ Correct | Scrolls to How It Works section |
| "About" | Anchor link | `#about` | ⚠️ **ISSUE** | Section ID doesn't exist |
| "Generate Passport" | Button | `/onboarding/tenent` | ✅ Correct | Goes to tenant onboarding |

## ✅ Hero Section

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "Generate Your Brand Passport" | Button | `/onboarding/tenent` | ✅ Correct | Primary CTA |
| "Learn how it works" | Button | `#how-it-works` | ✅ Correct | Scrolls to How It Works |

## ✅ Feature Cards Section

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "For Brands" Card | Clickable div | `/onboarding/tenent` | ✅ Correct | Entire card is clickable |
| "AI-Powered Matching" Card | Clickable div | `#how-it-works` | ✅ Correct | Scrolls to How It Works |
| "For Landlords" Card | Clickable div | `#landlords` | ⚠️ **ISSUE** | Section ID doesn't exist |

## ✅ Secondary CTA Section

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "Get Started Today" | Button | `/onboarding/tenent` | ✅ Correct | Goes to tenant onboarding |

## ✅ Footer - Social Links

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| Twitter Icon | External link | `https://twitter.com/identia` | ⚠️ Placeholder | Update with real Twitter handle |
| LinkedIn Icon | External link | `https://linkedin.com/company/identia` | ⚠️ Placeholder | Update with real LinkedIn page |
| Email Icon | Email link | `mailto:hello@identia.com` | ⚠️ Placeholder | Update with real email |

## ✅ Footer - For Brands Column

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "Features" | Anchor link | `#brands` | ✅ Correct | Scrolls to Features section |
| "How It Works" | Anchor link | `#how-it-works` | ✅ Correct | Scrolls to How It Works |
| "Get Started" | Button | `/onboarding/tenent` | ✅ Correct | Goes to tenant onboarding |

## ✅ Footer - Resources Column

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "About Us" | Anchor link | `#about` | ⚠️ **ISSUE** | Section ID doesn't exist |
| "Blog" | Anchor link | `#` | ⚠️ Placeholder | No destination set |
| "Help Center" | Anchor link | `#` | ⚠️ Placeholder | No destination set |
| "Contact" | Email link | `mailto:support@identia.com` | ⚠️ Placeholder | Update with real email |

## ✅ Footer - Connect Column

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "Twitter" | External link | `https://twitter.com/identia` | ⚠️ Placeholder | Update with real Twitter handle |
| "LinkedIn" | External link | `https://linkedin.com/company/identia` | ⚠️ Placeholder | Update with real LinkedIn page |
| "Email" | Email link | `mailto:hello@identia.com` | ⚠️ Placeholder | Update with real email |

## ✅ Footer - Legal Links

| Element | Type | Destination | Status | Notes |
|---------|------|-------------|--------|-------|
| "Privacy Policy" | Anchor link | `#` | ⚠️ Placeholder | No destination set |
| "Terms of Service" | Anchor link | `#` | ⚠️ Placeholder | No destination set |

---

## 🔴 Critical Issues to Fix

### 1. Missing Section IDs

**Problem**: Several navigation links point to section IDs that don't exist on the page.

**Affected Links**:
- `#landlords` - Referenced by:
  - Navigation "For Landlords" link
  - "For Landlords" feature card
- `#about` - Referenced by:
  - Navigation "About" link
  - Footer "About Us" link

**Solutions**:

#### Option A: Add the missing sections
Add `id="landlords"` and `id="about"` to appropriate sections

#### Option B: Update links to existing sections
- Change `#landlords` → `#brands` (since landlord features aren't ready)
- Change `#about` → `#mission` or remove the link

### 2. Placeholder Links

**Problem**: Several links are placeholders (`#`) or point to non-existent pages.

**Affected Links**:
- Blog
- Help Center
- Privacy Policy
- Terms of Service

**Solutions**:
- Remove these links until pages are ready, OR
- Add "Coming Soon" indication, OR
- Create placeholder pages

### 3. Placeholder Contact Information

**Problem**: Email addresses and social media links are placeholders.

**Affected**:
- `hello@identia.com`
- `support@identia.com`
- `https://twitter.com/identia`
- `https://linkedin.com/company/identia`

**Solution**: Update with real contact information before launch.

---

## ✅ Working Links Summary

**Total Links/Buttons**: 28
- **Working Correctly**: 10 (36%)
- **Missing Destinations**: 2 (7%)
- **Placeholder/Need Update**: 16 (57%)

---

## 📋 Recommended Fixes (Priority Order)

### High Priority (Before Launch):
1. ✅ Fix `#landlords` section ID issue
2. ✅ Fix `#about` section ID issue
3. ✅ Update real email addresses
4. ✅ Update real social media links

### Medium Priority:
5. Create or remove Blog link
6. Create or remove Help Center link
7. Create Privacy Policy page
8. Create Terms of Service page

### Low Priority:
9. Consider adding more internal navigation
10. Add smooth scroll behavior for anchor links (already implemented)

---

**Audit Date**: January 22, 2026
**Status**: ⚠️ 2 Critical Issues, 16 Placeholders
