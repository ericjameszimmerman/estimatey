import { db } from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { createDefaultUser } from "@/services/authService"

export async function GET(request: Request) {
  createDefaultUser()
}
