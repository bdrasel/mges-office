'use client'

import React from 'react'

import { useParams, useRouter } from 'next/navigation'

import useAuth from '../hooks/useAuth'

export default function PrivateRoute({ children }) {
  const params = useParams()

  const { lang: locale } = params

  const isLoggedIn = useAuth()
  const router = useRouter()

  if (!isLoggedIn) {
    router.push(`/${locale}/login`)

    return null
  }

  return <>{children}</>
}
