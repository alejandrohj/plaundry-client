import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {
  console.log(props.order)
  const {orderItems,status,userId,_id, pickUp, delivery} = props.order
  return (
      <div style={{display:'flex', flexWrap: 'wrap'}}>
        <Card style={{ minWidth:'20rem', margin:'1rem'}}>
          <Card.Body style={{display: 'flex', alignItems: 'center'}}>
            <div>
              {
                status==='to pick up'? <p> Date: <b>{pickUp.slice(0,10)}</b></p> :
                <p> Date: <b>{delivery.slice(0,10)}</b></p>
              }
              {
                status==='to pick up'? <p> Pick up at : <b>{pickUp.slice(11,16)}</b></p> :
                <p> Deliver at: <b>{delivery.slice(11,16)}</b></p>
              }
              <p>Status: <b>{status}</b></p>
              <hr></hr>
              <h5>{userId.name.firstName}</h5>
              <h6>{userId.address.city}</h6>
              
            </div>
            <div>
              <Link  style ={{marginLeft:'30px'}} to={`/admin/delivery/${_id}/details`}><Button className="general-btn">Details</Button></Link>
            </div>
          </Card.Body>
        </Card>
      </div>

  )
}
