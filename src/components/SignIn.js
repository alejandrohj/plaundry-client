import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Redirect, Link} from 'react-router-dom'

export default function SignIn(props) {

  if (props.toHome){
    return <Redirect to='/home' /> 
  }

  return (
    <div>
      <Form onSubmit={props.onSignIn}>
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
        {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
        }
        <Button className="general-btn" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  )
}

