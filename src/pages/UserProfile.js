import React from 'react';
import Navbar from '../components/navbar'
const About = () =>{
  return (
    <div style={{marginTop: '100px'}}>
      <Navbar />
      <h1>Profile</h1>
      <div>
        <h3 class="text-primary">This is the Profile page</h3>
      </div>
    </div>
  );
}
export default About;