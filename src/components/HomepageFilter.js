import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import UserCard from '../components/UserCard'
import { useCollection } from '../hooks/useCollection'
import "../css/components.css";
import { useAuthContext } from '../hooks/useAuthContext'

export function MapUsers(rank, favRole, role) {
  const { documents: users } = useCollection('users')
  const { user } = useAuthContext()

  let filteredUsers = []

  if(user && users) {
    filteredUsers = removeConnections(user, users)
    filteredUsers = removeSelf(user, filteredUsers)
  }

  if(users) {
    filteredUsers = filterUsers(filteredUsers, rank, favRole, role)
  }

  return filteredUsers.map(user => (
    <UserCard user={user} userKey={user.id} key={user.id}/>
  ))
}

function removeSelf(currentUser, users) {
  return users.filter(user => user.id !== currentUser.uid)
}

function removeConnections(currentUserID, users) {
  let currentUser = users.filter(user => user.id === currentUserID.uid)
  let filteredUsers = users
  if(currentUser[0].connections){
    for(const id of currentUser[0].connections) {
      filteredUsers = filteredUsers.filter(user => user.id !== id)
    }
  }
  return filteredUsers
}

function filterUsers(users, rank, favRole, role) {
  let filteredUsers = []
  if(rank.length === 0 && favRole.length === 0 && role.length === 0) {
    return users
  }
  if(favRole.length === 0 && role.length === 0) {
    for(const user of users) {
      if(rank.includes(user.rank)) {
        filteredUsers.push(user)
      }
    }
  } else if (rank.length === 0 && role.length === 0) {
    for(const user of users) {
      if(favRole.includes(user.fav_role[0]) || favRole.includes(user.fav_role[1])) {
        filteredUsers.push(user)
      }
    }
  } else if(rank.length === 0 && favRole.length === 0){
    for(const user of users) {
      if(role.includes(user.role)) {
        filteredUsers.push(user)
      }
    }
  } else if(rank.length !== 0) {
    for(const user of users) {
      if(rank.includes(user.rank)) {
        filteredUsers.push(user)
      }
    }
    if(favRole.length !== 0) {
      let i = filteredUsers.length
      while(i--) {
        if(!(favRole.includes(filteredUsers[i].fav_role[0]) || favRole.includes(filteredUsers[i].fav_role[1]))) {
          filteredUsers.splice(filteredUsers.indexOf(filteredUsers[i]), 1)
        }
      }
    }
    if(role.length !== 0) {
      let i = filteredUsers.length
      while(i--) {
        if(!(role.includes(filteredUsers[i].role))) {
          filteredUsers.splice(filteredUsers.indexOf(filteredUsers[i]), 1)
        }
      }
    }
  } else {
    for(const user of users) {
      if(favRole.includes(user.fav_role[0]) || favRole.includes(user.fav_role[1])) {
        filteredUsers.push(user)
      }
    }
    let i = filteredUsers.length
    while(i--) {
      if(!(role.includes(filteredUsers[i].role))) {
        filteredUsers.splice(filteredUsers.indexOf(filteredUsers[i]), 1)
      }
    }
  }
  return filteredUsers
}

const HomepageFilter = ({ rank, setRank, favRole, setFavRole, role, setRole}) =>{
  function changeFilter(type, value) {
    if(type === 'rank'){
      if(rank.includes(value)) {
        setRank(rank.filter(function(ranks) {
          return ranks !== value
        }))
      } else {
        setRank([...rank, value])
      }
    } else if(type === 'favRole') {
      if(favRole.includes(value)) {
        setFavRole(favRole.filter(function(favRoles) {
          return favRoles !== value
        }))
      } else {
        setFavRole([...favRole, value])
      }
    } else {
      if(role.includes(value)) {
        setRole(role.filter(function(roles) {
          return roles !== value
        }))
      } else {
        setRole([...role, value])
      }
    }
  }

  return (
    <div className='spacing'>
      <h3>Filter by Rank</h3>
      <Form>
        <Row fluid>
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
        <Row>
          <Col><Form.Check label='Top' onChange={() => changeFilter('favRole', 'Top')}/></Col>
          <Col><Form.Check label='Jungle' onChange={() => changeFilter('favRole', 'Jungle')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Mid' onChange={() => changeFilter('favRole', 'Mid')}/></Col>
          <Col> <Form.Check label='Support' onChange={() => changeFilter('favRole', 'Support')}/></Col>
        </Row>
        <Row>
          <Col><Form.Check label='Bot' onChange={() => changeFilter('favRole', 'Bot')}/></Col>
        </Row>
      </Form>
      <h3>Looking For</h3>
      <Form>
        <Form.Check label='Learner' onChange={() => changeFilter('role', 'Learner')}/>
        <Form.Check label='Coach' onChange={() => changeFilter('role', 'Coach')}/>
        <Form.Check label='Teammate' onChange={() => changeFilter('role', 'Teammate')}/>
      </Form>
    </div>
  );
}

export default HomepageFilter;