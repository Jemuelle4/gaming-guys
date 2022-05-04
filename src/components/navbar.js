import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'
import { useLogout } from '../hooks/useLogout'
import "../css/navbar.css";



export default function Nav(){
  const { logout } = useLogout()

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
            <Button className='rounded-circle'>
              <AddFriend />
            </Button>
          </li>
      </ul>
    </Navbar>
  );
}