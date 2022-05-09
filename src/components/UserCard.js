import React, { useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'
import UserCardModal from './UserCardModal'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import classNames from "classnames"
import poster from '../poster.png'
import "../css/components.css";

const UserCard = ({ user, userKey }) =>{
  const { ...state} = useAuthContext()
  const handleClick = (e) => {
    e.preventDefault()
    setModalShow(false)
    const ref1 = doc(db, "users", state.user.uid)
    updateDoc(ref1,{
      requestedTo: arrayUnion(userKey)
    })
    const ref2 = doc(db, "users", userKey)
    updateDoc(ref2, {
      receivedBy: arrayUnion(state.user.uid)
    })
  }


  const [modalShow, setModalShow] = useState(false);
  if(user){
    let coach = (user.role === 'Coach')
    let learner = (user.role === 'Learner')
    let teammate = (user.role === 'Teammate')
    return (
        <Col className='m-5' style={{ width: '20rem', height: '20rem'}}>
          <Card style={{ cursor:'pointer', width: '20rem', height: '20rem', border:'none'}} onClick={() => setModalShow(true)}>
            <Card.Img style={{ width: '20rem', height: '20rem'}} src={user.imgSrc? user.imgSrc : poster} alt="Card image" />
            <Card.ImgOverlay>
              <div className='d-flex justify-content-end me-3 mt-3'>
                <Button style={{ width: '3rem', height: '3rem'}} className='rounded-circle' onClick={handleClick}>
                  <AddFriend className='icon-friend' />
                </Button>
              </div>
              
              <div className={classNames('information', {coach: coach, learner: learner, teammate: teammate})}>
                <Row className='mb-2 g-0'>
                  <Col xs={6}>
                    <Card.Title className='ms-3'>{user.displayName}</Card.Title>
                  </Col>
                  <Col xs={6} className='d-flex justify-content-end'>
                  <Card.Text className='me-3'>{user.role}</Card.Text>
                  </Col>
                </Row>
                <Row className='g-0'>
                  <Col xs={4} className='d-flex justify-content-center'>
                    {getEmblem(user.rank)}
                  </Col>
                  <Col xs={4} className='d-flex justify-content-center'>
                    {getRoleIcon(user.rank, user.fav_role[0])}
                  </Col>
                  <Col xs={4} className='d-flex justify-content-center'>
                    {getRoleIcon(user.rank, user.fav_role[1])}
                  </Col>
                </Row>
                <Row className="pb-2 g-0">
                  <Col xs={4} className='d-flex justify-content-center'>
                    <Card.Text>{user.rank}</Card.Text>
                  </Col>
                  <Col xs={4} className='d-flex justify-content-center'>
                    <Card.Text>{user.fav_role[0]}</Card.Text>
                  </Col>
                  <Col xs={4} className='d-flex justify-content-center'>
                   <Card.Text>{user.fav_role[1]}</Card.Text>
                  </Col>
                </Row>
              </div>
              
            </Card.ImgOverlay>
          </Card>
          <UserCardModal user={user} show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
        
    );
  }
}



function getEmblem(rank) {
  return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}

function getRoleIcon(rank, role) {
  return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default UserCard;