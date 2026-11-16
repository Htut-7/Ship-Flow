"use client";

import React from 'react'
import { signOut } from 'next-auth/react';
import ROUTES from '@/ROUTES';

function Logout() {
  return (
    <div>
        <button type='button' onClick={()=>signOut({callbackUrl: ROUTES.LOGIN})}>Logout</button>
    </div>
  )
}

export default Logout