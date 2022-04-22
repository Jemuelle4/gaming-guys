import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'


const UserCard = ({ users }) =>{
  return (
    users.map(user => (
      <Col>
        <Card className="text-white d-flex m-3">
          <Card.Img style={{ width: '100%' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6kqtXGN8hvJ9XSvgePJR7-EozxcV0EKprQ&usqp=CAU" alt="Card image" />
          <Card.ImgOverlay>
            <Button className="rounded-circle">
              <AddFriend />
            </Button>
            {user.displayName && <Card.Title>{user.displayName}</Card.Title>}
            {user.role && <Card.Text>{user.role}</Card.Text>}
            <div className="w-25 h-25">
              {getEmblem('Diamond')}
            </div>
            {user.rank && <Card.Text>{user.rank}</Card.Text>}
            <div className="w-15 h-15">
              {getRoleIcon('Diamond', 'Mid')}
            </div>
            <div className="w-15 h-15">
              {getRoleIcon('Diamond', 'Jungle')}
            </div>
            {user.fav_role && <Card.Text>{user.fav_role[0]}/{user.fav_role[1]}</Card.Text>}
          </Card.ImgOverlay>
        </Card>
      </Col>
    ))
  );
}

function getEmblem(rank) {
  return <img className="img-fluid" src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + "Icon"}/>
}

function getRoleIcon(rank, role) {
  return <img className="img-fluid" src={require('../imgs/ranked-positions/Position_' + rank +"-" + role + '.png')} alt={role + "Icon"}/>
}

export default UserCard;