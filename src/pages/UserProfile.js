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
      <div style={{display:'flex'}}>
        <div style={{display:'block'}}>
            <button style={{display:'block'}} value="ingame" onClick={handleClick}>In Game Information</button>
            <button style={{display:'block'}} value="communication" onClick={handleClick}>Communication</button>
            <button style={{display:'block'}} value="role" onClick={handleClick}>Role / Profile Image</button>
        </div>
        <div style={{display:'block', width:'50%'}}>
            {component()}
        </div>
      </div>
    </div>
  );
}
export default About;