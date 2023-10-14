'use client'

import { signIn, signOut } from 'next-auth/react'
import { buttonVariants } from './ui/button'

export const LoginButton = () => {
  return <button className={buttonVariants({
    variant: 'ghost',
    size: 'sm',
  })} onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className={buttonVariants({
    variant: 'ghost',
    size: 'sm',
  })} onClick={() => signOut()}>Sign Out</button>
}
