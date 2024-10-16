const useAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth'))

  if (auth?.accessToken) {
    return true
  }

  return false
}

export default useAuth
