import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { useCollection } from '../hooks/useCollection'
import "../css/components.css";
import poster from '../poster.png'
import classNames from 'classnames'

const AcceptedConnection = ({uid, setSelectedUser}) => {
	const { documents: users } = useCollection('users')
	let user;
	if(users) {
		user = users.find(user => user.id === uid)
	}
	if(user) {
		let coach = (user.role === 'Coach')
		let learner = (user.role === 'Learner')
		let teammate = (user.role === 'Teammate')

		function getEmblem(rank) {
			return <img className='icons' src={require('../imgs/ranked-emblems/Emblem_' + rank + '.png')} alt={rank + 'Icon'}/>
		}
		
		function getRoleIcon(rank, role) {
			return <img className='icons' src={require('../imgs/ranked-positions/Position_' + rank +'-' + role + '.png')} alt={role + 'Icon'}/>
		}

		return (
			<div>
				<Card className='d-flex flex-column' style={{ cursor: 'pointer', width: '20rem', height: '20rem', border:'none'}} onClick={() => setSelectedUser(user)}>
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
			</div>
		)
	}
}

export default AcceptedConnection