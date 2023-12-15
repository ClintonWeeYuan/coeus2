'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Cookies from 'js-cookie'

const LogoutButton = () => {
  const router = useRouter()
  const logOut = () => {
    Cookies.remove('token')
    router.push('/auth/login')
  }

  return <Button onClick={logOut}>Sign Out</Button>
}

export default LogoutButton
