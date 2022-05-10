import React, {useState} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import classNames from 'classnames'
import Goals from './Goals'
import poster from '../poster.png'
import "../css/components.css";

const SelectedConnection = (user) => {
	const [info, setInfo] = useState(true)
	const [goals, setGoals] = useState(false)

	if(user) {
		user = user.user
		let coach = (user.role === 'Coach')
		let learner = (user.role === 'Learner')
		let teammate = (user.role === 'Teammate')

		let bottomContent;
		if(info) {
			bottomContent =
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
		}
		if(goals) {
			bottomContent = 
				<div>
					<Goals />
				</div>
		}

		return (
			<div>
				<Card className='d-flex flex-column' style={{ width: '20rem', height: '20rem', border:'none'}}>
					<Card.Img style={{ width: '20rem', height: '20rem'}} src={user.imgSrc? user.imgSrc : poster} alt="Card image" />
					<Card.ImgOverlay>
						<div className={classNames('information', 'mt-auto', {coach: coach, learner: learner, teammate: teammate})}>
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
				<div>
					<Button onClick={() => {setInfo(true); setGoals(false);}}>Information</Button>
					<Button onClick={() => {setInfo(false); setGoals(true);}}>Goals</Button>
				</div>
				<div>
					{bottomContent}
				</div>
			</div>
		)
	}
}

function getEmblem(rank) {
	return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
}

function getRoleIcon(rank, role) {
	return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
}

export default SelectedConnection;