import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {

  const {street, postal, city, firstName, lastName, status, _id} = props.order

  return (
    
      <Card body className="ordercard">
        <Card.Text>
          {street} {postal} {city} {firstName} {lastName} {status}
          <Link to={`/admin/delivery/${_id}/details`}><Button className="general-btn" variant="primary">See Order</Button></Link>
        </Card.Text>
      </Card>

  )
}
