import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import AdminNav from './AdminNav'


export default function AdminSignIn(props) {

  return (
    <div>
      {
        props.toAdminHome ? <Redirect to='/admin' /> :
        <>
        <AdminNav onAdminLogOut={props.onAdminLogOut}/> 
      
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
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        </>
      }
    </div>
  )
}

