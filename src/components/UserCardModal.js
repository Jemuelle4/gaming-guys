import React from 'react'
import { Modal, Row, Col, Card, Button } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'
import {ReactComponent as Checkmark} from '../imgs/checkmark.svg'
import {ReactComponent as Pending} from '../imgs/pending.svg'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import classNames from 'classnames'
import garen from '../garen.png'
import "../css/components.css";
import { useCollection } from '../hooks/useCollection'

function UserCardModal(props) {
	const user = props.user
	const userKey = props.userkey
	const { documents: users } = useCollection('users')
	let coach = (user.role === 'Coach')
	let learner = (user.role === 'Learner')
	let teammate = (user.role === 'Teammate')

	const { ...state} = useAuthContext()
	const handleClick = (e) => {
		e.preventDefault()
		const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1,{
			requestedTo: arrayUnion(userKey)
		})
		const ref2 = doc(db, "users", userKey)
		updateDoc(ref2, {
			receivedBy: arrayUnion(state.user.uid)
		})
	}

	function hasRequested() {
		let currentUser;
		if(users) {
		  currentUser = users.filter(user => user.id === state.user.uid)
		  if(currentUser[0].requestedTo) {
			if(currentUser[0].requestedTo.filter(uid => uid === user.id).length === 1) {
			  return (<div style={{ width: '3rem', height: '3rem'}} className='rounded-circle'>
				<Checkmark className='icon-friend' />
			  </div>)
			}
		  }
		  if(currentUser[0].receivedBy) {
			if(currentUser[0].receivedBy.filter(uid => uid === user.id).length === 1) {
			  return (<div style={{ width: '3rem', height: '3rem'}} className='rounded-circle'>
				<Pending className='icon-friend' />
			  </div>)
			}
		  }
		}
		return (
		  <Button style={{ width: '3rem', height: '3rem'}} className='rounded-circle' onClick={handleClick}>
			<AddFriend className='icon-friend' />
		  </Button>
		)
	}

	return (
		<Modal className='d-flex usercardmodal' {...props} centered>
			<div className='modalwrap'>
				<div className='modalcontent'>
					<Card style={{ width: '20rem', height: '20rem', border:'none'}}>
						<Card.Img style={{ width: '20rem', height: '20rem'}} src={user.imgSrc? user.imgSrc : garen} alt="Card image" />
						
						<Card.ImgOverlay>
							<div className='d-flex justify-content-end me-3 mt-3'>
								{hasRequested()}
							</div>
						
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
		</Modal>
	)
}

function getEmblem(rank) {
    return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}
  
function getRoleIcon(rank, role) {
    return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default UserCardModal