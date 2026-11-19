import React from 'react'
import UpdateProfile from '../../components/UpdateProfile'
import Navbar from '@/components/Navbar'

function page() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <Navbar/>
      </header>
        <UpdateProfile/>
    </div>
  )
}

export default page