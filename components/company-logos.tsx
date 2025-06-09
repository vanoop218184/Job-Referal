"use client"

interface CompanyLogoProps {
  name: string
  className?: string
}

export function GoogleLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function MicrosoftLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  )
}

export function AmazonLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.83.615-3.264 0-6.32-.665-9.168-1.995-.525-.244-1.006-.51-1.44-.795-.36-.236-.45-.45-.27-.705l.22-.39z"
        fill="#FF9900"
      />
      <path
        d="M20.996 15.673c-.225-.36-.59-.53-1.096-.51-.506.02-.96.21-1.36.57-.225.203-.42.45-.585.742-.165.293-.285.6-.36.923-.075.322-.105.645-.09.968.016.323.076.63.18.923.226.63.585 1.11 1.08 1.44.494.33 1.05.495 1.665.495.405 0 .795-.06 1.17-.18.375-.12.72-.285 1.035-.495.226-.15.36-.33.405-.54.045-.21-.015-.39-.18-.54-.165-.15-.375-.225-.63-.225-.255 0-.51.075-.765.225-.255.15-.48.33-.675.54-.195.21-.33.45-.405.72-.075.27-.075.54 0 .81.075.27.195.51.36.72.165.21.375.375.63.495.255.12.54.18.855.18.315 0 .615-.06.9-.18.285-.12.54-.285.765-.495.225-.21.405-.45.54-.72.135-.27.225-.555.27-.855.045-.3.045-.6 0-.9-.045-.3-.135-.585-.27-.855-.135-.27-.315-.51-.54-.72-.225-.21-.48-.375-.765-.495-.285-.12-.585-.18-.9-.18-.315 0-.6.06-.855.18z"
        fill="#FF9900"
      />
    </svg>
  )
}

export function AppleLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        fill="#000000"
      />
    </svg>
  )
}

export function MetaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  )
}

export function CompanyLogo({ name, className }: CompanyLogoProps) {
  const logos = {
    Google: GoogleLogo,
    Microsoft: MicrosoftLogo,
    Amazon: AmazonLogo,
    Apple: AppleLogo,
    Meta: MetaLogo,
  }

  const LogoComponent = logos[name as keyof typeof logos]

  if (!LogoComponent) {
    return (
      <div
        className={`${className} bg-professional-200 rounded flex items-center justify-center text-xs font-bold text-professional-600`}
      >
        {name}
      </div>
    )
  }

  return <LogoComponent className={className} />
}
