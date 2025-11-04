// Different logo icon options for MonBondhu

// Option 1: Medical Cross (Current - Green with white cross)
export const MedicalCrossIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#4CAF50" stroke="#ffffff" strokeWidth="2"/>
    <path d="M20 10 L20 30 M10 20 L30 20" stroke="#ffffff" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="3" fill="#ffffff"/>
  </svg>
);

// Option 2: Heart with Pulse (Red/Pink gradient)
export const HeartPulseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8E53" />
      </linearGradient>
    </defs>
    <path d="M20 32 C20 32 5 22 5 13 C5 7 9 5 12 5 C15 5 18 7 20 10 C22 7 25 5 28 5 C31 5 35 7 35 13 C35 22 20 32 20 32 Z" fill="url(#heartGradient)"/>
    <path d="M12 18 L15 15 L17 18 L20 12 L23 18 L25 15 L28 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// Option 3: Stethoscope Icon (Blue)
export const StethoscopeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#2196F3" stroke="#ffffff" strokeWidth="2"/>
    <path d="M13 12 C13 12 13 8 16 8 C19 8 19 12 19 12 L19 16 C19 18 17 20 15 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M27 12 C27 12 27 8 24 8 C21 8 21 12 21 12 L21 16 C21 18 23 20 25 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="26" r="4" fill="#ffffff"/>
    <circle cx="20" cy="26" r="2" fill="#2196F3"/>
  </svg>
);

// Option 4: Shield with Heart (Protection + Health)
export const ShieldHeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path d="M20 5 L30 10 L30 20 C30 27 25 32 20 35 C15 32 10 27 10 20 L10 10 Z" fill="url(#shieldGradient)" stroke="#ffffff" strokeWidth="2"/>
    <path d="M20 25 C20 25 13 19 13 15 C13 12 15 11 16.5 11 C18 11 19 12 20 13.5 C21 12 22 11 23.5 11 C25 11 27 12 27 15 C27 19 20 25 20 25 Z" fill="#ffffff"/>
  </svg>
);

// Option 5: Hand with Heart (Care + Support)
export const HandHeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#FF6B9D" stroke="#ffffff" strokeWidth="2"/>
    <path d="M15 18 L15 25 C15 27 16 28 18 28 L22 28 C24 28 25 27 25 25 L25 20 L27 18 L27 14 L25 14 L25 17 L23 17 L23 12 L21 12 L21 17 L19 17 L19 13 L17 13 L17 17 L15 17 Z" fill="#ffffff"/>
    <path d="M20 14 C20 14 17 11.5 17 9.5 C17 8 18 7.5 18.5 7.5 C19 7.5 19.5 8 20 8.5 C20.5 8 21 7.5 21.5 7.5 C22 7.5 23 8 23 9.5 C23 11.5 20 14 20 14 Z" fill="#ffffff"/>
  </svg>
);

// Option 6: Lotus Flower (Peace + Wellness)
export const LotusIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A8E063" />
        <stop offset="100%" stopColor="#56AB2F" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="18" fill="url(#lotusGradient)"/>
    <path d="M20 28 C18 28 12 26 12 22 C12 20 13 19 14 19 C15 19 16 20 17 21 C17 18 17 15 20 12 C23 15 23 18 23 21 C24 20 25 19 26 19 C27 19 28 20 28 22 C28 26 22 28 20 28 Z" fill="#ffffff"/>
    <ellipse cx="20" cy="22" rx="3" ry="2" fill="#A8E063"/>
  </svg>
);
