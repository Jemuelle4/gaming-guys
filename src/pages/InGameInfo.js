import { Link } from "react-router-dom";
import poster from '../poster.png'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

export default function InGameInfo() {
  const { ...state } = useAuthContext()
  const [champ, setChamp] = useState('')
  async function getChampionName() {
    try {
      let response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson.name;
     } catch(error) {
      console.error(error);
    }
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setChamp(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(...state.user.uid)
    const ref = doc(db, 'users', ...state.user.uid)
    setDoc(ref,{
      fav_champ: champ
    })
    console.log(champ)
  }
  
  return (
    <div className="container">
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>In-Game Information</h2>
        <form onSubmit={handleSubmit}>
            <label> Favorite Role
                <input type="radio" value="Top" onChange={handleChange}/>Top
                <input type="radio" value="Mid" onChange={handleChange}/>Mid
                <input type="radio" value="Jungle" onChange={handleChange}/>Jungle
                <input type="radio" value="Bot" onChange={handleChange}/>Bot
                <input type="radio" value="Support" onChange={handleChange}/>Support
            </label>
            <div>{getChampionName}</div>
            <select>
                <option value="Top">Top</option>
                <option value="Mid">Mid</option>
                <option value="Bot">Bot</option>
                <option value="Jungle">Jungle</option>
                <option value="Support">Support</option>
            </select>
            <button type="submit">Submit</button>
            <Link className="nav-link" to="/communication">Next</Link>
            
        </form>
      </div>
    </div>
  )
}
