/**
 * GoHighLevel API Client
 * Submits contacts and form data to the GHL LeadConnector API
 */

interface ContactPayload {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address1?: string
  tags?: string[]
  customFields?: Record<string, string | number | boolean>
}

interface APIResponse {
  success: boolean
  contactId?: string
  error?: string
}

export class GHLClient {
  private pit: string
  private locationId: string
  private apiBase: string

  constructor() {
    this.pit = process.env.PIT_TOKEN || ''
    this.locationId = process.env.LOCATION_ID || ''
    this.apiBase = process.env.GHL_API_BASE || 'https://services.leadconnectorhq.com'

    if (!this.pit || !this.locationId) {
      throw new Error('Missing GHL credentials: PIT_TOKEN and LOCATION_ID must be set in .env.local')
    }
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.pit}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    }
  }

  async submitContact(data: ContactPayload): Promise<APIResponse> {
    try {
      const customFieldsArray = Object.entries(data.customFields || {}).map(([key, value]) => ({
        key,
        value,
      }))

      const payload = {
        locationId: this.locationId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address1: data.address1,
        tags: data.tags || [],
        customFields: customFieldsArray,
      }

      const response = await fetch(`${this.apiBase}/contacts/upsert`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()

      if (!response.ok) {
        let errorData: { message?: string; error?: string } = {}
        try { errorData = JSON.parse(responseText) } catch { /* empty */ }
        throw new Error(errorData.message || errorData.error || `API Error: ${response.status}`)
      }

      const result = JSON.parse(responseText)
      return { success: true, contactId: result.contact?.id }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('GHL API Error:', message)
      return { success: false, error: message }
    }
  }
}

export default GHLClient
