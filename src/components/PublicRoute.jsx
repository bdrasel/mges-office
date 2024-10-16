'use client'

import React from 'react'

import { useParams, useRouter } from 'next/navigation'

import useAuth from '../hooks/useAuth'

export default function PublicRoute({ children }) {
  const params = useParams()

  const { lang: locale } = params

  const isLoggedIn = useAuth()
  const router = useRouter()

  if (isLoggedIn) {
    router.push(`/${locale}/home`)

    return null
  }

  return <>{children}</>
}
