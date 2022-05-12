import { Link, useHistory } from "react-router-dom";
import poster from '../poster.png'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState, useReducer } from "react";
import "../css/login-creation.css";

function reducer(states, action) {
  switch(action.type){
    case 'add-role':
      return [...states, action.payload.role]
    case 'delete-role':
      let ind = states.indexOf(action.payload.role)
      return states.splice(ind, 1)
    case 'pop-out':
      states.shift()
      return states
  }
}

function reducerStrengths(strengths, action) {
  switch(action.type){

  }
}

function reducerWeaknesses(weaknesses, action) {
  switch(action.type){

  }
}

export default function InGameInfo() {
  const { ...state } = useAuthContext()
  const [champData, setChampData] = useState([]);
  const [rank, setRank] = useState()
  const [states, dispatch] = useReducer(reducer, [])
  const [strengths, dispatchStrengths] = useReducer(reducerStrengths, [])
  const [weaknesses, dispatchWeaknesses] = useReducer(reducerWeaknesses, [])
  const [strength, setStrength] = useState('')
  const [weakness, setWeakness] = useState('')
  const [roleOptions, setRoleOptions] = useState([])
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
  const addStrengths = () => {
    let rows = []

    return <div>
            <label>Strengths</label>
          </div>
  }

  const addWeaknesses = () => {
    return <div>
            <label>Weaknesses</label>
            <input/>
            <button type="button" className="button button-primary form-margin">+</button>
          </div>
  }

  const handleRole = (e) => {
    console.log(2,e.target.value)
    let new_array = roleOptions
    if(new_array.includes(e.target.value)){
      dispatch({ type:'delete-role', payload: {role: e.target.value}})
      let index = new_array.indexOf(e.target.value)
      new_array.splice(index, 1)
    } else {
      dispatch({ type:'add-role', payload: {role: e.target.value}})
      new_array.push(e.target.value)
    }

    if(new_array.length > 2){
      dispatch({ type:'pop-out'})
      new_array.shift()
    }
    setRoleOptions(new_array)
    console.log(1,roleOptions)
  }

  const handleRank = (e) => {
    setRank(e.target.value)
  }

  const handleChamp = (e) => {
    setFavChamp(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = doc(db, "users", state.user.uid)
    try{
      updateDoc(ref,{
        rank: rank,
        fav_role: [states[0], states[1]],
        fav_champ: favChamp
     })
     history.push('/communication')
    } catch(err) {
      alert("Check if you have entered everything")
      console.log(err)
    }
  }
  return (
    <div className="flex-container">
      <div className='poster-container'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='login-container'>
        <h2>In-Game Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="ingame-button">
              <p>Select your two favorite roles</p>
              <button type="button" value={'Top'} style={{backgroundColor: states.includes('Top')? '#26C1BA' : 'transparent'}} onClick={handleRole}>Top</button>
              <button type="button" value={'Jungle'} style={{backgroundColor: states.includes('Jungle')? '#26C1BA' : 'transparent'}} onClick={handleRole}>Jungle</button>
              <button type="button" value={'Mid'} style={{backgroundColor: states.includes('Mid')? '#26C1BA' : 'transparent'}} onClick={handleRole}>Mid</button>
              <button type="button" value={'Bot'} style={{backgroundColor: states.includes('Bot')? '#26C1BA' : 'transparent'}} onClick={handleRole}>Bot</button>
              <button type="button" value={'Support'} style={{backgroundColor: states.includes('Support')? '#26C1BA' : 'transparent'}} onClick={handleRole}>Support</button>
          </div>
          <div id="err"></div>
          <div className="grid-container"> 
            <div>
              <label>Your Rank</label>
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
            </div> 
            <div>
              <label>Favorite Champion</label>
              <select onChange={handleChamp}>
                {champData.map((name) =>
                <option key={name}>{name}</option>)}
                <option disabled selected value> Select </option>
              </select>
            </div>
            {addStrengths()}
            {addWeaknesses()}
            </div>
            <div id="creation-button">
              <button className="button button-primary form-margin" type="submit">Next</button>
            </div>          
        </form>
      </div>
    </div>
  )
}
