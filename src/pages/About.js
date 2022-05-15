import React from 'react';
import Navbar from '../components/navbar';
import project from "../imgs/projectteam.png";

const About = () =>{
  return (
    <div style={{marginTop: '100px'}}>
      <Navbar />
      <h1>About</h1>
      <div >
      <h4 className="about-description" >Hello, We are the Gaming Guys! 
        This is a capstone project for the iSchool at the University of Washington. 
        We created this product for League of Legends players to find 
        meaningful connections within the community
        and spark new ideas on how to improve in-game skills. </h4>

      <img src= {project} className="center" />
        

        
      </div>
    </div>
  );
}
export default About;