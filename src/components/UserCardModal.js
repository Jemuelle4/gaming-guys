import React from 'react'
import { Modal, Row, Col, Card, Button } from 'react-bootstrap'
import {ReactComponent as AddFriend} from '../imgs/person-add.svg'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import classNames from 'classnames'
import poster from '../poster.png'
import "../css/components.css";

function UserCardModal(props) {
	const user = props.user
	const userKey = props.userkey
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

	return (
		<Modal className='d-flex usercardmodal' {...props} centered>
			<div className='modalwrap'>
				<div className='modalcontent'>
					<Card style={{ width: '20rem', height: '20rem', border:'none'}}>
						<Card.Img style={{ width: '20rem', height: '20rem'}} src={user.imgSrc? user.imgSrc : poster} alt="Card image" />
						<Card.ImgOverlay>
							<Button style={{ width: '3rem', height: '3rem'}} className='rounded-circle' onClick={handleClick}>
								<AddFriend/>
							</Button>
							<div className={classNames('information', {coach: coach, learner: learner, teammate: teammate})}>
								<Row>
									<Col>
										<Card.Title>{user.displayName}</Card.Title>
									</Col>
									<Col>
										<Card.Text>{user.role}</Card.Text>
									</Col>
								</Row>
								<Row>
									<Col sm={6} className='d-flex justify-content-center'>
										{getEmblem(user.rank)}
									</Col>
									<Col sm={3} className='d-flex justify-content-center'>
										{getRoleIcon(user.rank, user.fav_role[0])}
									</Col>
									<Col sm={3} className='d-flex justify-content-center'>
										{getRoleIcon(user.rank, user.fav_role[1])}
									</Col>
								</Row>
								<Row>
									<Col sm={6} className='d-flex justify-content-center'>
										<Card.Text>{user.rank}</Card.Text>
									</Col>
									<Col sm={6} className='d-flex justify-content-center'>
										<Card.Text>{user.fav_role[0]}/{user.fav_role[1]}</Card.Text>
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