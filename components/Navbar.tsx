import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth';
import ROUTES from '@/ROUTES';
import { redirect } from 'next/navigation';

async function Navbar() {

    const session=await auth();

    if(!session?.user?.email){
        redirect(ROUTES.LOGIN);
    }

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <h2 className="text-2xl font-bold tracking-tight text-blue-700">
            Ship-Flow
          </h2>

          <div className="hidden max-w-md flex-1 md:block">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link href={ROUTES.CUSTOMERPROFILE}>
            {session.user.image ? (
                <Image src={session.user.image} alt="profile" height={30} width={30} className='rounded-full object-cover'/> 
            ): (
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold uppercase text-white'>
                    {session.user.name?.charAt(0) || "U"}
                </div>
            )}
            </Link>
          </div>
        </div>
  )
}

export default Navbar