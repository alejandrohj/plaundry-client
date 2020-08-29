import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function AdminNav(props) {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Plaundry</Navbar.Brand>
        {
          !props.adminUser ? (<></>) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Links only for coding-purposes */}
              <Link to="/admin">Edit laundry</Link>
              <Link to="/admin/sign-in">Sign In</Link>
              <Link to="/admin/delivery">Delivery</Link>
              <Button onClick={props.onAdminLogOut}>Log Out</Button>
            </Nav>
            </Navbar.Collapse>
          </>
          )
        }
      </Navbar>
    </div>
  )
}
