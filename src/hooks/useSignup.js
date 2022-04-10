import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword} from 'firebase/auth'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()


    const signup = (email, password, displayName) => {
        setError(null)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                res.user.updateProfile( { displayName})
                dispatch({ type: 'LOGIN', payload: res.user})
                console.log('user signed up:', res.user)
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, signup }
}