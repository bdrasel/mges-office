'use client'

import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { userLoggedIn } from '../lib/features/auth/authApiSlice'

export default function useAuthCheck() {
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem('auth')

    if (authToken) {
      const auth = JSON.parse(authToken)

      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user
          })
        )
      }
    }

    setAuthChecked(true)
  }, [dispatch])

  return authChecked
}
