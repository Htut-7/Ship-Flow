import React from 'react'
import UpdateProfile from '../../components/UpdateProfile'
import Navbar from '@/components/Navbar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import ROUTES from '@/ROUTES';

async function page() {

  const session=await auth();

  if(!session?.user?.email){
    redirect(ROUTES.LOGIN);
  }

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <Navbar/>
      </header>
        <UpdateProfile name={session.user.name || ""} email={session.user.email} image={session.user.image || null}/>
    </div>
  )
}

export default page