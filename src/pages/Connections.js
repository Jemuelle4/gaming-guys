import React, {useState} from 'react'
import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap'
import Navbar from '../components/navbar'
import { useCollection } from '../hooks/useCollection'
import SelectedConnection from '../components/SelectedConnection'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import AcceptedConnection from '../components/AcceptedConnection'

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
      return (receivedBy.map((receivedID) => {
        let receivedUser = users.find(user => user.id === receivedID)
        return (
          <Row className='p-2' key={uid}>
            {getConnection(receivedUser)}
          </Row>
        )
      }))
    }
  }
  
  function getConnection(user) {
    if(user) {
      return(
          <Card className='bg-dark'>
            <Row>
              <Col><Card.Title>{user.displayName}</Card.Title></Col>
              <Col><Card.Body>{user.rank}/{user.role}</Card.Body></Col>
              <Col><Button variant='success' onClick={e => handleAccept(e, user.id)}>Accept</Button></Col>
              <Col><Button variant='danger' onClick={e => handleDecline(e, user.id)}>Decline</Button></Col>
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
        <Row className='m-0'>
          <Col className='col-3'>
            <h1>Connection Requests</h1>
            <CardGroup>
              {mapConnectionRequests(currentUser.receivedBy)}
            </CardGroup>
          </Col>
          <Col className='col-6'>
            <h1>Connections</h1>
            {currentUser.connections.map(connectionID => (
              <AcceptedConnection uid={connectionID} setSelectedUser={setSelectedUser}/>
            ))}
          </Col>
          <Col className='col-3'>
            <SelectedConnection user={selectedUser} currentUserID={currentUser.id}/>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Connections;