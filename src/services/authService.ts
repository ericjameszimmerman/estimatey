// authService.ts

import {db} from '@/db'
import { hash, compare } from 'bcrypt'

export async function authenticate(credentials) {
  
  if (!credentials?.email || !credentials.password) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      email: credentials.email
    }
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await compare(
    credentials.password,
    user.password
  )

  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id + '',
    email: user.email,
    name: user.name,
    randomKey: 'Hey cool'
  }
}

export async function createDefaultUser() {
  const hashedPassword = await hash(
    'testpassword', 10
  )

  await db.user.create({
    data: {
      id: 'adminid',
      email: 'test@test.com',
      password: hashedPassword,
      name: 'Administrator'
    }
  })
}

