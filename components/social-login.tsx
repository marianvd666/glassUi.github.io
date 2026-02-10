'use client'

import { Facebook, Mail } from 'lucide-react'

interface SocialLoginProps {
  isLoading?: boolean
}

export function SocialLogin({ isLoading = false }: SocialLoginProps) {
  const handleGoogleClick = () => {
    console.log('Google login clicked')
    // Implement actual Google OAuth
  }

  const handleFacebookClick = () => {
    console.log('Facebook login clicked')
    // Implement actual Facebook OAuth
  }

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span className="text-xs text-muted-foreground font-medium">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleClick}
          disabled={isLoading}
          className="glass-button flex items-center justify-center gap-2 py-3 hover:bg-white/15 transition-all duration-300 disabled:opacity-70"
        >
          <Mail className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-foreground">Google</span>
        </button>

        {/* Facebook Button */}
        <button
          type="button"
          onClick={handleFacebookClick}
          disabled={isLoading}
          className="glass-button flex items-center justify-center gap-2 py-3 hover:bg-white/15 transition-all duration-300 disabled:opacity-70"
        >
          <Facebook className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-foreground">Facebook</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button className="text-accent hover:text-accent/80 font-semibold transition-colors">
          Sign up
        </button>
      </p>
    </div>
  )
}
