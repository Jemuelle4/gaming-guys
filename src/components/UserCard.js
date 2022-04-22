import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'

const UserCard = ({ user }) =>{
  if(user){
  return (
    <Col className='m-5' style={{ width: '20rem', height: '20rem'}}>
      <Card className='text-white btn' style={{ width: '20rem', height: '20rem', border:'none'}}>
        <Card.Img style={{ width: '20rem', height: '20rem'}} src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="Card image" />
        <Card.ImgOverlay>
          <Button style={{ width: '3rem', height: '3rem'}} className='rounded-circle'>
            <AddFriend/>
          </Button>
          <Row>
            <Col>
              <Card.Title>{user.displayName}</Card.Title>
            </Col>
            <Col>
            <Card.Text>{user.fav_role[0]}/{user.fav_role[1]}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className='d-flex justify-content-center'>
              {getEmblem(user.rank)}
            </Col>
            <Col sm={3} className='d-flex justify-content-center'>
              {getRoleIcon(user.rank, user.fav_role[0])}
            </Col>
            <Col sm={3} className='d-flex justify-content-center'>
              {getRoleIcon(user.rank, user.fav_role[1])}
            </Col>
          </Row>
          <Row>
            <Col sm={6} className='d-flex justify-content-center'>
              <Card.Text>{user.rank}</Card.Text>
            </Col>
            <Col sm={6} className='d-flex justify-content-center'>
              <Card.Text>{user.fav_role[0]}/{user.fav_role[1]}</Card.Text>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
  }
}



function getEmblem(rank) {
  return <img style={{ height:'5rem', width:'5rem'}} src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}

function getRoleIcon(rank, role) {
  if(rank==='Unranked') {
    rank = 'Iron'
  }
  return <img style={{ height:'5rem', width:'5rem'}} src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default UserCard;