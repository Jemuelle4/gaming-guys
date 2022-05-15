import React, {useState} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import classNames from 'classnames'
import Goals from './Goals'
import garen from '../garen.png'
import "../css/components.css";

const SelectedConnection = ({user, currentUserID}) => {
	const [info, setInfo] = useState(true)
	const [goals, setGoals] = useState(false)

	if(user) {
		let coach = (user.role === 'Coach')
		let learner = (user.role === 'Learner')
		let teammate = (user.role === 'Teammate')

		function strengths() {
			if(user.strengths) {
				return(user.strengths.map(strength => {
					return <li>{strength}</li>
				}))
			}
		}
	
		function weaknesses() {
			if(user.weaknesses) {
				return(user.weaknesses.map(weakness => {
					return <li>{weakness}</li>
				}))
			}
		}

		function discord() {
			if(user.discord) {
				return <p>Discord: {user.discord}</p>
			}
		}
		function instagram() {
			if(user.instagram) {
				return <p>Instagram: {user.instagram}</p>
			}
		}
		function snapchat() {
			if(user.snapchat) {
				return <p>Snapchat: {user.snapchat}</p>
			}
		}
		function telegram() {
			if(user.telegram) {
				return <p>Telegram: {user.telegram}</p>
			}
		}

		let bottomContent;
		if(info) {
			bottomContent =
				<div className='extracontent'>
					<h3>Strengths</h3>
					<ul className='strength'>
						{strengths()}
					</ul>
					<h3>Weaknesses</h3>
					<ul className='weakness'>
						{weaknesses()}
					</ul>
					<h3>Communication Platforms</h3>
					{discord()}
					{instagram()}
					{snapchat()}
					{telegram()}
				</div>
		}
		if(goals) {
			bottomContent = 
				<div>
					<Goals selectedUser={user} currentUserID={currentUserID}/>
				</div>
		}

		return (
			<div>
				<Card className='d-flex flex-column mt-4' style={{ width: '80%', height: '80%', border:'none'}}>
					<Card.Img style={{ width: '100%', height: '20rem', objectFit: 'cover'}} src={user.imgSrc? user.imgSrc : garen} alt="Card image" />
					<Card.ImgOverlay>
						<div className={classNames('information', 'mt-auto', {coach: coach, learner: learner, teammate: teammate})}>
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
				<div>
					<Button className={`${info ? "design" : ""} button-connections`} 
						onClick={() => {setInfo(true); setGoals(false)}}>Information</Button>
					<Button className={`${goals ? "design" : ""} button-connections`} 
						onClick={() => {setInfo(false); setGoals(true)}}>Goals</Button>
				</div>
				<div>
					{bottomContent}
				</div>
			</div>
		)
	} else {
		return <h2>Select a connection to view info and add goals!</h2>
	}
}

function getEmblem(rank) {
	return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}

function getRoleIcon(rank, role) {
	return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default SelectedConnection;