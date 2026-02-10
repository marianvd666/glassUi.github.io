# Implementation Guide - Connect Real Authentication

## 🔐 Implementing Email/Password Authentication

### Step 1: Create Authentication API Routes

Create `/app/api/auth/login/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { cnicOrEmail, password } = await request.json()

    // Validate input
    if (!cnicOrEmail || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      )
    }

    // TODO: Replace with your database lookup
    // 1. Find user by CNIC or email
    // 2. Verify password using bcrypt
    // 3. Create session/JWT token
    // 4. Return token to client

    // Example response
    return NextResponse.json({
      success: true,
      token: 'your-jwt-token',
      user: {
        id: '123',
        email: cnicOrEmail,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Step 2: Create Password Reset API

Create `/app/api/auth/forgot-password/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // TODO: 
    // 1. Find user by email
    // 2. Generate reset token
    // 3. Save token with expiration (15 mins)
    // 4. Send email with reset link
    // 5. Return success message

    return NextResponse.json({
      success: true,
      message: 'Reset link sent to email',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
```

### Step 3: Create Verify Reset Code API

Create `/app/api/auth/verify-reset/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json()

    // TODO:
    // 1. Find reset token
    // 2. Verify token hasn't expired
    // 3. Verify code matches
    // 4. Hash new password with bcrypt
    // 5. Update user password
    // 6. Delete reset token

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired code' },
      { status: 400 }
    )
  }
}
```

---

## 🔗 Integrate with Database

### Using Supabase (Recommended)

1. **Install Supabase client**:
```bash
pnpm add @supabase/supabase-js
```

2. **Create `.env.local`**:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Create utility file** `/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

4. **Database Schema**:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnic VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Update Login Form Component

Modify `/components/login-form.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<LoginData>({
    cnicOrEmail: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!formData.cnicOrEmail || !formData.password) {
      setError('All fields are required')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      // Store token
      localStorage.setItem('authToken', data.token)
      
      if (onSubmit) {
        onSubmit(formData)
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // ... rest of component remains the same
}
```

---

## 🔗 Implement Forgot Password Modal

Update `/components/forgot-password-modal.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!email) return

  setIsLoading(true)

  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Show error
      return
    }

    setStep('verify')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    setIsLoading(false)
  }
}
```

---

## 🔐 Google OAuth Integration

### 1. Setup Google Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `https://yourdomain.com`

### 2. Install NextAuth.js (Recommended)

```bash
pnpm add next-auth @auth/core @auth/nextjs
```

### 3. Create Auth Config

Create `/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // TODO: Check if user exists, create if not
      return true
    },
  },
})

export const { GET, POST } = handlers
```

### 4. Add Environment Variables

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 5. Update Social Login Component

```typescript
'use client'

import { signIn } from 'next-auth/react'

export function SocialLogin({ isLoading = false }: SocialLoginProps) {
  const handleGoogleClick = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  // ... rest of component
}
```

---

## 📱 Facebook OAuth Integration

### 1. Setup Facebook Developer Console

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create new app
3. Add Facebook Login product
4. Get App ID and App Secret
5. Configure Redirect URIs

### 2. Add to NextAuth Config

```typescript
import FacebookProvider from 'next-auth/providers/facebook'

export const handlers = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
    }),
  ],
})
```

### 3. Environment Variables

```env
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret
```

---

## 🔒 Password Hashing with Bcrypt

```bash
pnpm add bcrypt
pnpm add -D @types/bcrypt
```

### Example: Hash Password

```typescript
import bcrypt from 'bcrypt'

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
```

---

## 📧 Email Service Setup

### Using Resend (Recommended)

```bash
pnpm add resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Send password reset email
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: userEmail,
  subject: 'Reset Your Password',
  html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
})
```

---

## 🔐 CNIC Validation

```typescript
function validateCNIC(cnic: string): boolean {
  // Pakistan CNIC format: XXXXX-XXXXXXX-X
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/
  return cnicRegex.test(cnic)
}
```

---

## ✅ Testing Checklist

- [ ] Email/password login works
- [ ] CNIC login works
- [ ] Forgot password flow works
- [ ] Google OAuth works
- [ ] Facebook OAuth works
- [ ] Remember me functionality
- [ ] Error messages display correctly
- [ ] Responsive on mobile
- [ ] Input validation works
- [ ] Security headers present

---

## 🚀 Deployment Checklist

- [ ] Remove console.log statements
- [ ] Set secure environment variables
- [ ] Enable HTTPS
- [ ] Add CORS headers if needed
- [ ] Test on production domain
- [ ] Monitor error logs
- [ ] Setup email service
- [ ] Test OAuth redirects

---

## 📚 Useful Resources

- [NextAuth.js Docs](https://next-auth.js.org)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
