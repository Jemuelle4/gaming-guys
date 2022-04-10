import React from 'react'
import { Card, Button } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'

const UserCard = () =>{
  return (
    <Card className="text-white d-flex m-3">
      <Card.Img style={{ width: '100%' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6kqtXGN8hvJ9XSvgePJR7-EozxcV0EKprQ&usqp=CAU" alt="Card image" />
      <Card.ImgOverlay>
        <Button className="rounded-circle">
          <AddFriend />
        </Button>
        <Card.Title>User Name</Card.Title>
        <Card.Text>User Role</Card.Text>
        <div className="w-25 h-25">
          {getEmblem('Diamond')}
        </div>
        <Card.Text>User Rank</Card.Text>
        <div className="w-15 h-15">
          {getRoleIcon('Diamond', 'Mid')}
        </div>
        <div className="w-15 h-15">
          {getRoleIcon('Diamond', 'Jungle')}
        </div>
        <Card.Text>Role1/Role2</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

function getEmblem(rank) {
  return <img className="img-fluid" src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + "Icon"}/>
}

function getRoleIcon(rank, role) {
  return <img className="img-fluid" src={require('../imgs/ranked-positions/Position_' + rank +"-" + role + '.png')} alt={role + "Icon"}/>
}

export default UserCard;