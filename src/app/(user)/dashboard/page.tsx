"use client"

import useUser from "@/components/hooks/useUser";
import LoadingPage from "@/components/ui/loading-page";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useUser({})

  const router = useRouter()
  const logOut = () => {
    Cookies.remove("token")
    router.push("/auth/login")
  }

  if(loading){
    return <LoadingPage/>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Dashboard</div>
      <Button onClick={logOut}>Sign Out</Button>
    </main>
  )
}
