import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import Navbar from '../components/navbar'

const Connections = ({connections}) =>{
  return (
    <div>
      <Navbar/>
      <CardGroup>
        {connections.map((connection) => {
          <Card>
            <Card.Header>This will be the connection name</Card.Header>
            <Card.Text>This would be rank/role</Card.Text>
          </Card>
        })}
      </CardGroup>
    </div>
  );
}
export default Connections;