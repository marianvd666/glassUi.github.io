# Component API Documentation

## 📋 Table of Contents
1. [CompanyHeader](#companyheader)
2. [LoginForm](#loginform)
3. [SocialLogin](#sociallogin)
4. [ForgotPasswordModal](#forgotpasswordmodal)

---

## CompanyHeader

**Location**: `components/company-header.tsx`

Component that displays the company branding at the top of the page.

### Props
```typescript
interface CompanyHeaderProps {
  // No props required - displays fixed branding
}
```

### Usage
```tsx
import { CompanyHeader } from '@/components/company-header'

export default function LoginPage() {
  return (
    <>
      <CompanyHeader />
      {/* Rest of page */}
    </>
  )
}
```

### Features
- Company logo icon with glowing background
- Company name and tagline
- Enterprise portal badge
- Year indicator
- Positioned absolutely at top
- Responsive on all screen sizes

### Customization
Edit `components/company-header.tsx` to change:

**Logo Icon**:
```tsx
<Building2 className="w-6 h-6 text-accent" />
// Replace 'Building2' with any Lucide icon
```

**Company Name**:
```tsx
<h1 className="text-xl md:text-2xl font-bold text-foreground">
  YourCompanyName
</h1>
```

**Tagline**:
```tsx
<p className="text-xs md:text-sm text-muted-foreground">
  Your Tagline Here
</p>
```

---

## LoginForm

**Location**: `components/login-form.tsx`

Main login form component with CNIC/Email and password inputs.

### Props
```typescript
interface LoginFormProps {
  onSubmit?: (data: LoginData) => void
}

interface LoginData {
  cnicOrEmail: string
  password: string
}
```

### Usage
```tsx
import { LoginForm } from '@/components/login-form'

export default function Page() {
  const handleLogin = async (data: LoginData) => {
    console.log('Login with:', data)
    // Send to API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return <LoginForm onSubmit={handleLogin} />
}
```

### Features
- CNIC/Email input field
- Password input with show/hide toggle
- Input validation
- Error message display
- Remember me checkbox
- Loading state with spinner
- Accessible with proper labels
- Responsive design

### Event Handlers

**Form Submission**:
```tsx
const handleSubmit = async (data: LoginData) => {
  // Your login logic here
  console.log(data.cnicOrEmail, data.password)
}
```

### State Management
Internal state:
- `formData`: Stores CNIC/Email and password
- `showPassword`: Toggle password visibility
- `isLoading`: Loading state during submission
- `error`: Error message display

### Validation
```typescript
// Required field validation
if (!formData.cnicOrEmail) {
  setError('CNIC or Email is required')
  return
}

// Password validation
if (!formData.password) {
  setError('Password is required')
  return
}
```

### API Integration Example
```tsx
<LoginForm
  onSubmit={async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      // Handle response
    } catch (error) {
      console.error('Login failed:', error)
    }
  }}
/>
```

---

## SocialLogin

**Location**: `components/social-login.tsx`

Component for Google and Facebook authentication buttons.

### Props
```typescript
interface SocialLoginProps {
  isLoading?: boolean  // Disable buttons during loading
}
```

### Usage
```tsx
import { SocialLogin } from '@/components/social-login'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {/* Other components */}
      <SocialLogin isLoading={isLoading} />
    </>
  )
}
```

### Features
- Google Sign-In button
- Facebook Sign-In button
- Divider with "OR" text
- Sign up link
- Loading state support
- Responsive grid layout
- Professional styling

### Button Handlers

**Google Button**:
```tsx
const handleGoogleClick = () => {
  // Implement Google OAuth
  console.log('Google login clicked')
}
```

**Facebook Button**:
```tsx
const handleFacebookClick = () => {
  // Implement Facebook OAuth
  console.log('Facebook login clicked')
}
```

### NextAuth.js Integration
```tsx
'use client'

import { signIn } from 'next-auth/react'
import { SocialLogin } from '@/components/social-login'

export function SocialLogin({ isLoading = false }: SocialLoginProps) {
  const handleGoogleClick = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleFacebookClick = async () => {
    await signIn('facebook', { callbackUrl: '/dashboard' })
  }

  // ... rest of component
}
```

### Styling
Buttons use glass morphism:
```css
.glass-button {
  @apply glass px-6 py-3 font-semibold rounded-xl 
         transition-all duration-300 hover:bg-white/20 active:scale-95;
}
```

---

## ForgotPasswordModal

**Location**: `components/forgot-password-modal.tsx`

Modal component for password reset flow with multiple steps.

### Props
```typescript
interface ForgotPasswordModalProps {
  isOpen: boolean      // Control modal visibility
  onClose: () => void  // Callback when closing
}
```

### Usage
```tsx
import { ForgotPasswordModal } from '@/components/forgot-password-modal'
import { useState } from 'react'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Forgot Password?
      </button>

      <ForgotPasswordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
```

### Features
- **3-Step Flow**:
  1. Email input
  2. Verification code
  3. Success confirmation
- Modal overlay with backdrop blur
- Close button (X)
- Loading states
- Error handling
- Smooth transitions
- Responsive design

### Step-by-Step Breakdown

**Step 1: Email Entry**
```tsx
// User enters their email address
// API call: POST /api/auth/forgot-password
// Sets step to 'verify'
```

**Step 2: Code Verification**
```tsx
// User enters 6-digit code
// API call: POST /api/auth/verify-reset
// Sets step to 'success'
```

**Step 3: Success**
```tsx
// Shows confirmation message
// "Back to Login" button returns to login form
```

### API Integration Example

**Step 1 - Send Reset Email**:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await response.json()
  if (response.ok) {
    setStep('verify')
  }
}
```

**Step 2 - Verify Code**:
```tsx
const handleVerify = async () => {
  const response = await fetch('/api/auth/verify-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      code: verificationCode,
      newPassword: newPassword,
    }),
  })
  if (response.ok) {
    setStep('success')
  }
}
```

### State Management
Internal state:
- `step`: Current step ('email' | 'verify' | 'success')
- `email`: User's email address
- `isLoading`: Loading state for API calls

### Styling
Uses glass morphism with custom classes:
```tsx
<div className="glass-card">
  {/* Modal content */}
</div>
```

---

## Integration Example - Complete Login Page

```tsx
'use client'

import { useState } from 'react'
import { CompanyHeader } from '@/components/company-header'
import { LoginForm, type LoginData } from '@/components/login-form'
import { SocialLogin } from '@/components/social-login'
import { ForgotPasswordModal } from '@/components/forgot-password-modal'

export default function LoginPage() {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSubmit = async (data: LoginData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <CompanyHeader />

      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-10 max-w-md w-full">
          <h2 className="text-4xl font-bold mb-8">Welcome Back</h2>

          <LoginForm onSubmit={handleLoginSubmit} />

          <button onClick={() => setForgotPasswordOpen(true)}>
            Forgot Password?
          </button>

          <SocialLogin isLoading={isLoading} />
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </div>
  )
}
```

---

## Styling & Theming

### Global Classes

All components use these glass morphism classes defined in `globals.css`:

```css
.glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl;
}

.glass-card {
  @apply glass shadow-2xl;
}

.glass-input {
  @apply glass bg-white/5 px-4 py-3 text-foreground 
         placeholder:text-muted-foreground focus:outline-none 
         focus:ring-2 focus:ring-accent focus:ring-offset-0;
}

.glass-button {
  @apply glass px-6 py-3 font-semibold rounded-xl 
         transition-all duration-300 hover:bg-white/20 active:scale-95;
}

.glow-accent {
  @apply shadow-[0_0_30px_rgba(101,180,125,0.3)];
}
```

### Color Variables

Dark green theme:
```css
--background: 120 30% 8%;      /* #0f2818 */
--accent: 120 65% 55%;         /* #65b47d */
--foreground: 120 15% 95%;     /* #f2f1f0 */
--muted-foreground: 120 10% 70%; /* #a3a39c */
```

---

## Accessibility

All components include:
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Color contrast
- ✅ Alt text on icons

### Example - Adding ARIA Labels
```tsx
<input
  id="cnicOrEmail"
  aria-label="CNIC or Email address"
  aria-required="true"
  // ...
/>
```

---

## Common Customizations

### Change Button Color
```tsx
// In any component
className="glass-button bg-accent"

// Change to custom color
className="glass-button bg-blue-500"
```

### Add Loading Skeleton
```tsx
import { Skeleton } from '@/components/ui/skeleton'

{isLoading && <Skeleton className="h-12 w-full" />}
```

### Add Toast Notifications
```tsx
import { toast } from 'sonner'

toast.success('Login successful!')
toast.error('Login failed. Please try again.')
```

---

## Testing

### Unit Test Example (Jest + React Testing Library)

```tsx
import { render, screen } from '@testing-library/react'
import { LoginForm } from '@/components/login-form'

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText(/CNIC or Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })
})
```

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Android Chrome

---

## Performance Tips

1. **Memoize Components**:
```tsx
import { memo } from 'react'

export const LoginForm = memo(function LoginForm({ onSubmit }) {
  // Component code
})
```

2. **Lazy Load Modal**:
```tsx
import dynamic from 'next/dynamic'

const ForgotPasswordModal = dynamic(() =>
  import('@/components/forgot-password-modal').then(
    (mod) => mod.ForgotPasswordModal
  )
)
```

3. **Image Optimization**:
```tsx
import Image from 'next/image'

<Image
  src="/company-logo.svg"
  alt="Company Logo"
  width={32}
  height={32}
/>
```

---

## Troubleshooting

### Components not appearing?
1. Check imports are correct
2. Verify TypeScript types match
3. Check z-index for modals
4. Clear Next.js cache: `rm -rf .next`

### Styling issues?
1. Verify Tailwind CSS is imported
2. Check globals.css is loaded
3. Ensure theme colors in tailwind.config.ts
4. Browser DevTools → check computed styles

### Form not submitting?
1. Check form onSubmit handler
2. Verify prevent default is working
3. Check browser console for errors
4. Test with fetch directly

---

For more information, see:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
