# SecureAuth - Glassy Login Page Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation & Running

#### Option 1: Using pnpm (Recommended)
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

#### Option 2: Using npm
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

#### Option 3: Using yarn
```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main login page
│   └── globals.css          # Global styles & design tokens
├── components/
│   ├── company-header.tsx   # Company header component
│   ├── login-form.tsx       # Login form with CNIC/Email & password
│   ├── social-login.tsx     # Google & Facebook login buttons
│   └── forgot-password-modal.tsx  # Password reset modal
├── public/                   # Static assets
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

---

## ✨ Features

### 1. **Company Header**
- Company logo and branding at the top
- "Company Login" badge
- Enterprise portal indicator

### 2. **Glass Morphism Design**
- Frosted glass effect with backdrop blur
- Dark green color scheme (#0f2818 - #1a3d2a)
- Beautiful gradient overlays
- Glowing accent effects

### 3. **Login Form**
- CNIC or Email input field
- Password input with show/hide toggle
- Remember me checkbox
- Form validation
- Forgot Password link

### 4. **Social Authentication**
- Google Sign-In button
- Facebook Sign-In button
- Professional styling with icons

### 5. **Forgot Password Modal**
- Multi-step password reset flow
- Email verification
- OTP code input
- Success confirmation

### 6. **Responsive Design**
- Mobile-first approach
- Fully responsive on all screen sizes
- Touch-friendly buttons and inputs

---

## 🎨 Color Scheme

The application uses a premium dark green palette:

- **Background**: `#0f2818` (Dark Forest Green)
- **Primary Accent**: `#65b47d` (Vibrant Green)
- **Card Background**: `rgba(45, 90, 61, 0.1)` (Semi-transparent)
- **Text Primary**: Light gray (`#f2f1f0`)
- **Text Secondary**: Muted green (`#a3a39c`)

All colors are defined as CSS variables in `globals.css` for easy customization.

---

## 🔧 Customization

### Change Company Name
Edit `components/company-header.tsx`:
```tsx
<h1 className="text-xl md:text-2xl font-bold text-foreground">YourCompanyName</h1>
```

### Change Primary Color
Edit `app/globals.css`:
```css
--accent: 120 65% 55%;  /* Change these HSL values */
```

### Change Welcome Text
Edit `app/page.tsx`:
```tsx
<h2 className="text-3xl md:text-4xl font-bold text-foreground">
  Your Welcome Message
</h2>
```

### Add Real OAuth Integration
Update the handler functions in:
- `components/social-login.tsx` (Google & Facebook)
- `components/login-form.tsx` (Email/Password)
- `components/forgot-password-modal.tsx` (Reset flow)

---

## 📝 Demo Credentials

For testing purposes, you can use any values:
- **CNIC/Email**: `12345-1234567-1` or `test@example.com`
- **Password**: `any-value`

The form will accept and process any input (for demo purposes).

---

## 🔐 Security Considerations

### Before Production

1. **Implement Backend Authentication**
   - Use secure OAuth 2.0 providers
   - Implement HTTPS only
   - Add CSRF protection

2. **Password Security**
   - Use bcrypt for hashing
   - Implement rate limiting
   - Add password strength requirements

3. **Session Management**
   - Use secure HTTP-only cookies
   - Implement session expiration
   - Add CORS protection

4. **Data Validation**
   - Server-side input validation
   - Sanitize all user inputs
   - Validate CNIC format

---

## 📦 Build for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

The optimized build will be in the `.next` folder.

---

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Deploy with one click

### Option 3: Via v0 UI
1. Click the "Publish" button in v0 interface
2. Follow the Vercel deployment steps

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, specify a different port:
```bash
pnpm dev --port 3001
```

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
pnpm install
# or clear cache
pnpm store prune && pnpm install
```

### CSS Not Loading
Clear Next.js cache:
```bash
rm -rf .next
pnpm dev
```

---

## 📚 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom glass morphism
- **Icons**: Lucide React
- **Form Handling**: React Hook Form (prepared)
- **Validation**: Zod (prepared)
- **Language**: TypeScript

---

## 📄 Component API

### LoginForm Props
```tsx
interface LoginFormProps {
  onSubmit?: (data: LoginData) => void
}

interface LoginData {
  cnicOrEmail: string
  password: string
}
```

### ForgotPasswordModal Props
```tsx
interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}
```

### SocialLogin Props
```tsx
interface SocialLoginProps {
  isLoading?: boolean
}
```

---

## 🎯 Next Steps

1. **Replace Demo Logic**: Update form submissions with real API calls
2. **Add OAuth Providers**: Implement Google and Facebook authentication
3. **Setup Backend**: Create authentication endpoints
4. **Database Integration**: Add user storage (Supabase, Firebase, etc.)
5. **Testing**: Add unit and integration tests
6. **Analytics**: Track user interactions

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the component comments
3. Visit: https://vercel.com/help

---

## 📜 License

This project is created with v0.app - Vercel's AI-powered UI generator.

Happy coding! 🚀
