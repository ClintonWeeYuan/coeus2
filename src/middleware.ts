import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Session } from './actions/session'
import { decrypt } from './utils/encryption'

const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  if (session?.value) {
    try {
      const decrypted = await decrypt(session.value, 'pw')
      const sessionData = JSON.parse(decrypted) as Session
      if (sessionData && Date.now() - sessionData.dateOfCreation < twoWeeks) {
        return
      } else {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    } catch (e) {
      console.log(e)
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
  matcher: [
    '/schedule/:path*',
    '/dashboard/:path*',
    '/homework/:path',
    '/knowledgebase/:path',
  ],
}
