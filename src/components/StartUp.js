import React from 'react'
import {Link} from 'react-router-dom';
import Calendar from './Calendar'

import {InputGroup, FormControl,Button} from 'react-bootstrap';
export default function StartUp() {
    return (
        <div style ={{display:'flex', flexDirection:'column',alignItems:'center', textAlign: 'center'}}>
            <h1>Wellcome to Plaundry</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin nulla quis ultricies commodo. Mauris molestie neque id vehicula molestie. Suspendisse condimentum purus et facilisis semper. Nunc non euismod eros. Ut varius laoreet magna et aliquet. Pellentesque eu varius purus. Nunc a est magna. Nulla id neque vel nisl luctus feugiat.</p>
            <InputGroup className="mb-3" style={{width: '300px'}}>
                <FormControl
                placeholder="Postal Code"
                aria-label="Postal Code"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Link to={'/home'}><Button variant="outline-secondary">Check</Button></Link>
                </InputGroup.Append>
            </InputGroup>
            <Link to={'/admin'}><div style={{display:'flex',alignSelf: 'flex-start'}}>Company</div></Link>

            <Calendar />
        </div>
    )
}
