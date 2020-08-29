import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {

  const {orderItems,status,userId,_id} = props.order
  return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <h5>{userId.firstName}</h5>
        <h6>{userId.city}</h6>
        <p>{status}</p>
        <Link to={`/admin/delivery/${_id}/details`}><Button className="general-btn">Details</Button></Link>
      </Card.Body>
    </Card>

  )
}
