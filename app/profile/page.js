"use client"

import { context } from '@/Components/Clients';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';


function Page() {
    const {user}=useContext(context);
    if(!user._id) redirect("/login");
  return (
    <div style={{height:"90vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <h1>Welcome- {user.name}</h1>
    </div>
  )
}

export default Page
