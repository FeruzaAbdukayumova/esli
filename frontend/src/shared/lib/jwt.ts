/**
 * JWT helper functions
 * Note: For production, consider using a library like jwt-decode
 * This is a simple implementation for basic token validation
 */

export const jwt = {
  /**
   * Decode JWT token (without verification)
   * Returns null if token is invalid
   */
  decode(token: string): { exp?: number; [key: string]: unknown } | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null

      const payload = parts[1]
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
      return decoded
    } catch {
      return null
    }
  },

  /**
   * Check if token is expired
   */
  isExpired(token: string): boolean {
    const decoded = this.decode(token)
    if (!decoded || !decoded.exp) return true

    const exp = decoded.exp * 1000 // Convert to milliseconds
    return Date.now() >= exp
  },

  /**
   * Check if token is valid (not expired)
   */
  isValid(token: string): boolean {
    return !this.isExpired(token)
  },
}
