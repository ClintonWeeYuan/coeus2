import '@/app/globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MobileSidebar from '@/components/layout/MobileSidebar'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  //md:w-[calc(100%-384px)] b
  return (
    <div className="flex">
      <Sidebar />
      <MobileSidebar />
      <div className="md:ml-96 min-h-screen border-l-2 border-l-stone-200 bg-white">
        {children}
      </div>
    </div>
  )
}
