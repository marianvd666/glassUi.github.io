'use client'

import React from "react"

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

interface LoginFormProps {
  onSubmit?: (data: LoginData) => void
}

export interface LoginData {
  cnicOrEmail: string
  password: string
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<LoginData>({
    cnicOrEmail: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!formData.cnicOrEmail) {
      setError('CNIC or Email is required')
      return
    }

    if (!formData.password) {
      setError('Password is required')
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* CNIC or Email Input */}
      <div className="space-y-2">
        <label htmlFor="cnicOrEmail" className="block text-sm font-medium text-foreground">
          CNIC or Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent pointer-events-none" />
          <input
            id="cnicOrEmail"
            name="cnicOrEmail"
            type="text"
            placeholder="12345-1234567-1 or your@email.com"
            value={formData.cnicOrEmail}
            onChange={handleChange}
            className="glass-input w-full pl-12"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent pointer-events-none" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="glass-input w-full pl-12 pr-12"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass bg-red-500/10 border-red-500/20 p-3 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Remember & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded accent-accent bg-white/10 border border-white/20 cursor-pointer"
            defaultChecked
            disabled={isLoading}
          />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            Remember me
          </span>
        </label>
        {/* <button
          type="button"
          className="text-accent hover:text-accent/80 font-medium transition-colors"
          disabled={isLoading}
        >
          Forgot Password?
        </button> */}
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full glass-button bg-gradient-to-r from-accent to-accent/80 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(101,180,125,0.4)] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Success Message (optional) */}
     
    </form>
  )
}
