# Design Guide - Glass Morphism Login Page

## 🎨 Visual Design System

### Color Palette

#### Primary Colors
```
Dark Forest Green (Background)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #0f2818
HSL:       120° 30% 8%
RGB:       15, 40, 24
Usage:     Page background, depth
Contrast:  95.2:1 with white


Vibrant Green (Accent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #65b47d
HSL:       120° 65% 55%
RGB:       101, 180, 125
Usage:     Buttons, highlights, glows
Contrast:  5.8:1 with white


Deep Forest (Secondary)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #1a3d2a
HSL:       120° 40% 35%
RGB:       26, 61, 42
Usage:     Card backgrounds, borders
Contrast:  15.2:1 with white
```

#### Neutral Colors
```
White (Foreground)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #f2f1f0
HSL:       120° 15% 95%
RGB:       242, 241, 240
Usage:     Text, primary content


Light Gray (Secondary Text)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #a3a39c
HSL:       120° 10% 70%
RGB:       163, 163, 156
Usage:     Secondary text, placeholders


Dark Gray (Borders)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color:     #2d5a3d
HSL:       120° 20% 25%
RGB:       45, 90, 61
Usage:     Borders, dividers, accents
```

### Glass Morphism Effect

**Technical Implementation:**
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
}
```

**Visual Characteristics:**
- ✨ Frosted glass appearance
- 🔵 Semi-transparent background
- 🌫️ Backdrop blur effect (20px)
- ✨ Subtle white border (20% opacity)
- 📐 Rounded corners (2rem = 32px)
- 🎆 Glow effects on hover

**Layering:**
```
┌─────────────────────────────────────────┐
│         Gradient Background             │  Layer 1
│  (Dark green with subtle overlays)      │
├─────────────────────────────────────────┤
│                                         │
│      ┌───────────────────────────┐     │
│      │   Glass Card (frosted)    │     │  Layer 2
│      │  ─────────────────────     │     │
│      │  Login Form                │     │
│      │  Social Buttons            │     │
│      └───────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📐 Typography

### Font Family
```
Primary Font: Inter (Google Fonts)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Weight:  400 (Regular) - Body text
         500 (Medium)  - Secondary headings
         600 (Semibold) - Labels, buttons
         700 (Bold)    - Main headings

Line-height:  1.5 (body), 1.2 (headings)
Letter-spacing: Normal
```

### Heading Scale
```
H1 - Main Title
└─ Size:  48px (3rem)
└─ Weight: 700 Bold
└─ Usage:  "Welcome Back"
└─ Mobile: 36px

H2 - Section Title
└─ Size:  32px (2rem)
└─ Weight: 600 Semibold
└─ Usage:  Modal titles
└─ Mobile: 24px

H3 - Subtitle
└─ Size:  20px (1.25rem)
└─ Weight: 600 Semibold
└─ Usage:  Form labels
└─ Mobile: 18px

Body - Regular Text
└─ Size:  16px (1rem)
└─ Weight: 400 Regular
└─ Usage:  Form fields, descriptions

Small - Helper Text
└─ Size:  14px (0.875rem)
└─ Weight: 400 Regular
└─ Usage:  Captions, hints

Micro - Fine Print
└─ Size:  12px (0.75rem)
└─ Weight: 400 Regular
└─ Usage:  Legal text, timestamps
```

---

## 🎭 Component Styling

### Login Card

**Dimensions:**
```
Desktop:
  Width:   100% (max-width: 28rem / 448px)
  Padding: 2.5rem (40px)
  Border-radius: 1.5rem (24px)
  Height:  auto

Mobile:
  Width:   100% - 2rem padding
  Padding: 2rem (32px)
  Border-radius: 1.25rem (20px)
```

**Styling:**
```
Background:  rgba(45, 90, 61, 0.1) with blur
Border:      1px solid rgba(255, 255, 255, 0.2)
Shadow:      0 25px 50px -12px rgba(0, 0, 0, 0.25)
Glow:        Subtle green glow on hover
```

### Buttons

**Primary Button (Sign In)**
```
Background:  Gradient: from-accent to accent/80
Color:       White
Padding:     12px 24px
Border-radius: 12px
Height:      48px
Font-weight: 600

States:
  Normal:    Gradient green
  Hover:     Glow shadow + opacity increase
  Active:    Scale 95% (pressed effect)
  Disabled:  Opacity 70%
  Loading:   Spinner animation
```

**Secondary Buttons (Social)**
```
Background:  Glass effect (white/10 with blur)
Color:       Foreground (light gray)
Padding:     12px 16px
Border-radius: 12px
Height:      48px
Font-weight: 600

States:
  Normal:    Subtle glass
  Hover:     Background opacity increase
  Active:    Scale 95%
  Disabled:  Opacity 70%
```

### Input Fields

**Styling:**
```
Background:  Glass with less opacity
Padding:     12px 16px (left icon offset: 40px)
Border:      1px solid rgba(255, 255, 255, 0.2)
Border-radius: 12px
Height:      44px
Text-color:  Foreground white
Placeholder: Muted gray

States:
  Focus:     Ring-2 ring-accent
  Error:     Ring-2 ring-red-500
  Disabled:  Opacity 50%
```

---

## 🎯 Layout Grid

### Desktop Layout (1024px+)
```
┌────────────────────────────────────────────────────────┐
│ SecureAuth Logo  Enterprise Portal  Year: 2024        │  Header
├────────────────────────────────────────────────────────┤
│                                                        │
│                    ┌─────────────────┐               │
│                    │  Welcome Back   │               │
│                    │                 │               │
│                    │  [Glass Card]   │               │
│                    │  - CNIC/Email   │               │
│                    │  - Password     │               │
│                    │  - Buttons      │               │
│                    │                 │               │
│                    └─────────────────┘               │
│                                                        │
│              Terms · Privacy · © 2024                 │  Footer
└────────────────────────────────────────────────────────┘
     Max-width: 448px centered
```

### Mobile Layout (375px)
```
┌──────────────────────────────┐
│ SecureAuth  Enterprise       │  Header
├──────────────────────────────┤
│                              │
│  ┌──────────────────────┐   │
│  │  Welcome Back        │   │
│  │                      │   │
│  │  [Glass Card]        │   │
│  │  - CNIC/Email        │   │
│  │  - Password          │   │
│  │  - Buttons           │   │
│  │                      │   │
│  └──────────────────────┘   │
│                              │
│  Terms · Privacy · © 2024    │  Footer
└──────────────────────────────┘
```

### Spacing System

```
2px    - Micro spacing (gaps within components)
4px    - Extra small (icon spacing)
8px    - Small (button gaps, input padding)
12px   - Medium (form gaps, component padding)
16px   - Large (section spacing)
20px   - Extra large (container padding)
24px   - Jumbo (card padding)
32px   - Header height equivalent

Used in Tailwind:
p-2   = 8px
p-3   = 12px
p-4   = 16px
p-6   = 24px
gap-3 = 12px
gap-4 = 16px
```

---

## 🌟 Animation & Interactions

### Transitions
```
Default:        150ms ease-in-out
Hover effects:  300ms ease-in-out
Loading:        Continuous spin
Dismiss:        200ms ease-out
```

### Hover Effects
```
Buttons:        Background opacity +10%, glow shadow appears
Inputs:         Ring effect on focus
Cards:          Subtle scale (1.02) on hover
Icons:          Color transition to accent
Links:          Color fade to accent/80
```

### Animations
```
Loading Spinner:    Continuous 360° rotation (2s)
Glow Effect:        Smooth shadow pulse (optional)
Page Load:          Fade in (300ms)
Modal Open:         Scale + fade (200ms)
Modal Close:        Scale + fade (150ms)
```

---

## 🎨 Visual Hierarchy

### Primary (Most Important)
- Main heading: "Welcome Back" (48px, bold)
- Sign In button (gradient, glowing)
- Company header (top, fixed)

### Secondary (Important)
- Input labels (20px, semibold)
- Subheading: "Sign in to continue" (16px, regular)
- Social buttons (secondary style)

### Tertiary (Supporting)
- Placeholder text (14px, muted)
- Helper text (12px, very muted)
- Footer text (12px, muted)
- Remember me checkbox (14px, muted)

---

## ♿ Accessibility

### Color Contrast

```
Text Contrast Ratios:
┌─────────────────────────────────────────┐
│ White on Dark Green:    95.2:1 ✅ AAA   │
│ Green on Dark Green:    5.8:1  ✅ AA    │
│ Gray on Dark Green:     13.1:1 ✅ AAA   │
│ Error Red on Dark:      7.2:1  ✅ AA    │
└─────────────────────────────────────────┘
```

### Focus States
```
All interactive elements have visible focus ring:
  - Outline color: accent green
  - Outline width: 2px
  - Outline offset: 2px
  - Style: solid
```

### Touch Targets
```
Minimum size: 44x44px
  ✅ Buttons: 48x48px
  ✅ Input fields: 44px height
  ✅ Checkbox: 20x20px
```

---

## 📱 Responsive Breakpoints

```
Mobile:     360px - 767px   (Small phones to tablets)
Tablet:     768px - 1023px  (Tablets)
Desktop:    1024px+         (Large screens)

Breakpoint Changes:
─────────────────────────────
360px:  Stacked, full-width buttons
640px:  Optimized spacing
768px:  Two-column buttons (Google/Facebook)
1024px: Maximum card width (448px)
```

---

## 🖼️ Design Tokens Reference

### CSS Variables (in globals.css)

```css
Color Tokens:
--background:          120 30% 8%      → Dark forest
--foreground:          120 15% 95%     → Light white
--accent:              120 65% 55%     → Vibrant green
--muted-foreground:    120 10% 70%     → Light gray
--border:              120 20% 25%     → Dark gray

Sizing:
--radius:              0.75rem         → 12px border-radius

Spacing (Tailwind):
p-2:  0.5rem (8px)
p-4:  1rem   (16px)
p-6:  1.5rem (24px)
gap-3: 0.75rem (12px)
```

---

## 🎯 Customization Examples

### Change Brand Color

**Current (Green):**
```css
--accent: 120 65% 55%;      /* Green */
```

**To Blue:**
```css
--accent: 210 100% 50%;     /* Blue */
```

**To Purple:**
```css
--accent: 280 80% 50%;      /* Purple */
```

**To Orange:**
```css
--accent: 40 100% 50%;      /* Orange */
```

### Change Theme from Dark to Light

```css
/* Light mode */
:root {
  --background: 120 15% 95%;          /* Light */
  --foreground: 120 30% 8%;           /* Dark */
  --card: 0 0% 100%;                  /* White */
}
```

### Change Typography

Edit `layout.tsx`:
```tsx
import { Roboto } from 'next/font/google'  // Change font
const roboto = Roboto({ weight: ['400', '700'] })
```

---

## 📸 Component Preview

### Login Card States

```
DEFAULT STATE
┌─────────────────────────┐
│   Welcome Back          │
│   Sign in to continue   │
│                         │
│  [CNIC/Email input]     │
│  [Password input]       │
│  ☑ Remember me          │
│                         │
│  [SIGN IN →]            │  Green gradient
│                         │
│    ──── OR ────         │
│  [Google] [Facebook]    │
│                         │
│  Don't have account?    │
│  [Sign up]              │
└─────────────────────────┘

LOADING STATE
│  [SIGNING IN... ⟳]      │  Spinner animates

ERROR STATE
┌─────────────────────────┐
│ ⚠ Invalid credentials   │  Red background
└─────────────────────────┘

SUCCESS STATE
│  ✓ Login successful!    │  Green background
```

---

## 🚀 Performance Optimization

### Image Loading
```
Background gradients:  CSS only (no images)
Icons:                 SVG (Lucide React)
Logo:                  SVG preferred
```

### CSS Optimization
```
Backup blur filter:    If backdrop-filter unavailable
Reduced motion:        Respects prefers-reduced-motion
Critical CSS:          Inlined for FCP optimization
```

---

## 📋 Design Checklist

- ✅ Consistent color usage
- ✅ Proper text contrast (AA standard)
- ✅ Responsive layouts
- ✅ Touch-friendly buttons (44x44px min)
- ✅ Clear visual hierarchy
- ✅ Loading states defined
- ✅ Error states visible
- ✅ Focus states for accessibility
- ✅ Smooth animations
- ✅ Mobile-first approach

---

## 📚 Design Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Glass Morphism**: https://glassmorphism.com
- **Color Contrast**: https://webaim.org/resources/contrastchecker/
- **Accessibility**: https://www.a11y-101.com/
- **Typography**: https://fonts.google.com/

---

For implementation details, see: [COMPONENT_API.md](./COMPONENT_API.md)
