import { createContext, useContext, useState, useEffect } from 'react'
import { auth , createUserWithEmailAndPassword } from "../firebase"

const AuthContext = createContext({
  currentUser: null,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null)

  const value = {
    currentUser
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email,password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup
  }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
