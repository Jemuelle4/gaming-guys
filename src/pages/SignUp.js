import { useState } from 'react'
import {useSignup} from '../hooks/useSignup'
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password)
  }
  
  return (
    <div>
      <h2>Account Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Email Address</h3>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button>sign up</button>
        <p>Already have an account? <Link to ="/">Log In</Link></p>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
