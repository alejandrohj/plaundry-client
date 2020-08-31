import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {
  console.log(props.order)
  const {orderItems,status,userId,_id} = props.order
  return (
      <div style={{display:'flex', flexWrap: 'wrap'}}>
        <Card style={{ width: '18rem', margin:'40px'}}>
          <Card.Body style={{display: 'flex', alignItems: 'center'}}>
            <div>
              <h5>{userId.name.firstName}</h5>
              <h6>{userId.address.city}</h6>
              <p>{status}</p>
            </div>
            <Link  style ={{marginLeft:'30px'}} to={`/admin/delivery/${_id}/details`}><Button className="general-btn">Details</Button></Link>
          </Card.Body>
        </Card>
      </div>

  )
}
