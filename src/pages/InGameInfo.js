import { Link, useHistory } from "react-router-dom";
import poster from '../poster.png'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react";
import "../css/login-creation.css";

export default function InGameInfo() {
  const { ...state } = useAuthContext()
  const [champData, setChampData] = useState([]);
  const [rank, setRank] = useState()
  const [firstRole, setFirstRole] = useState();
  const [secondRole, setSecondRole] = useState();
  const [favChamp, setFavChamp] = useState();
  const history = useHistory()
  useEffect(()=>{
    getChampionName()
  }, [])

  const getChampionName = async () => {
    try {
      let response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
      let responseJson = await response.json();
      const champArray = Object.keys(responseJson.data)
      setChampData(champArray)
     } catch(error) {
       console.log(error)
    }
  }
  const handleRank = (e) => {
    setRank(e.target.value)
  }
  const handleFirstRole = (e) => {
    setFirstRole(e.target.value)
  }

  const handleSecondRole = (e) => {
    setSecondRole(e.target.value)
  }

  const handleChamp = (e) => {
    setFavChamp(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state.user.uid)
    const ref = doc(db, "users", state.user.uid)
    console.log(firstRole, favChamp)
    updateDoc(ref,{
       rank: rank,
       fav_role: [firstRole, secondRole],
       fav_champ: favChamp
    })
    history.push('/communication')
  }

  return (
    <div className="flex-container">
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>In-Game Information</h2>
        <form onSubmit={handleSubmit}>
            <p>Your Rank</p>
            <select onChange={handleRank}>
              <option disabled selected value> Select </option>
              <option key="Unranked">Unranked</option>
              <option key="Iron">Iron</option>
              <option key="Bronze">Bronze</option>
              <option key="Silver">Silver</option>
              <option key="Gold">Gold</option>
              <option key="Platinum">Platinum</option>
              <option key="Diamond">Diamond</option>
              <option key="Master">Master</option>
              <option key="GrandMaster">GrandMaster</option>
              <option key="Challenger">Challenger</option>
            </select>
            <p>Your Main Role</p>
            <select onChange={handleFirstRole}>
              <option disabled selected value> Select </option>
              <option key="Top">Top</option>
              <option key="Jungle">Jungle</option>
              <option key="Mid">Mid</option>
              <option key="Bot">Bot</option>
              <option key="Support">Support</option>
            </select>
            <p>Your Secondary Role</p>
            <select onChange={handleSecondRole}>
              <option disabled selected value> Select </option>
              <option key="Top">Top</option>
              <option key="Jungle">Jungle</option>
              <option key="Mid">Mid</option>
              <option key="Bot">Bot</option>
              <option key="Support">Support</option>
            </select>
            <p>Favorite Champ</p>
            <select onChange={handleChamp}>
              {champData.map((name) =>
              <option key={name}>{name}</option>)}
              <option disabled selected value> Select </option>
            </select>
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
