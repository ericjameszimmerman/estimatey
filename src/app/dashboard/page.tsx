import Dashboard from '@/components/ui/Dashboard'
import {db } from '@/db'
import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

const Page = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    })
  }

  const user = session.user

  if (!user || !user.email) {
    console.log('no user')
  }
  else {
    console.log(user.email)
  }

  return <Dashboard />
}

export default Page
