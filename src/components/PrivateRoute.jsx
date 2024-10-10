'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import useAuth from '../hooks/useAuth'

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth()
  const router = useRouter()

  if (!isLoggedIn) {
    router.push('/login')

    return null
  }

  return <>{children}</>
}
