import React from 'react'
import {Nav, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../config';

export default function HomeNavbar(props) {
  console.log(props)
    return (
        <>
        <Navbar sticky='top' className="admin-nav" expand="lg">
            <Link to="/"><img src={`${PUBLIC_URL}/white-logo.png`} style={{width: '150px'}} alt="logo"/></Link>
            <div style={{justifySelf: 'self-end'}}>
            {
                props.loggedInUser?(
                    <div style={{display: 'flex'}}>
                        <Nav.Item>
                            <Link to={'/userOrders'}><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>My orders</Button></Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}} onClick={props.onLogOut}>Log Out</Button>
                        </Nav.Item>
                    </div>
                ): (
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/sign-in">Signin</Nav.Link>
                </Nav.Item>)

            }
            </div>
        </Navbar>
        <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        </>     
    )
}
