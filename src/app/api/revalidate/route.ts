import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const token  = request.headers.get('x-revalidate-token');
    const secret = process.env.REVALIDATE_SECRET;

    if (!token || token !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { city, slug } = body;

    if (!city || !slug) {
      return NextResponse.json({ error: 'Missing city or slug' }, { status: 400 });
    }

    revalidatePath(`/${city}/${slug}`);
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      path: `/${city}/${slug}`,
    });
  } catch (err) {
    console.error('[WorkPress] Revalidation error:', err);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
