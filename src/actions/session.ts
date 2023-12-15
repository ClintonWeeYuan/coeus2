import { decrypt, encrypt } from '@/utils/encryption'
import { cookies } from 'next/headers'
export type Session = {
  userId: number
  dateOfCreation: number
}

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = cookies()
  const session = cookieStore.get('session')

  if (session?.value) {
    try {
      const decrypted = await decrypt(session.value, 'pw')
      return JSON.parse(decrypted) as Session
    } catch {
      // Ignore invalid session
    }
  }

  return null
}

export const setSession = async (session: Session) => {
  const cookieStore = cookies()
  const encrypted = await encrypt(JSON.stringify(session), 'pw')
  cookieStore.set('session', encrypted)
}

export const removeSession = async () => {
  const cookieStore = cookies()
  cookieStore.delete('session')
}
