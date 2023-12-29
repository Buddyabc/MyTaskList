import { LogoutBtn } from '@/Components/Clients'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='header'>
      <div>
        <h2>TODO</h2>
      </div>
      <article>
        <Link href={"/"}>HOME</Link>
        <Link href={"/profile"}>PROFILE</Link>
        {/* <Link href={"/login"}>LOGIN</Link> */}
        <LogoutBtn/>
      </article>
    </div>
  )
}

export default Header
