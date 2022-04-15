import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link, useHistory } from "react-router-dom";
import poster from '../poster.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)
    history.push('/')
  }
  
  return (
    <div className='container'>
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>Welcome</h2>
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
          <button>Log In</button>
          {error && <p>{error}</p>}
        </form>
        <p>Don't have an account? <Link to ="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}
