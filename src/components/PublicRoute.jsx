'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import useAuth from '../hooks/useAuth'

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth()
  const router = useRouter()

  if (isLoggedIn) {
    router.push('/home')

    return null
  }

  return <>{children}</>
}
