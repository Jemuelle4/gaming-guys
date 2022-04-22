import React from 'react';
import HomepageFilter from '../components/HomepageFilter'
import UserCard from '../components/UserCard'
import { CardGroup, Row, Col} from 'react-bootstrap'
import { useCollection } from '../hooks/useCollection'
import Navbar from '../components/navbar'

const Home = () =>{
  const { documents: users } = useCollection('users')
  return (
    <div>
      <Navbar/>
      <Row>
        <Col className='col-3'>
          <HomepageFilter/>
        </Col>
        <Col className='col-9'>
          <CardGroup>
            <Row  xs={1} md={2} lg={3}>
              {users && <UserCard users={users}/>}
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Home;