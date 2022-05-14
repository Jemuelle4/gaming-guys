import React from 'react';
import Navbar from '../components/navbar'
import InGameComponent from '../components/InGameComponent'
import CommuncationComponent from '../components/CommunicationComponent'
import RoleComponent from '../components/RoleComponent'
import { useState } from 'react';


const About = () =>{
    const [mode, setMode] = useState()
    const handleClick = (e) =>{
        console.log(e.target.value)
        setMode(e.target.value)
   }
   const component = () => {
       if(mode === 'ingame'){
           return <InGameComponent/>
       } else if(mode === 'communication') {
           return <CommuncationComponent/>
       } else if(mode === 'role'){
           return <RoleComponent/>
       }
   }

  return (
    <div style={{marginTop: '100px'}}>
      <Navbar />
      <button value="ingame" onClick={handleClick}>In Game Information</button>
      <button value="communication" onClick={handleClick}>Communication</button>
      <button value="role" onClick={handleClick}>Role / Profile Image</button>
      {component()}
    </div>
  );
}
export default About;