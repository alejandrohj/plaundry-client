import React from 'react'
import {Nav,Navbar} from 'react-bootstrap';
import {PUBLIC_URL} from '../config';


export default function CategoryNavbar(props) {
    return (
        <div >
            <Navbar className='category-navbar' style={{display: 'flex', justifyContent:'space-around', padding:'0'}}>
                <Nav.Item>
                    <button className="nav-link" onClick={()=>props.onCatSelect('clothing')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/tshirt-crew-outline.png`} alt ='shirt'/> <p style={{fontSize: '10px', padding:'0px',margin: '0px'}}>Clothes</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('bedding')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/bed-king-outline.png`} alt ='bed'/> <p style={{fontSize: '10px',padding:'0px',margin: '0px'}}>Bedding</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('towels')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/shower-head.png`} alt ='shower'/> <p style={{fontSize: '10px',padding:'0px',margin: '0px'}}>Bathroom</p></button>
                </Nav.Item>
                <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('bags')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/sack.png`} alt ='sack'/> <p style={{fontSize: '10px',padding:'0px',margin: '0px'}}>Laundry</p></button>
                </Nav.Item>
                {/* <Nav.Item>
                    <button  onClick={()=>props.onCatSelect('business')} style={{textAlign:'center', border: 'none', backgroundColor: 'transparent'}}><img src={`${PUBLIC_URL}/handshake-outline.png`} alt ='business'/> <p style={{fontSize: '10px',padding:'0px',margin: '0px'}}>Business</p></button>
                </Nav.Item> */}
            </Navbar>
            <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        </div>
    )
}
