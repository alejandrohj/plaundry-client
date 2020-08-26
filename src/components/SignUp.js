import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function SignUp(props) {
  return (
    <div>
      <Form onSubmit={props.onSignUp}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Password needs to have a number, a character, a lowercase and uppercase letter and needs to have at least 8 characters.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      <p>Already have an account?</p>
      <Link to="/sign-in">Sign In</Link>
    </div>
  )
}
