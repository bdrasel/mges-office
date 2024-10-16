'use client'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import { Provider } from 'react-redux'

import { store } from '@/lib/store'

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <Provider store={store}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
      </Provider>
    </html>
  )
}

export default RootLayout
