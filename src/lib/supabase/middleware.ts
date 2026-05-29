import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin-session')
    if (sessionCookie?.value !== 'authenticated') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next({ request })
}
