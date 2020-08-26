import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {

  //const {street, postal, city, firstName, lastName, status, _id} = props.order
  console.log('test', props.order)

  // {/* <Link to={`/admin/delivery/${_id}/details`}> </Link> */}

  return (
    
      <Card body>
        <Card.Text>
          street postal city firstName lastName status
          <Button variant="primary">See</Button>
        </Card.Text>
      </Card>

  )
}
