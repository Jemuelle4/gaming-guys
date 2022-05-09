import React, { useState } from 'react';
import HomepageFilter from '../components/HomepageFilter'
import { CardGroup, Row, Col} from 'react-bootstrap'
import Navbar from '../components/navbar'
import { MapUsers } from '../components/HomepageFilter'

const Home = () =>{
  const [rank, setRank] = useState([])
  const [favRole, setFavRole] = useState([])
  const [role, setRole] = useState([])

  return (
    <div className='d-flex justify-content-between' style={{marginTop: '100px'}}>
      <Navbar/>
      <Row className="formatting">
        <Col className='col-12 col-md-3'>
          <HomepageFilter rank={rank} setRank={setRank} favRole={favRole} setFavRole={setFavRole} role={role} setRole={setRole} />
        </Col>
        <Col className='col-12 col-md-9'>
          <CardGroup>
            <Row  xs={1} md={2} lg={3}>
              {MapUsers(rank, favRole, role)}
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Home;