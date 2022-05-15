import React from 'react';
import Navbar from '../components/navbar'
import InGameComponent from '../components/InGameComponent'
import CommuncationComponent from '../components/CommunicationComponent'
import RoleComponent from '../components/RoleComponent'
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import poster from '../poster.png'
import classNames from 'classnames'
import { useCollection } from '../hooks/useCollection'
import "../css/components.css";


const About = ({uid}) =>{
  const [mode, setMode] = useState()
  const { documents: users } = useCollection('users')

  const handleClick = (e) =>{
      console.log(e.target.value)
      setMode(e.target.value)
  }
  const component = () => {
      if(mode === 'ingame'){
          return <InGameComponent/>
      } else if(mode === 'communication') {
          return <CommuncationComponent/>
      } else if(mode === 'role'){
          return <RoleComponent/>
      } else {
        return <InGameComponent/>
      }
  }

  let user
  if(users) {
    user = users.find(user => user.id === uid)
  }
  if(user) {
    let coach = (user.role === 'Coach')
    let learner = (user.role === 'Learner')
    let teammate = (user.role === 'Teammate')

    return (
      <div style={{marginTop: '100px'}}>
        <Navbar />
        <div style={{display: 'flex'}}>
          <div style={{display: 'block'}}>
            <button value="ingame" onClick={handleClick}>In Game Information</button>
            <button value="communication" onClick={handleClick}>Communication</button>
            <button value="role" onClick={handleClick}>Role / Profile Image</button>
          </div>
          {component()}
          <div>
            <Card style={{ width: '20rem', height: '20rem', border:'none'}}>
              <Card.Img style={{ width: '20rem', height: '20rem'}} src={user.imgSrc? user.imgSrc : poster} alt="Card image" />
              <Card.ImgOverlay>						
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
            <div className='extracontent'>
              <h3>Strengths</h3>
              <ul className='strength'>
                <li>Strength 1</li>
                <li>Strength 2</li>
              </ul>
              <h3>Weaknesses</h3>
              <ul className='weakness'>
                <li>Weakness 1</li>
              </ul>
              <h3>Communication Platforms</h3>
            </div>
          </div>
        </div>
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

export default About;