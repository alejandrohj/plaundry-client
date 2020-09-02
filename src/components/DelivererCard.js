import React from 'react'
import {Card, Button} from 'react-bootstrap';

export default function DelivererCard(props) {
    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
                <Card.Title>{props.deliverer.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.deliverer.email}</Card.Subtitle>
            </Card.Body>
            <Button variant="danger" onClick={()=> props.onDelete(props.deliverer._id)}>Remove</Button>
        </Card>
    )
}
