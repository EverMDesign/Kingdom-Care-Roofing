import { NextResponse } from 'next/server'
import { getProject } from '@/lib/workpress-api'
import { citySlug } from '@/lib/project-url'

// This route previously served the project detail page directly. Project
// pages now live at /[city]/[slug] to match WORKPRESS_STANDARDS.md — this
// permanently (308) redirects old, already-indexed /projects/{slug} links
// instead of letting them 404. A route handler (not a page) so the status
// code is explicit — next/navigation's redirect() only issues a temporary
// 307, which doesn't pass SEO link equity the way a permanent redirect does.
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return new NextResponse('Not found', { status: 404 })

  return NextResponse.redirect(
    new URL(`/${citySlug(project.address.city)}/${slug}`, request.url),
    308
  )
}
