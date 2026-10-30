export function validateName(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return 'Name is required'
  if (trimmed.length < 2) return 'Enter your full name'
  return null
}

export function validateRequired(value: string, label: string): string | null {
  if (!value || !value.trim()) return `${label} is required`
  return null
}

export function validatePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  const normalized = digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits
  if (normalized.length !== 10) return 'Enter a valid 10-digit phone number'
  if (normalized[0] === '0' || normalized[0] === '1') return 'Enter a valid area code'
  return null
}

export function validateAddress(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return 'Address is required'
  if (!/\d/.test(trimmed)) return 'Include a street number'
  if (!/[a-zA-Z]/.test(trimmed)) return 'Include a street name'
  const commas = (trimmed.match(/,/g) || []).length
  if (commas < 2) return 'Use format: 123 Main St, City, TX 76036'
  if (!/\b[A-Z]{2}\b/.test(trimmed)) return 'Include a 2-letter state abbreviation (e.g., TX)'
  if (!/\b\d{5}\b/.test(trimmed)) return 'Include a 5-digit ZIP code'
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
