import { auth } from '@/auth';
import React from 'react'

async function page() {

    const session=await auth();

  return (
    <div>
        <h2>{session?.user?.name}</h2>
    </div>
  )
}

export default page