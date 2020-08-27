import React from 'react'
import {Nav,Navbar, Card} from 'react-bootstrap';
import {PUBLIC_URL} from '../config';
import {Button} from 'react-bootstrap';

export default function CategoryNavbar(props) {
    return (
        <div >
            <Navbar bg="light" style={{display: 'flex', justifyContent:'space-around', padding:'0'}}>
                <Nav.Item>
                    <button onClick={()=>props.onCatSelect('clothing')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/tshirt-crew-outline.png`} alt ='shirt'/> <p style={{fontSize: '10px'}}>Clothes</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('bedding')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/bed-king-outline.png`} alt ='bed'/> <p style={{fontSize: '10px'}}>Bedding</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('bags')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/sack.png`} alt ='sack'/> <p style={{fontSize: '10px'}}>Laundry</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('towels')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/shower-head.png`} alt ='shower'/> <p style={{fontSize: '10px'}}>Bathroom</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('business')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/handshake-outline.png`} alt ='business'/> <p style={{fontSize: '10px'}}>Business</p></button>
                </Nav.Item>
            </Navbar>
        </div>
    )
}
