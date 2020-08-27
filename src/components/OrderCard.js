import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {

  const {street, postal, city, firstName, lastName, status, _id} = props.order

  return (
    
      <Card body>
        <Card.Text>
          {street} {postal} {city} {firstName} {lastName} {status}
          <Link to={`/admin/delivery/${_id}/details`}><Button variant="primary">See Order</Button></Link>
        </Card.Text>
      </Card>

  )
}
