import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { isAdminUser } from '~/lib/admin'

export async function GET() {
  const user = await currentUser()

  return NextResponse.json({ isAdmin: isAdminUser(user) })
}
