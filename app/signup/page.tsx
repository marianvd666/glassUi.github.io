'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CompanyHeader } from '@/components/company-header'
import { SignupForm, type SignupData } from '@/components/signup-form'

import { ChevronLeft } from 'lucide-react'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSignupSubmit = async (data: SignupData) => {
    setIsLoading(true)
    console.log('Signup attempt:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setSubmitSuccess(true)
    // Show success message
    alert(`Account created successfully!\nEmail: ${data.email}\nCity: ${data.city}`)
    // Reset form would go here in real app
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
          <div className="glass-card p-8 md:p-10 space-y-6 rounded-3xl">
            {/* Welcome Section */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Create Account
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Join us and get started today
              </p>
            </div>

            {/* Signup Form */}
            <SignupForm onSubmit={handleSignupSubmit} isLoading={isLoading} />

            {/* Divider */}
            <div className="relative py-4">
              
           
            </div>


            {/* Login Link */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link
                  href="/"
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Login
          </Link>

          {/* Footer Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 SecureAuth Enterprise. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}