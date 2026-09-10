export function validatePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  const normalized = digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits
  if (normalized.length !== 10) return 'Enter a valid 10-digit phone number'
  if (normalized[0] === '0' || normalized[0] === '1') return 'Enter a valid area code'
  return null
}

export function validateAddress(raw: string): string | null {
  if (!raw.trim()) return null
  if (raw.trim().length < 5) return 'Enter a valid address'
  if (!/\d/.test(raw)) return 'Address should include a street number'
  if (!/\s/.test(raw.trim())) return 'Enter a valid address'
  return null
}

export function validateEmail(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Enter a valid email address'
  }
  return null
}
