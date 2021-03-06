import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { db } from '../firebase/config'
import { doc, getDoc} from 'firebase/firestore'
import "../css/navbar.css";
import garen from '../garen.png'

export default function GuddyNavbar(){
  const { logout } = useLogout()
  const { ...state} = useAuthContext()

  const [imgUrl, setImgUrl] = useState()
  const docRef = doc(db, "users", state.user.uid);
  getDoc(docRef)
  .then((docSnap) =>{
    setImgUrl(docSnap.data().imgSrc)
  }).catch(function(err) {
    console.log(err)
    setImgUrl('')
  })

  return (
    <Navbar fixed='top' collapseOnSelect expand='md' className="navbar-expand-md">
      <Navbar.Toggle color='white' aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <div className='navcontainer home'>
            <NavLink className='navlink' exact to='/' activeClassName="active"
              isActive={(match, location) => {return location.pathname === '/landingpage' || location.pathname === '/';}}>
                Home
              </NavLink>
          </div>
          <div className='navcontainer'><NavLink className='navlink' exact to='/connections' activeClassName="active">Connections</NavLink></div>
          <div className='navcontainer'><NavLink className='navlink' exact to='/about' activeClassName="active">About</NavLink></div>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <NavDropdown align={'end'}
        title={<Image roundedCircle src={imgUrl? imgUrl : garen} alt="user profile" style={{width: '5vh', height: '5vh', objectFit: 'cover'}}/>}>
          <div className='inside-dropdown'>
            <div className='navcontainer'><NavLink className='navlink' exact to='/profile' activeClassName="active">Edit Profile</NavLink></div>
            <Button className='logoutbutton my-auto' onClick={logout}>Log Out</Button>
          </div>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}