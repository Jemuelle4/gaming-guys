import React, {useState} from 'react'
import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap'
import Navbar from '../components/navbar'
import { useCollection } from '../hooks/useCollection'
import SelectedConnection from '../components/SelectedConnection'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import AcceptedConnection from '../components/AcceptedConnection'
import "../css/components.css";

const Connections = ({uid}) =>{
  const { documents: users } = useCollection('users')
  const { ...state} = useAuthContext()
  let [selectedUser, setSelectedUser] = useState()
  

  function handleAccept(e, uid) {
    e.preventDefault()
    const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1, {
      receivedBy: arrayRemove(uid),
      connections: arrayUnion(uid)
    })
    const ref2 = doc(db, "users", uid) 
    updateDoc(ref2, {
      requestedTo: arrayRemove(state.user.uid),
      connections: arrayUnion(state.user.uid)
    })
  }

  function handleDecline(e, uid) {
    e.preventDefault()
    const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1, {
      receivedBy: arrayRemove(uid)
    })
    const ref2 = doc(db, "users", uid) 
    updateDoc(ref2, {
      requestedTo: arrayRemove(state.user.uid)
    })
  }

  function mapConnectionRequests(receivedBy) {
    if(receivedBy) {
      return (
        <Col className='col-12 col-md-3'>
          <h1>Connection Requests</h1>
          <CardGroup>
            {receivedBy.map((receivedID) => {
              let receivedUser = users.find(user => user.id === receivedID)
              return (
                <Row className='m-0'>
                  {getConnection(receivedUser)}
                </Row>
              )
            })}
          </CardGroup>
        </Col>
      )
    }
  }

  function mapConnections(connections) {
    if(connections) {
      return connections.map((connectionID) => {
        return <AcceptedConnection uid={connectionID} setSelectedUser={setSelectedUser}/>
      })
    } else {
      return <h4>No connections! Go send requests to make new connections!</h4>
    }
  }
  
  function getConnection(user) {
    if(user) {
      return(
        <Card className='request-connection m-1'>
          <Row className='m-1'>
            <Col>
              <Card.Title className='title'>{user.displayName}</Card.Title>
              <Card.Text className='text'>{user.role}</Card.Text>
            </Col>
            <Col>
              {getEmblem(user.rank)}
              <Card.Text className='text'>{user.rank}</Card.Text>
            </Col>
            <Col>
              {getRoleIcon(user.rank, user.fav_role[0])}
              <Card.Text className='text'>{user.fav_role[0]}</Card.Text>
            </Col>
            <Col>
              {getRoleIcon(user.rank, user.fav_role[1])}
              <Card.Text className='text'>{user.fav_role[1]}</Card.Text>
            </Col >
            <Col className='col-2 btn-container'><Button className='accept' onClick={e => handleAccept(e, user.id)}>Accept</Button></Col>
            <Col className='col-2 btn-container'><Button className='decline' onClick={e => handleDecline(e, user.id)}>Decline</Button></Col>
          </Row>
        </Card>
      )
    }
  }

  if(users) {
    const currentUser = users.find(user => user.id === uid)
    return (
      <div style={{marginTop: '100px'}}>
        <Navbar/>
        <Row className='m-1'>
          {mapConnectionRequests(currentUser.receivedBy)}
          <Col xs>
            <h1>Connections</h1>
            <CardGroup>
              {mapConnections(currentUser.connections)}
            </CardGroup>
          </Col>
          <Col className='col-12 col-md-3'>
            <SelectedConnection user={selectedUser} currentUserID={currentUser.id}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function getEmblem(rank) {
  return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}

function getRoleIcon(rank, role) {
  return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default Connections;