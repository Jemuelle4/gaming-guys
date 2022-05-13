import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useCollection } from '../hooks/useCollection'

const Goals = ({selectedUser, currentUserID}) => {
	const { ...state} = useAuthContext()
	let [newGoal, setNewGoal] = useState('')
	const { documents: users } = useCollection('users')

	if(users){
		selectedUser = users.find(user => user.id === selectedUser.id)
	}

	let incompleteString = 'goals.' + selectedUser.id + '.incomplete'
	let completeString = 'goals.' + selectedUser.id + '.complete'
	let currentIncompleteString = 'goals.' + currentUserID + '.incomplete'
	let currentCompleteString = 'goals.' + currentUserID + '.complete'

	const onFormSubmit = e => {
		e.preventDefault()
		const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1,{
			[incompleteString]: arrayUnion(newGoal),
    })
		const ref2 = doc(db, "users", selectedUser.id)
		updateDoc(ref2, {
			[currentIncompleteString]: arrayUnion(newGoal)
		})
		setNewGoal('')
	}

	function completeGoal(goal) {
		const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1,{
      [completeString]: arrayUnion(goal),
			[incompleteString]: arrayRemove(goal)
    })
		const ref2 = doc(db, "users", selectedUser.id)
		updateDoc(ref2,{
      [currentCompleteString]: arrayUnion(goal),
			[currentIncompleteString]: arrayRemove(goal)
    })
	}

	function uncompleteGoal(goal) {
		const ref1 = doc(db, "users", state.user.uid)
		updateDoc(ref1,{
      [completeString]: arrayRemove(goal),
			[incompleteString]: arrayUnion(goal)
    })
		const ref2 = doc(db, "users", selectedUser.id)
		updateDoc(ref2,{
      [currentCompleteString]: arrayRemove(goal),
			[currentIncompleteString]: arrayUnion(goal)
    })
	}

	function mapIncomplete(incomplete) {
		if(incomplete) {
			return (incomplete.map(goal =>
				<Form.Check key={goal} label={goal} onChange={() => completeGoal(goal)}/>
			))
		}
	}
	
	function mapComplete(complete) {
		if(complete) {
			return (complete.map(goal =>
				<Form.Check key={goal} label={goal} onChange={() => uncompleteGoal(goal)}/>
			))
		}
	}

	if(selectedUser && selectedUser.goals[currentUserID]) {
		return (
			<div>
				<Form onSubmit={onFormSubmit}>
					<Form.Group>
						<Form.Control type="text" placeholder="Add a goal" value={newGoal} onChange={e => setNewGoal(e.target.value)}/>
						<Button type='submit'>Submit</Button>
					</Form.Group>
					<div >
						<h4>Current Goals</h4>
						<Form.Group style={{maxHeight: '150px', overflowY: 'scroll'}}>
							{mapIncomplete(selectedUser.goals[currentUserID].incomplete)}
						</Form.Group>
						<h4>Completed Goals</h4>
						<Form.Group style={{maxHeight: '150px', overflowY: 'scroll'}}>
							{mapComplete(selectedUser.goals[currentUserID].complete)}
						</Form.Group>
					</div>
				</Form>
			</div>
		)
	} else {
		return (
			<div>
				<Form onSubmit={onFormSubmit}>
					<Form.Group>
						<Form.Control type="text" placeholder="Add a goal" value={newGoal} onChange={e => setNewGoal(e.target.value)}/>
						<Button type='submit'>Submit</Button>
					</Form.Group>
					<h3>Add some goals to get started!</h3>
				</Form>
			</div>
		)
	}
}

export default Goals;