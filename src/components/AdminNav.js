import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'

export default function AdminNav(props) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Plaundry</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Links only for coding-purposes */}
            <Nav.Link href="/admin">Edit laundry</Nav.Link>
            <Nav.Link href="/admin/sign-in">Sign In</Nav.Link>
            <Button onClick={props.onAdminLogOut}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
