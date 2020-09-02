import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {PUBLIC_URL} from '../config';


export default function AdminNav(props) {

  return (
    <>
    <Navbar className="admin-nav" expand="lg">
      <Link to="/"><img src={`${PUBLIC_URL}/white-logo.png`} style={{width: '150px'}} alt="logo"/></Link>
      {
        !props.adminUser ? (<></>) : (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
              <Link to="/admin" className="nav-link" style={{color: 'white', fontWeight: '600'}}>Edit items</Link>
              <Link to="/admin/delivery" className="nav-link" style={{color: 'white', fontWeight: '600'}}>Orders</Link>
              </Nav>
              <Nav>
                <Button className="admin-nav-btn" style={{fontWeight: '600'}} onClick={props.onAdminLogOut}>Log Out</Button>
              </Nav> 
          </Navbar.Collapse>
        </>
        )
      }
    </Navbar>
    <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
    </>
  )
}
