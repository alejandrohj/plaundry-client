import React from 'react'
import {PUBLIC_URL} from '../config';
import {Nav,Navbar, Button} from 'react-bootstrap';

export default function HomeNavbar(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Nav.Item>
                    <Nav.Link href="/sign-in">Signin</Nav.Link>
                    <Button onClick={props.onLogOut}>Log Out</Button>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home"><img src={`${PUBLIC_URL}/cart-outline.png`} alt ='cartImage'/></Nav.Link>
                </Nav.Item>
        </div>
        
    )
}
