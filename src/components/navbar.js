import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'


const navbar= () =>{
  return (
    <nav className="navbar navbar-expand-sm bg-light sticky-top d-flex justify-content-between">
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
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ingame">In-Game Info</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/communication">Communication</Link>
        </li>
      </ul>
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
    </nav>
  );
}
export default navbar;