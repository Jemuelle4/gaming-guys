import React from 'react';
import HomepageFilter from '../components/HomepageFilter';
import UserCard from '../components/UserCard'
import { CardGroup, Row, Col} from 'react-bootstrap';
const Home = () =>{
  return (
    <div>
      <Row>
        <Col className='col-3'>
          <HomepageFilter/>
        </Col>
        <Col className='col-9'>
          <CardGroup>
            <Row  xs={1} md={2} lg={3}>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
              <Col><UserCard /></Col>
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Home;