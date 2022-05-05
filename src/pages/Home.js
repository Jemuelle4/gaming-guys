import React, { useState } from 'react';
import HomepageFilter from '../components/HomepageFilter'
import { CardGroup, Row, Col} from 'react-bootstrap'
import Nav from '../components/navbar'
import { MapUsers } from '../components/HomepageFilter'

const Home = (uid) =>{
  const [rank, setRank] = useState([])
  const [favRole, setFavRole] = useState([])
  const [role, setRole] = useState([])

  return (
    <div>
      <Nav/>
      <Row>
        <Col className='col-3'>
          <HomepageFilter rank={rank} setRank={setRank} favRole={favRole} setFavRole={setFavRole} role={role} setRole={setRole} />
        </Col>
        <Col className='col-9'>
          <CardGroup>
            <Row  xs={1} md={2} lg={3}>
              {MapUsers(rank, favRole, role, uid)}
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Home;