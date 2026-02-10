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
    console.log('Login attempt:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Handle successful login
    alert(`Welcome! Login with ${data.cnicOrEmail}`)
  }

  const handleForgotPasswordClick = () => {
    setForgotPasswordOpen(true)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/20" />
        <div className="absolute top-20 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      {/* Company Header */}
      <CompanyHeader />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center pt-20 pb-6 px-4">
        <div className="w-full max-w-md">
          {/* Glass Card Container */}
          <div className="glass-card p-8 md:p-10 space-y-8 rounded-3xl">
            {/* Welcome Section */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <div>
              <LoginForm onSubmit={handleLoginSubmit} />
              {/* Forgot Password Button */}
              <button
                onClick={handleForgotPasswordClick}
                className="w-full mt-4 text-accent hover:text-accent/80 font-medium text-sm transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Social Login */}
            <SocialLogin isLoading={isLoading} />
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 LIMS . All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </div>
  )
}
