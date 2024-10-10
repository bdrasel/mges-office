import { useSelector } from 'react-redux'

const useAuth = () => {
  const auth = useSelector(state => state.auth)

  if (auth?.accessToken) {
    return true
  }

  return false
}

export default useAuth
