import { useState } from 'react'
import {useSignup} from '../hooks/useSignup'
import { Link } from "react-router-dom";
import poster from '../poster.png'

export default function Communication() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, signup } = useSignup()
  const [displayName, setDisplayName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password)
  }
  
  return (
    <div className="container">
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>Communication</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <h3>Summoner's Name</h3>
                <input
                required
                type="summoner-name"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                />
            </label>
            <label>
                <h3>Instagram</h3>
                <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </label>
            <label>
                <h3>Discord</h3>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            <label>
                <h3>Facebook</h3>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            <label>
                <h3>Snapchat</h3>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            <label>
                <h3>Telegram</h3>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            <label>
                <h3>About You</h3>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            <button>sign up</button>
            <p>Already have an account? <Link to ="/login">Log In</Link></p>
            {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}
