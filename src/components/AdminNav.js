import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function AdminNav(props) {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Plaundry</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Links only for coding-purposes */}
            <Link to="/admin"><Nav.Link>Edit laundry</Nav.Link></Link>
            <Link to="/admin/sign-in"><Nav.Link>Sign In</Nav.Link></Link>
            <Link to="/admin/delivery"><Nav.Link>Delivery</Nav.Link></Link>
            <Button onClick={props.onAdminLogOut}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
