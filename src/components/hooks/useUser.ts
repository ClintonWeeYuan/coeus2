import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { decrypt } from '@/utils/encryption'
import { Session } from '@/actions/session'

const loggedOutUser = { id: -1, dateOfCreation: 0 }

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const router = useRouter()

  const [user, setUser] = useState(loggedOutUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const session = Cookies.get('session')

    if (!session) {
      router.replace('/auth/login') // If no token is found, redirect to login page
      return
    }

    // Validate the token by making an API call
    const runValidation = async () => {
      try {
        const decrypted = await decrypt(session, 'pw')

        if (!decrypted) {
          setUser(loggedOutUser)
        } else {
          const { userId, dateOfCreation } = JSON.parse(decrypted) as Session
          setUser({ id: userId, dateOfCreation })
        }
      } catch (error) {
        setUser(loggedOutUser)
        router.replace('/auth/login') // Redirect to login if token validation fails
      }
    }

    runValidation()
    setLoading(false)
  }, [router])

  return { user, loading }
}

export default useUser
