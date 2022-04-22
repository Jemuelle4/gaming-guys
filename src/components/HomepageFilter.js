import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import UserCard from '../components/UserCard'
import { useCollection } from '../hooks/useCollection'

const state = {
  rank: ['Bronze'],
  role: [],
  looking: []
}
const count = 0

function changeFilter(type, value) {
  if(state[type].includes(value)) {
    state[type].splice(state[type].indexOf(value), 1)
  } else {
    state[type].push(value)
  }
  console.log(state)
}

export function MapUsers() {
  const { documents: users } = useCollection('users')
  console.log(typeof(users))
  console.log(users)
  console.log(count + 1)
  let filteredUsers = filterUsers(users)
  if(filteredUsers){
    return filteredUsers.map(user => (
      <UserCard user={user} key={user.displayName}/>
    ))
  }
}

function filterUsers(users) {
  if(users){
    let filteredUsers = []
    if(state['rank'].length === 0 && state['role'].length === 0 /**&& state[looking].length === 0**/) {
      return users
    }
    for(const user of users) {
      if(state['role'].includes(user.fav_role[0] || state['role'].includes(user.fav_role[1]))) {
        filteredUsers.push(user)
      } else if(state['rank'].includes(user.rank)) {
        filteredUsers.push(user)
      } /**else if(state['looking'].includes(user.looking)) {
        filteredUsers.push(user)
      }**/
    }
    return filteredUsers
  }
}

const HomepageFilter = () =>{
  return (
    <div className='sticky-top'>
      <h3>Filter by Rank</h3>
      <Form>
        <Row>
          <Col><Form.Check label='Iron' onChange={() => changeFilter('rank', 'Iron')}/></Col>
          <Col><Form.Check label='Diamond' onChange={() => changeFilter('rank', 'Diamond')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Bronze' onChange={() => changeFilter('rank', 'Bronze')}/></Col>
          <Col><Form.Check label='Master' onChange={() => changeFilter('rank', 'Master')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Silver' onChange={() => changeFilter('rank', 'Silver')}/></Col>
          <Col><Form.Check label='Grandmaster' onChange={() => changeFilter('rank', 'Grandmaster')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Gold' onChange={() => changeFilter('rank', 'Gold')}/></Col>
          <Col><Form.Check label='Challenger' onChange={() => changeFilter('rank', 'Challenger')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Platinum' onChange={() => changeFilter('rank', 'Platinum')}/></Col>
          <Col><Form.Check label='Unranked' onChange={() => changeFilter('rank', 'Unranked')}/></Col>
        </Row>
      </Form>
      <h3>Filter by Role</h3>
      <Form>
        <Form.Check label='Top' onChange={() => changeFilter('role', 'Top')}/>
        <Form.Check label='Mid' onChange={() => changeFilter('role', 'Mid')}/>
        <Form.Check label='Bot' onChange={() => changeFilter('role', 'Bot')}/>
        <Form.Check label='Jungle' onChange={() => changeFilter('role', 'Jungle')}/>
        <Form.Check label='Support' onChange={() => changeFilter('role', 'Support')}/>
      </Form>
      <h3>Looking For</h3>
      <Form>
        <Form.Check label='Learner' onChange={() => changeFilter('looking', 'Learner')}/>
        <Form.Check label='Coach' onChange={() => changeFilter('looking', 'Coach')}/>
        <Form.Check label='Teammate' onChange={() => changeFilter('looking', 'Teammate')}/>
      </Form>
      <Button type='submit'>Update Filter</Button>
    </div>
  );
}

export default HomepageFilter;