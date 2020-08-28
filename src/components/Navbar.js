import React from 'react'
import {PUBLIC_URL} from '../config';
import {Link} from 'react-router-dom';
import {Nav,Navbar, Button} from 'react-bootstrap';

export default function HomeNavbar(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Nav.Item>
                    <Nav.Link href="/sign-in">Signin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{border: 'none',}} onClick={props.onLogOut}>Log Out</Button>
                </Nav.Item>
                <Nav.Item>
                    <Link to={'/cart'}><img src={`${PUBLIC_URL}/cart-outline.png`} alt ='cartImage'/></Link>
                </Nav.Item>
        </div>
        
    )
}
