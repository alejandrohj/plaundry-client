import React, {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import AdminNav from './AdminNav'
import {PUBLIC_URL} from '../config';
import './AdminSignIn.css'
import axios from 'axios'

export default function AdminSignIn(props) {

  if (props.loggedInUser) {
    return <Redirect to='/admin' />
  }

  return (
    <div className="admin-signin">
        <AdminNav onAdminLogOut={props.onAdminLogOut}/> 
        <p style={{textAlign: 'center', marginTop: '30px', marginLeft:'5%', marginRight:'5%',color: '#036C9C', fontWeight:'600', fontSize: '25px'}}><em>Plaundry helps you reach your customers easily and user-friendly.</em></p>
        <Form noValidate className="admin-signinform" onSubmit={props.onSignIn}>
          <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Email address</Form.Label>
            <Form.Control  name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group style={{width:'50%'}} controlId="formBasicPassword">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              Password needs to have a number, a character, a lowercase and uppercase letter and needs to have at least 8 characters.
            </Form.Text>
          </Form.Group>
          {
            props.adminErr ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
          }
          <Button style={{fontSize: '20px'}} className="general-btn" variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <p style={{textAlign: 'center', color: '#036C9C', fontWeight:'600', fontSize: '16px', margin: '0% 18%', paddingTop: '20px', paddingBottom: '50px'}}>Do you want to use Plaundry for your businnes? 
        <br></br>
        Reach out to us by <a href="tel://+1234567890"><img style={{width: '20px'}} src={`${PUBLIC_URL}/phone-blue.png`} alt="phone" /></a> or <a href="mailto:business@plaundry.com"><img style={{width: '20px'}} src={`${PUBLIC_URL}/email-blue.png`} alt="email" /></a></p>
    </div>
  )
}

