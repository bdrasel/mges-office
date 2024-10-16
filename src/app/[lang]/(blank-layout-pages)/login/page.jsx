// Component Imports
import Login from '@views/Login'
import PublicRoute from '@/components/PublicRoute'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {


  // Vars
  const mode = getServerMode()

  return (
    <PublicRoute>
      <Login mode={mode} />
    </PublicRoute>
  )
}

export default LoginPage
