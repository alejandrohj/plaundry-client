import React from 'react'
import {Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function HomeNavbar(props) {
  console.log(props)
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                {
                    props.loggedInUser?(
                        <Nav.Item>
                            <Button style={{border: 'none',backgroundColor: 'transparent', color: 'blue'}} onClick={props.onLogOut}>Log Out</Button>
                        </Nav.Item>
                    ): (
                    <Nav.Item>
                        <Nav.Link href="/sign-in">Signin</Nav.Link>
                        <Link to="/userprofile">Userprofile</Link>
                    </Nav.Item>)
                }
        </div>
        
    )
}
