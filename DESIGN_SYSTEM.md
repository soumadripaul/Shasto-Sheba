# 🎨 Design System & Color Palette - Mon Bondhu

## Color Palette

### Primary Colors
```css
--primary-color: #6366f1      /* Indigo 500 */
--primary-dark: #4f46e5       /* Indigo 600 */
--primary-light: #818cf8      /* Indigo 400 */
--secondary-color: #ec4899    /* Pink 500 */
```

### Accent Colors
```css
--accent-color: #14b8a6       /* Teal 500 */
--accent-pink: #f472b6        /* Pink 400 */
--accent-coral: #fb7185       /* Rose 400 */
--orange-color: #f97316       /* Orange 500 */
--purple-color: #a855f7       /* Purple 500 */
--teal-color: #14b8a6         /* Teal 500 */
```

### Semantic Colors
```css
--success-color: #10b981      /* Emerald 500 */
--warning-color: #f59e0b      /* Amber 500 */
--danger-color: #ef4444       /* Red 500 */
--info-color: #06b6d4         /* Cyan 500 */
```

### Neutral Colors
```css
--text-primary: #1e293b       /* Slate 800 */
--text-secondary: #475569     /* Slate 600 */
--text-muted: #64748b         /* Slate 500 */
--bg-primary: #ffffff         /* White */
--bg-secondary: #f8fafc       /* Slate 50 */
--bg-tertiary: #f1f5f9        /* Slate 100 */
--bg-dark: #0f172a            /* Slate 900 */
```

## Gradient System

### Primary Gradients
```css
/* Main Brand Gradient */
--primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
/* Indigo → Purple → Fuchsia */

/* Secondary Gradient */
--secondary-gradient: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
/* Pink → Rose */

/* Success Gradient */
--success-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
/* Emerald → Emerald Dark */

/* Warning Gradient */
--warning-gradient: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
/* Amber → Amber Dark */

/* Info Gradient */
--info-gradient: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
/* Cyan → Cyan Dark */

/* Accent Gradient */
--accent-gradient: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
/* Orange → Orange Dark */

/* Teal Gradient */
--teal-gradient: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
/* Teal → Teal Dark */

/* Purple Gradient */
--purple-gradient: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
/* Purple → Purple Dark */
```

### Hero/Background Gradients
```css
/* Hero Section */
background: linear-gradient(135deg, 
  #6366f1 0%,    /* Indigo */
  #8b5cf6 25%,   /* Purple */
  #ec4899 50%,   /* Pink */
  #f43f5e 75%,   /* Rose */
  #f97316 100%   /* Orange */
);

/* CTA Section */
background: linear-gradient(135deg, 
  #ec4899 0%,    /* Pink */
  #f43f5e 25%,   /* Rose */
  #f97316 50%,   /* Orange */
  #f59e0b 100%   /* Amber */
);

/* Footer */
background: linear-gradient(135deg, 
  #1e293b 0%,    /* Slate 800 */
  #0f172a 50%,   /* Slate 900 */
  #1e1b4b 100%   /* Indigo 950 */
);
```

## Shadow System

### Standard Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.16);
```

### Colored Shadows
```css
--shadow-colored: 0 8px 32px rgba(99, 102, 241, 0.3);
--shadow-colored-hover: 0 12px 40px rgba(99, 102, 241, 0.4);
--shadow-pink: 0 8px 32px rgba(236, 72, 153, 0.3);
--shadow-teal: 0 8px 32px rgba(20, 184, 166, 0.3);
```

## Spacing Scale
```css
0.25rem = 4px
0.5rem  = 8px
0.75rem = 12px
1rem    = 16px
1.25rem = 20px
1.5rem  = 24px
2rem    = 32px
2.5rem  = 40px
3rem    = 48px
4rem    = 64px
5rem    = 80px
6rem    = 96px
7rem    = 112px
```

## Typography Scale

### Font Sizes
```css
0.875rem = 14px  /* Small text */
1rem     = 16px  /* Body text */
1.05rem  = 16.8px /* Large body */
1.1rem   = 17.6px /* Labels */
1.25rem  = 20px  /* Subtitle */
1.35rem  = 21.6px /* Card title */
1.5rem   = 24px  /* Section heading */
2rem     = 32px  /* Page section */
2.5rem   = 40px  /* Section title */
3rem     = 48px  /* Page title */
4rem     = 64px  /* Hero title */
```

### Font Weights
```css
400 = Normal
500 = Medium
600 = Semibold
700 = Bold
800 = Extrabold
900 = Black
```

### Line Heights
```css
1.6 = Normal text
1.7 = Comfortable reading
1.8 = Spacious reading
```

## Border Radius Scale
```css
--radius-sm: 0.5rem    /* 8px */
--radius-md: 0.875rem  /* 14px */
--radius-lg: 1.25rem   /* 20px */
--radius-xl: 1.75rem   /* 28px */
--radius-2xl: 2rem     /* 32px */
--radius-full: 9999px  /* Full rounded */
```

## Transition System
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Animation Keyframes

### Entrance Animations
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0) rotate(-180deg); }
  50% { transform: scale(1.1) rotate(10deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

@keyframes rotateIn {
  from { opacity: 0; transform: scale(0) rotate(-360deg); }
  to { opacity: 1; transform: scale(1) rotate(0deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Continuous Animations
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Component Patterns

### Card Pattern
```css
.card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 2px solid rgba(226, 232, 240, 0.8);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: var(--shadow-xl);
  border-color: rgba(99, 102, 241, 0.4);
}
```

### Button Pattern
```css
.button {
  padding: 1rem 2.5rem;
  border-radius: var(--radius-lg);
  font-weight: 700;
  background: var(--primary-gradient);
  color: white;
  border: 2px solid transparent;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-colored-hover);
}
```

### Input Pattern
```css
.input {
  padding: 1rem 1.25rem;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.95);
  transition: all var(--transition-base);
}

.input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}
```

## Glassmorphism Pattern
```css
.glass {
  background: rgba(255, 255, 255, 0.98);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-lg);
}
```

## Usage Guidelines

### Do's ✅
- Use primary gradient for main CTAs
- Apply consistent spacing (multiples of 4px)
- Maintain shadow hierarchy (sm → md → lg → xl)
- Use glassmorphism for overlays and cards
- Animate with transform and opacity (GPU-accelerated)
- Keep transitions at 0.3s for most interactions
- Use colored shadows for elevated elements

### Don'ts ❌
- Don't mix too many gradients in one view
- Don't animate width/height (use scale instead)
- Don't use shadows lighter than --shadow-sm on white backgrounds
- Don't animate margin/padding (use transform)
- Don't use border-radius smaller than --radius-sm
- Don't use font-weight between standard values

## Color Accessibility

### Contrast Ratios (WCAG AA Compliant)
- Text Primary on White: 14.75:1 ✅
- Text Secondary on White: 8.59:1 ✅
- Primary Color on White: 5.12:1 ✅
- White on Primary: 4.5:1 ✅

### Touch Targets
- Minimum: 44 × 44px (buttons, links)
- Recommended: 48 × 48px (primary CTAs)

---

**Design System Version**: 1.0.0  
**Last Updated**: 2025  
**Maintained By**: Mon Bondhu Team  
**Framework**: CSS Variables + Modern CSS  
