import React from 'react'
import UserCard from "./UserCard"
import { Modal } from 'react-bootstrap'

function UserCardModal(props) {
    return (
        <Modal className='d-flex' {...props} centered>
            <Modal.Header className='d-flex'>
                <UserCard user={props.user} />
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>Some content</li>
                    <li>Some more content</li>
                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default UserCardModal