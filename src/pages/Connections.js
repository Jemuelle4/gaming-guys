import React from 'react'
import { Card, CardGroup, Container, Row, Col, Button } from 'react-bootstrap'
import Navbar from '../components/navbar'
import { useCollection } from '../hooks/useCollection'

const Connections = ({uid}) =>{
  const { documents: users } = useCollection('users')
  if(users) {
    let currentUser = users.find(user => user.id === uid)
    return (
      <div style={{marginTop: '100px'}}>
        <Navbar/>
        <Row>
          <Col className='col-3'>
            <h1>Connection Requests</h1>
            <CardGroup>
              {currentUser.recievedBy && currentUser.receivedBy.map((uid) => {
                let user = users.find(user => user.id === uid)
                return (
                  <Container fluid>
                    <Row key={uid}>
                      <Col>
                        {getConnection(user)}
                      </Col>
                    </Row>
                  </Container>
                )
              })}
            </CardGroup>
          </Col>
          <Col className='col-6'>
            <h1>This is the connections the user has</h1>
          </Col>
          <Col className='col-3'>
            <h1>This is the selected user and goals</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

function getConnection(user) {
  console.log(user)
  return(
      <Card>
        <Row>
          <Col><Card.Title>{user.displayName}</Card.Title></Col>
          <Col><Card.Body>{user.rank}/{user.role}</Card.Body></Col>
          <Col><Button variant='success'>Accept</Button></Col>
          <Col><Button variant='danger'>Decline</Button></Col>
        </Row>
      </Card>
  )
}
export default Connections;