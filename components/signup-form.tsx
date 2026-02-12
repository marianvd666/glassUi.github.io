'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { PAKISTAN_PROVINCES, PAKISTAN_CITIES, GENDER_OPTIONS, type GenderOption, type ProvinceType } from '@/lib/pakistan-data'

export interface SignupData {
  email: string
  password: string
  confirmPassword: string
  cnic: string
  gender: GenderOption
  province: ProvinceType
  city: string
}

interface SignupFormProps {
  onSubmit: (data: SignupData) => void
  isLoading?: boolean
}

export function SignupForm({ onSubmit, isLoading = false }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState<ProvinceType | ''>('')
 const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    password: '',
    confirmPassword: '',
    cnic: '',
    gender: 'prefer-not-to-say',
    province: 'Punjab',
    city: '',
  })

  const availableCities = selectedProvince ? PAKISTAN_CITIES[selectedProvince] : []

  const validateForm = (): boolean => {
  const newErrors: Record<string, boolean> = {}

  if (!formData.email) newErrors.email = true
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true

  if (!formData.password) newErrors.password = true
  else if (formData.password.length < 8) newErrors.password = true

  if (!formData.confirmPassword) newErrors.confirmPassword = true
  else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = true

  if (!formData.cnic) newErrors.cnic = true
  else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic) && !/^\d{13}$/.test(formData.cnic)) {
    newErrors.cnic = true
  }

  if (!selectedProvince) newErrors.province = true
  if (!formData.city) newErrors.city = true

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
  if (errors[name]) {
    setErrors((prev) => {
      const updated = { ...prev }
      delete updated[name]
      return updated
    })
  }
}
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value as ProvinceType
    setSelectedProvince(province)
    setFormData((prev) => ({
      ...prev,
      province: province,
      city: '',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`glass-input w-full transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          disabled={isLoading}
        />
        {errors.email && <p className="text-xs text-red-400">Valid email required</p>}
      </div>

      {/* CNIC Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">CNIC Number</label>
        <input
          type="text"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          placeholder="12345-6789012-3 or 1234567890123"
          className={`glass-input w-full transition-all ${errors.cnic ? 'border-red-500 focus:ring-red-500' : ''}`}
          disabled={isLoading}
        />
        {errors.cnic && <p className="text-xs text-red-400">Valid CNIC format required</p>}
      </div>

      {/* Gender Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="glass-input w-full transition-all"
          disabled={isLoading}
        >
          {GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-background text-foreground">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Province Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Province</label>
        <select
          value={selectedProvince}
          onChange={handleProvinceChange}
          className={`glass-input w-full transition-all ${errors.province ? 'border-red-500 focus:ring-red-500' : ''}`}
          disabled={isLoading}
        >
          <option value="" className="bg-background text-foreground">
            Select Province
          </option>
          {PAKISTAN_PROVINCES.map((province) => (
            <option key={province} value={province} className="bg-background text-foreground">
              {province}
            </option>
          ))}
        </select>
        {errors.province && <p className="text-xs text-red-400">Province is required</p>}
      </div>

      {/* City Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">City/Area</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`glass-input w-full transition-all ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
          disabled={isLoading || !selectedProvince}
        >
          <option value="" className="bg-background text-foreground">
            {selectedProvince ? 'Select City' : 'Select Province First'}
          </option>
          {availableCities.map((city) => (
            <option key={city} value={city} className="bg-background text-foreground">
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-xs text-red-400">City is required</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            className={`glass-input w-full pr-10 transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400">Min 8 characters required</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`glass-input w-full pr-10 transition-all ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-400">Passwords do not match</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full glass-button mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}