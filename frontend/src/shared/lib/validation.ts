const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  if (!email.trim()) return false
  return EMAIL_REGEX.test(email.trim())
}

type TFunction = (key: string) => string

export function getEmailValidationMessage(email: string, t: TFunction): string | null {
  if (!email.trim()) return t('validation.emailRequired')
  if (!EMAIL_REGEX.test(email.trim())) return t('validation.emailInvalid')
  return null
}

export type PasswordStrength = 'none' | 'weak' | 'fair' | 'good' | 'strong'

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'none'
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const length = password.length
  let score = 0
  if (length >= 8) score += 1
  if (length >= 12) score += 1
  if (hasLower && hasUpper) score += 1
  if (hasNumber) score += 1
  if (hasSpecial) score += 1
  if (score <= 1) return 'weak'
  if (score <= 2) return 'fair'
  if (score <= 4) return 'good'
  return 'strong'
}

export function getPasswordRequirements(t: TFunction) {
  return [
    { id: 'length', label: t('auth.passwordRequirements.minChars'), test: (p: string) => p.length >= 8 },
    { id: 'upper', label: t('auth.passwordRequirements.uppercase'), test: (p: string) => /[A-Z]/.test(p) },
    { id: 'lower', label: t('auth.passwordRequirements.lowercase'), test: (p: string) => /[a-z]/.test(p) },
    { id: 'number', label: t('auth.passwordRequirements.number'), test: (p: string) => /\d/.test(p) },
    { id: 'special', label: t('auth.passwordRequirements.special'), test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ] as const
}
