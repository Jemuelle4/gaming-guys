import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()

  const { logout } = useLogout()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)
  }
  
  return (
    <div>
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
        <button>log in</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={logout}>log out</button>
      <p>Don't have an account? <Link to ="/signup">Sign up</Link></p>
    </div>
  )
}
