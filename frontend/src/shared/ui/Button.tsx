import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  style,
  ...props 
}: ButtonProps) => {
  const baseStyles: CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#2563eb',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#e5e7eb',
      color: '#1f2937',
    },
  }

  const combinedStyle: CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...(props.disabled && {
      opacity: 0.5,
      cursor: 'not-allowed',
    }),
    ...style,
  }

  return (
    <button
      style={combinedStyle}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          e.currentTarget.style.backgroundColor = variant === 'primary' ? '#1d4ed8' : '#d1d5db'
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) {
          e.currentTarget.style.backgroundColor = variant === 'primary' ? '#2563eb' : '#e5e7eb'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}
