import React, { useState } from 'react';
import HomepageFilter from '../components/HomepageFilter'
import { CardGroup, Row, Col} from 'react-bootstrap'
import Navbar from '../components/navbar'
import { MapUsers } from '../components/HomepageFilter'
import {Container} from 'react-bootstrap';

const Home = () =>{
  const [rank, setRank] = useState([])
  const [favRole, setFavRole] = useState([])
  const [role, setRole] = useState([])

 
  return (
    <div className='d-flex justify-content-between' style={{marginTop: '100px'}}>
      <Navbar/>
      <Container fluid>
        <Row className="formatting m-0 ">
          <Col xs={12} md={3}>
            <HomepageFilter rank={rank} setRank={setRank} favRole={favRole} setFavRole={setFavRole} role={role} setRole={setRole} />
          </Col>
          <Col xs={12} md={9}style={{Width:'80%'}}>
            <CardGroup >
              <Row className='d-flex justify-content-center' xs={1} md={2} lg={3}>
                {MapUsers(rank, favRole, role)}
              </Row>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}
export default Home;