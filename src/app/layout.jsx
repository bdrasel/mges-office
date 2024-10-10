'use client'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import { Provider } from 'react-redux'

import { store } from '../lib/store'

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Provider store={store}>
      <html id='__next' lang='en' dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
      </html>
    </Provider>
  )
}

export default RootLayout
