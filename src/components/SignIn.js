import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AdminNav from './AdminNav'


export default function SignIn(props) {

  return (
    <div>
    
        {
          props.admin ? <AdminNav onAdminLogOut={props.onAdminLogOut}/> : <></>
        }
      
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

        {
          !props.admin ? <>
            <p>Don't have an account yet?</p>
            <Link to="/sign-up">Sign Up</Link>
            </> : <></>
        
        }  
          
      
    </div>
  )
}

