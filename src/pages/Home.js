import React from 'react';
import HomepageFilter from '../components/HomepageFilter'
import { CardGroup, Row, Col} from 'react-bootstrap'
import { MapUsers } from '../components/HomepageFilter'

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
              {MapUsers()}
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Home;