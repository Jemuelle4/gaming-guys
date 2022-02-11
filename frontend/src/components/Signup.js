import React, { useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

export default function Signup() {
  const nameRef = useRef()
  const genderRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Account Information</h2>
                <Form>
                    <Form.Group id="Name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select ref={genderRef} required>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Nonbinary</option>
                            <option>Agender</option>
                            <option>Prefer not to say</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className="w-100 mt-3" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? Log In
        </div>
    </>
  )
}
