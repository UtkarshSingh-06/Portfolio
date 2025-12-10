# 🎨 Color Palette & Cursor Interaction Update

## ✅ Changes Implemented

### 1. New Color Palette

**Primary Colors:**
- Black: `#000000` (`primary-black`)
- Charcoal: `#1a1a1a` (`primary-charcoal`)

**Secondary Colors:**
- Light Gray: `#d3d3d3` (`secondary-light-gray`)
- Silver: `#c0c0c0` (`secondary-silver`)

### 2. Parallax Cursor Interaction

Added a dynamic background effect that responds to cursor movement:
- **Radial gradient** follows the cursor position
- **Color shift** from Black/Charcoal to Light Gray/Silver as you move the mouse
- **Smooth transitions** for a polished feel
- **Performance optimized** with proper event handling

## 📁 Files Updated

### Core Configuration
- ✅ `tailwind.config.ts` - Updated color palette
- ✅ `app/globals.css` - Updated button styles and utilities
- ✅ `app/layout.tsx` - Added CursorInteraction component

### Components Updated
- ✅ `components/CursorInteraction.tsx` - New parallax cursor effect
- ✅ `components/Hero.tsx` - Updated colors
- ✅ `components/Header.tsx` - Updated navigation colors
- ✅ `components/Footer.tsx` - Updated link colors
- ✅ `components/Experience.tsx` - Updated accent colors
- ✅ `components/Badge.tsx` - Updated primary badge colors
- ✅ `components/Projects.tsx` - Updated link and loading colors
- ✅ `components/Contact.tsx` - Updated form and icon colors
- ✅ `components/AdminDashboard.tsx` - Updated icon colors
- ✅ `components/AdminLogin.tsx` - Updated form colors

### New Files
- ✅ `lib/hooks/useMousePosition.ts` - Custom hook for mouse tracking

## 🎯 How It Works

### Cursor Interaction
1. Tracks mouse position using `useMousePosition` hook
2. Calculates normalized position relative to screen center
3. Creates radial gradient that follows cursor
4. Shifts color from dark (Black/Charcoal) to light (Light Gray/Silver)
5. Smooth opacity transitions for better UX

### Color Usage
- **Primary Black/Charcoal**: Used for main text, buttons, accents
- **Secondary Light Gray/Silver**: Used for backgrounds, borders, hover states
- **Dark Mode**: Automatically adapts colors for dark theme

## 🚀 Usage

The cursor interaction is automatically active on all pages. Just move your mouse around to see the effect!

### Customization

To adjust the intensity of the cursor effect, edit `components/CursorInteraction.tsx`:
- `intensity`: Controls how much the color shifts (default: 0.2)
- Gradient size: Change `800px` to adjust the effect radius
- Opacity: Adjust the rgba alpha values for more/less visible effect

## 🎨 Color Classes Available

### Primary
- `bg-primary-black` / `text-primary-black`
- `bg-primary-charcoal` / `text-primary-charcoal`
- `bg-primary-{50-900}` (shades)

### Secondary
- `bg-secondary-light-gray` / `text-secondary-light-gray`
- `bg-secondary-silver` / `text-secondary-silver`
- `bg-secondary-{50-900}` (shades)

## ✨ Result

Your portfolio now features:
- ✅ Modern Black/Charcoal and Light Gray/Silver color scheme
- ✅ Interactive parallax cursor effect
- ✅ Smooth color transitions
- ✅ Consistent color usage across all components
- ✅ Dark mode support maintained

Enjoy your updated portfolio! 🎉

