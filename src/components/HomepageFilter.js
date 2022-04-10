import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
const HomepageFilter = () =>{
  return (
    <div className='sticky-top'>
      <h3>Filter by Rank</h3>
      <Form>
        <Row>
          <Col><Form.Check label='Iron' /></Col>
          <Col><Form.Check label='Diamond' /></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Bronze' /></Col>
          <Col><Form.Check label='Master' /></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Silver' /></Col>
          <Col><Form.Check label='Grandmaster' /></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Gold' /></Col>
          <Col><Form.Check label='Challenger' /></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Platinum' /></Col>
          <Col><Form.Check label='Unranked' /></Col>
        </Row>
      </Form>
      <h3>Filter by Role</h3>
      <Form>
        <Form.Check label='Top' />
        <Form.Check label='Mid' />
        <Form.Check label='Bot' />
        <Form.Check label='Jungle' />
        <Form.Check label='Support' />
      </Form>
      <h3>Looking For</h3>
      <Form>
        <Form.Check label='Learner' />
        <Form.Check label='Coach' />
        <Form.Check label='Teammate' />
      </Form>
    </div>
  );
}
export default HomepageFilter;

