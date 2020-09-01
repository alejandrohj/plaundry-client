import React from 'react'
import {Card} from 'react-bootstrap';

export default function userOrdersCard(props) {

    const {userId, status, pickUp, delivery} = props.order
    return (
        <div style={{display:'flex', flexWrap: 'wrap'}}>
            <Card style={{ minWidth:'20rem', margin: '20px'}}>
            <Card.Body style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    <h6>Dates:</h6>
                    <p> PickUp day: <b>{pickUp.slice(0,10)}</b></p>
                    <p> Delivery day: <b>{delivery.slice(0,10)}</b></p>
                    <hr/>
                    <h6>{userId.address.city}</h6>
                    <h5><b>{status}</b></h5>
                    {
                        status==='delivered'? <p> Delivered at <b>{delivery.slice(11,16)}</b></p> : status==='to pick up'? <p> Pick up at : <b>{pickUp.slice(11,16)}</b></p> :
                        <p> Will be deliver at: <b>{delivery.slice(11,16)}</b></p>
                }
                </div>
                <div>
                </div>
            </Card.Body>
            </Card>
        </div>
    )
}
