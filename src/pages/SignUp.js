import { useState } from 'react'
import {useSignup} from '../hooks/useSignup'
import { Link, Redirect} from "react-router-dom";
import poster from '../poster.png'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { error, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password,displayName)
    {!error && <Redirect to="/communicaton"></Redirect>}
  }
  
  return (
    <div className="container">
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>Account Information</h2>
        <form onSubmit={handleSubmit}>
        <label>
            <h3>Name</h3>
            <input
              required
              type="name"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
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
          <button type="submit">sign up</button>
          <p>Already have an account? <Link to ="/login">Log In</Link></p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}
