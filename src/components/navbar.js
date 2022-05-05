import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { db } from '../firebase/config'
import { doc, getDoc} from 'firebase/firestore'
import "../css/navbar.css";



export default function Nav(){
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
    <Navbar collapseOnSelect expand='md' className="navbar navbar-expand-sm bg-dark sticky-top d-flex justify-content-between">
      <Navbar.Toggle color='white' aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/connections">Connections</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <button onClick={logout}>Log Out</button>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/ingame">In-Game Info</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/communication">Communication</Link>
        </li> */}
      </ul>
      </Navbar.Collapse>
      <ul className='navbar-nav'>
        <span className='my-2'>
          <h5>Hello User</h5>
        </span>
          <li className="nav-item my-1">
            <Button>
              <img src={imgUrl} alt="user profile" style={{width: '5vh', objectFit: 'cover'}}></img>
            </Button>
          </li>
      </ul>
    </Navbar>
  );
}