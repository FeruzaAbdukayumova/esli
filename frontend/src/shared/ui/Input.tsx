import { InputHTMLAttributes, CSSProperties } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ 
  label, 
  error, 
  style,
  id,
  ...props 
}: InputProps) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`

  const containerStyle: CSSProperties = {
    marginBottom: '16px',
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '4px',
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    ...style,
  }

  const errorStyle: CSSProperties = {
    marginTop: '4px',
    fontSize: '14px',
    color: '#ef4444',
  }

  return (
    <div style={containerStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6'
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? '#ef4444' : '#d1d5db'
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
      {error && (
        <p style={errorStyle}>{error}</p>
      )}
    </div>
  )
}
