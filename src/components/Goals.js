import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'


const Goals = () => {
	let [newGoal, setNewGoal] = useState('')
	let incomplete = ['Goal1', 'Goal2','Goal3']
	let completed = ['Goal11', 'Goal22','Goal33']

	const onFormSubmit = e => {
		e.preventDefault()
		incomplete.push(newGoal)
		setNewGoal('')
	}

	function completeGoal(e, goal) {
		completed.push(goal)
		incomplete = incomplete.filter(function(value) {
			return value !== goal
		})
		console.log('made it here')
	}

	return (
		<div>
			<h1>Goals</h1>
			<Form onSubmit={onFormSubmit}>
				<Form.Group>
					<Form.Control type="text" placeholder="Add a goal" value={newGoal} onChange={e => setNewGoal(e.target.value)}/>
					<Button type='submit'>Submit</Button>
				</Form.Group>
				<Form.Group>
					<h3>Current Goals</h3>
					{incomplete.map(goal => 
						<Form.Check key={goal} label={goal} onChange={e => completeGoal(e, goal)}/>
					)}
				</Form.Group>
				<Form.Group>
					<h3>Completed Goals</h3>
					{completed.map(goal => 
						<Form.Check disabled label={goal}/>
					)}
				</Form.Group>
			</Form>
		</div>
	)
}

export default Goals;