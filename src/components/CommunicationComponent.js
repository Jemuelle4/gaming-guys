import { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import poster from '../poster.png'
import { doc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import "../css/login-creation.css";

export default function Communication(props) {
  const { ...state } = useAuthContext()
  const [summonerName, setSummonerName] = useState('')
  const [instagram, setInstagram] = useState('')
  const [discord, setDiscord] = useState('')
  const [facebook, setFacebook] = useState('')
  const [snapchat, setSnapchat] = useState('')
  const [telegram, setTelegram] = useState('')
  const [aboutYou, setAboutYou] = useState('')
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = doc(db, "users", state.user.uid)
    updateDoc(ref,{
       summoner_name: summonerName,
       instagram: instagram,
       discord: discord,
       facebook: facebook,
       snapchat: snapchat,
       telegram: telegram,
       aboutYou: aboutYou
    })
    if(props.mode == 'page'){
      history.push('/role')
   }
  }
  
  return (
    <div className="flex-container">
      {props.mode === "page"? (
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      ):('')}
      <div className='login-container'>
        <h2>Communication</h2>
        <form id="communication-form" onSubmit={handleSubmit}>
          <div className="grid-container"> 
            <div className="grid-1 form-margin">
              <label> Summoner's Name </label>     
              <input
              required
              type="text"
              onChange={e => setSummonerName(e.target.value)}
              value={summonerName}
              /> 
            </div>
            <div className="grid-2 form-margin">
              <label>Instagram</label>   
                <input
                type="text"
                onChange={e => setInstagram(e.target.value)}
                value={instagram}
                />
            </div>
             
            <div className="grid-3 form-margin">
              <label> Discord </label>     
              <input
              type="text"
              onChange={e => setDiscord(e.target.value)}
              value={discord}
              />
            </div>
            <div className="grid-4 form-margin"> 
              <label>Facebook</label>
              <input
              type="text"
              onChange={e => setFacebook(e.target.value)}
              value={facebook}
              />
            </div>
            <div className="grid-5 form-margin">
              <label>Snapchat</label>
              <input
              type="text"
              onChange={e => setSnapchat(e.target.value)}
              value={snapchat}
              />
            </div>
            <div className="grid-6 form-margin">
              <label>Telegram</label>
              <input
              type="text"
              onChange={e => setTelegram(e.target.value)}
              value={telegram}
              />
            </div>  
            <div className="grid-7 form-margin">
             <label>About You</label>
              <input
              type="textarea"
              id="about-you"
              onChange={e => setAboutYou(e.target.value)}
              value={aboutYou}
              /> 
            </div>
            {props.mode === "page"? (
                <div className="form-margin creation-button">
                  <button form='communication-form' type="submit" className="button button-primary form-margin">
                  Create Profile</button>
                </div>
            ):(
              <div className="form-margin creation-button">
              <button form='communication-form' type="submit" className="button button-primary form-margin">
              Edit Profile</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}