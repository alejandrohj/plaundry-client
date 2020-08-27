import React from 'react'
import {Nav,Navbar} from 'react-bootstrap';
import {PUBLIC_URL} from '../config';

export default function CategoryNavbar() {
    return (
        <div >
            <Navbar bg="light" style={{display: 'flex', justifyContent:'space-around', padding:'0'}}>
                <Nav.Item>
                    <Nav.Link style={{textAlign:'center'}} href="/home"><img src={`${PUBLIC_URL}/tshirt-crew-outline.png`} alt ='shirt'/> <p style={{fontSize: '10px'}}>Clothes</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textAlign:'center'}} href="/home"><img src={`${PUBLIC_URL}/bed-king-outline.png`} alt ='bed'/> <p style={{fontSize: '10px'}}>Bedding</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textAlign:'center'}} href="/home"><img src={`${PUBLIC_URL}/sack.png`} alt ='sack'/> <p style={{fontSize: '10px'}}>Laundry</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textAlign:'center'}} href="/home"><img src={`${PUBLIC_URL}/shower-head.png`} alt ='shower'/> <p style={{fontSize: '10px'}}>Bathroom</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textAlign:'center'}} href="/home"><img src={`${PUBLIC_URL}/handshake-outline.png`} alt ='business'/> <p style={{fontSize: '10px'}}>Business</p></Nav.Link>
                </Nav.Item>
            </Navbar>
        </div>
    )
}
