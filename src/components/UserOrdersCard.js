import React from 'react'
import {Card,InputGroup, FormControl} from 'react-bootstrap';

export default function userOrdersCard(props) {
    const {userId, status, pickUp, delivery,_id, message} = props.order
    let colorOfStatus = status ==='to pick up'? '#ff8000': status ==='picked up'? '#00008a': status ==='washing'? '0080ff' : status ==='to deliver'? '#ffbf00' : '#00ff00'
    return (
        <div style={{display:'flex', flexWrap: 'wrap'}}>
            <Card style={{ minWidth:'20rem', margin: '20px', maxWidth: '30rem', height: ''}}>
            <Card.Body style={{display: 'flex', alignItems: 'center'}}>
                <div style={{color:'#328CB6'}}>
                    <h5>Status : <b style={{color: colorOfStatus}}>{status}</b></h5>
                    <hr/>
                    {
                        status ==='to pick up'? <p> Your laundries will be picked up: <b>{pickUp.slice(0,10)}</b> at <b>{pickUp.slice(11,16)}h</b></p>:
                        status ==='picked up'? <p>We are bringing your laundries to our installations</p>:
                        status ==='washing'? <p>Be patient we are taking care of your clothings</p>:
                        status ==='to deliver'?<p> Your laundries will be delivered: <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>:
                        (<><p>We hope you are happy with our services, if you have some issue let's us know by leaving a comentary</p>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text style={{backgroundColor: '#46C5FF', color: 'white', fontSize: '13px'}}>Here</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={(e)=>props.onChangeMessage(e,_id)} style={{fontSize: '13px'}} as="textarea" aria-label="With textarea" defaultValue={message}/>
                        </InputGroup>
                        </>)
                    }
                    <hr/>
                    <h6>{userId.address.city}</h6>
                </div>
            </Card.Body>
            </Card>
        </div>
    )
}
