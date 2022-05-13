import React from 'react';
import Navbar from '../components/navbar'
import { Link, Redirect} from "react-router-dom";
import {useSignup} from '../hooks/useSignup'
import "../css/landing-page.css";
import mockup from "../imgs/Mockup.png"
import logo from "../imgs/logo.png"
import team from "../imgs/teammate.png"
import skill from "../imgs/skill.png"
import goal from "../imgs/goal.png"

const LandingPage = () =>{
  const { error, signup } = useSignup()
  var heromessage = "Find Teammates. \n Improve Your Skills."
  return (
    
    <div>
      <div className="logo">
            <img src= {logo} className="logo" />
          </div>
          
      <div className="page">


      <section className="hero">
        <div className="hero-title">
          <div className="hero-container-details">
            <h1 className="hero-message">{heromessage}</h1>
            <Link to ="/signup"><button className="button button-primary">Sign Up</button></Link>
            <p>Already have an account? <Link to ="/login" className="login">Log In</Link></p>
        {error && <p>{error}</p>}
          </div>
          
          <div className="hero-container-image">
            <img src= {mockup} className="hero-image" />
          </div>
         
        </div> 
        
        
      </section>
      </div>
      
      <section className="description-container">
        <div className="description-items">
        <img src= {team} />
          <h2>Find Teammates</h2>
          <p className="text-center">Match with your ideal teammates based on your gameplay, preferences, and interests</p>
        </div>
        
        <div className="description-items">
        <img src= {skill} />
          <h2>Improve Your Skills</h2>
          <p className="text-center">Work with your new teammates to get through the tough challenges and conquer the Rift</p>
        </div>

        <div className="description-items">
        <img src= {goal} />
          <h2>Assign Goals</h2>
          <p className="text-center">Keep track of your progress with assigned goals by your teammates or assign goals to your teammates</p>
        </div>
      </section>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#26C1BA" fill-opacity="1" d="M0,160L80,181.3C160,203,320,245,480,229.3C640,213,800,139,960,96C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  );
}
export default LandingPage;