import { useSelector } from 'react-redux'

const useAuth = () => {
  // const auth = useSelector(state => state.auth)

  const auth = JSON.parse(localStorage.getItem('auth'))

  if (auth?.accessToken) {
    console.log(auth?.accessToken)

    return true
  }

  return false
}

export default useAuth
