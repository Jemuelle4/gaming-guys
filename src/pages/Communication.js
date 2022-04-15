import { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import poster from '../poster.png'
import { doc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"

export default function Communication() {
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
    history.push('/')
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
                type="text"
                onChange={e => setSummonerName(e.target.value)}
                value={summonerName}
                />
            </label>
            <label>
                <h3>Instagram</h3>
                <input
                type="text"
                onChange={e => setInstagram(e.target.value)}
                value={instagram}
                />
            </label>
            <label>
                <h3>Discord</h3>
                <input
                type="text"
                onChange={e => setDiscord(e.target.value)}
                value={discord}
                />
            </label>
            <label>
                <h3>Facebook</h3>
                <input
                type="text"
                onChange={e => setFacebook(e.target.value)}
                value={facebook}
                />
            </label>
            <label>
                <h3>Snapchat</h3>
                <input
                type="text"
                onChange={e => setSnapchat(e.target.value)}
                value={snapchat}
                />
            </label>
            <label>
                <h3>Telegram</h3>
                <input
                type="text"
                onChange={e => setTelegram(e.target.value)}
                value={telegram}
                />
            </label>
            <label>
                <h3>About You</h3>
                <input
                type="text"
                onChange={e => setAboutYou(e.target.value)}
                value={aboutYou}
                />
            </label>
            <button>Finish Creating Profile</button>
        </form>
      </div>
    </div>
  )
}
