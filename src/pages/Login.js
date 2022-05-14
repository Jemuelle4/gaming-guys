import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link, useHistory } from "react-router-dom";
import poster from '../poster.png'
import "../css/login-creation.css";


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password).then(() =>{
      if(!error){
        history.push('/')
      }
    })
  }
  
  return (
    <div className='flex-container'>
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h1>Welcome</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-margin">
          <label> Email Address </label>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          
          </div>
         <div className="form-margin">
          <label> Password </label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
         </div>
         
          <button className=" button button-primary form-margin">Log In</button>
          {error && <p>{error}</p>}
        </form>
        <p>Don't have an account? <Link to ="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}
