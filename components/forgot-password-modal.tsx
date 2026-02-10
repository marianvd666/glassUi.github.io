'use client'

import React from "react"

import { useState } from 'react'
import { X, Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<'email' | 'verify' | 'success'>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep('verify')
  }

  const handleVerify = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep('success')
  }

  const handleReset = () => {
    setStep('email')
    setEmail('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
            <p className="text-muted-foreground">
              {step === 'email' && 'Enter your email to receive reset instructions'}
              {step === 'verify' && 'Verify the code sent to your email'}
              {step === 'success' && 'Password reset email sent successfully!'}
            </p>
          </div>

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent pointer-events-none" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input w-full pl-12"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full glass-button bg-accent text-white font-semibold py-3 rounded-xl hover:shadow-[0_0_40px_rgba(101,180,125,0.4)] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>
          )}

          {/* Verify Step */}
          {step === 'verify' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="glass-input w-full text-center tracking-widest text-lg"
                  maxLength={6}
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full glass-button bg-accent text-white font-semibold py-3 rounded-xl hover:shadow-[0_0_40px_rgba(101,180,125,0.4)] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-accent/20">
                  <CheckCircle className="w-12 h-12 text-accent" />
                </div>
              </div>
              <p className="text-foreground">
                A password reset link has been sent to <span className="font-semibold">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your email and follow the instructions to reset your password.
              </p>
              <button
                onClick={handleReset}
                className="w-full glass-button bg-accent text-white font-semibold py-3 rounded-xl hover:shadow-[0_0_40px_rgba(101,180,125,0.4)]"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Back Button */}
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
