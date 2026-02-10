'use client'

import { Building2 } from 'lucide-react'

export function CompanyHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20 glow-accent">
            <Building2 className="w-6 h-6 text-accent" />
          </div>
          <div>
            {/* <h1 className="text-xl md:text-2xl font-bold text-foreground">SecureAuth</h1> */}
            <p className="text-xs md:text-sm text-muted-foreground">Enterprise Portal</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">LIMS</p>
          <p className="text-xs text-accent font-semibold">2026</p>
        </div>
      </div>
    </div>
  )
}
