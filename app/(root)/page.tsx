import { auth } from '@/auth'
import React from 'react'

async function page() {

  const session=await auth();
  console.log(session);

  return (
    <div>
      <p>{session?.user?.name}</p>
      <span>{session?.user?.email}</span>
    </div>
  )
}

export default page