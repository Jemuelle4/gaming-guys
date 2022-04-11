import { Link } from "react-router-dom";
import poster from '../poster.png'

export default function InGameInfo() {

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

  const handleSubmit = (e) => {
    e.preventDefault()
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
                <input type="radio" value="Top"/>Top
                <input type="radio" value="Top"/>Mid
                <input type="radio" value="Top"/>Jungle
                <input type="radio" value="Top"/>Bot
                <input type="radio" value="Top"/>Support
            </label>
            <div>{getChampionName}</div>
            <select>
                <option value="Top">Top</option>
                <option value="Mid">Mid</option>
                <option value="Bot">Bot</option>
                <option value="Jungle">Jungle</option>
                <option value="Support">Support</option>
            </select>
            <Link className="nav-link" to="/ingame">Next</Link>
        </form>
      </div>
    </div>
  )
}
