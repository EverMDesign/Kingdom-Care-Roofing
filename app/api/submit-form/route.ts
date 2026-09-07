import { NextResponse } from 'next/server'
import GHLClient from '@/lib/ghl-client'

// Custom field keys → must exist in GHL → Settings → Custom Fields
const fieldMappings: Record<string, Record<string, string>> = {
  hero: {
    service: 'service_interest',
  },
  estimate: {
    service: 'service_interest',
    message: 'project_message',
  },
}

const formTags: Record<string, string[]> = {
  hero: ['website-lead', 'hero-form'],
  estimate: ['website-lead', 'estimate-request'],
}

export async function POST(request: Request) {
  try {
    let formData: Record<string, string>
    try {
      formData = await request.json()
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
    }

    const formType = formData.form_type || 'estimate'
    const mapping = fieldMappings[formType] || {}
    const tags = formTags[formType] || ['website-lead']

    const fullName = formData.name || ''
    const [firstName, ...lastNameParts] = fullName.trim().split(' ')
    const lastName = lastNameParts.join(' ') || 'Lead'

    const customFields: Record<string, string | number | boolean> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (['form_type', 'name', 'email', 'phone'].includes(key)) return
      if (!value) return
      customFields[mapping[key] || key] = value
    })

    let ghlClient: GHLClient
    try {
      ghlClient = new GHLClient()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to initialize GHL client'
      return NextResponse.json({ success: false, error: msg }, { status: 500 })
    }

    const result = await ghlClient.submitContact({
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      tags,
      customFields,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, contactId: result.contactId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
