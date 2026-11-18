import { auth } from '@/auth'
import ROUTES from '@/ROUTES';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {

    const session=await auth();

    if(!session?.user?.email){
        throw new Error("Unauthorized");
        redirect(ROUTES.LOGIN);
    }

    
  return (
    <div>
        <h2>Admin</h2>
        {session.user.name}
        {session.user.email}
        
    </div>
  )
}

export default page