import { useHistory } from "react-router-dom";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

export default function Role() {
  const { ...state } = useAuthContext()
  const [role, setRole] = useState();
  const history = useHistory()
 
  const handleClick = (e) => {
      e.preventDefault()
      console.log(e.target.value)
      setRole(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = doc(db, "users", state.user.uid)
    updateDoc(ref,{
       role: role
    })
    history.push('/')
  }

  return (
    <div className="role-container">
        <h2>You are a...</h2>
        <form onSubmit={handleSubmit}>
            <button value="Coach" onClick={handleClick}>Coach</button>
            <button value="Learner"onClick={handleClick}>Learner</button>
            <button value="Teammate" onClick={handleClick}>Teammate</button>
            <button type="submit">next</button>
        </form>
    </div>
  )
}