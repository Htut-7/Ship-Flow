import Navbar from '@/components/Navbar'
import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import CustomerTable from '@/components/CustomerTable'

function page() {
  return (
    <div className="min-h-screen bg-gray-50">
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Navbar />
    </header>

    <div className="flex min-h-[calc(100vh-73px)]">
      <AdminSidebar />

      <main className='min-w-0 flex-1 px-4 py-6 md:px-6 lg:px-8'>
            <CustomerTable/>
      </main>
    </div>
  </div>
  )
}

export default page