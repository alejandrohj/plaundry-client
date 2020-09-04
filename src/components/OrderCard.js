import React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function OrderCard(props) {
  const {orderItems,status,userId,_id, pickUp, delivery,message} = props.order
  let colorOfStatus = status ==='to pick up'? '#ff8000': status ==='picked up'? '#00008a': status ==='washing'? '#0080ff' : status ==='to deliver'? '#ffbf00' : '#5e5d5c'
  return (
      <div style={{ display:'flex', flexWrap: 'wrap', height: '500px'}}>
        <Card style={{ minWidth:'20rem', margin:'1rem', borderRadius: '5px',
        border: '1px solid #46C5FF'}}>
          <Card.Body style={{display: 'flex', alignItems: 'center'}}>
            <div style={{color:'#328CB6'}}>
              <h5>{userId.name.firstName}</h5>
              <h6>{userId.address.city}</h6>
              <hr/>
              <h5>Status : <b style={{color: colorOfStatus}}>{status}</b></h5>
              <hr/>
              <h6><u>Dates</u>:</h6>
              {
                status==='to pick up'? <p>Must be picked up the <b>{pickUp.slice(0,10)}</b> at <b>{pickUp.slice(11,16)}h</b></p>:
                <p>Picked up the <b>{pickUp.slice(0,10)}</b> at <b>{pickUp.slice(11,16)}h</b></p>
              }
              {
                status === 'to deliver'? <p>Must be delivered the <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>:
                status === 'delivered'? <p>Delivered the <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>:
                <p>Delivery day: <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>
              }
              <hr/>
              {
                !message ? <p><em>No feedback yet</em></p> : <p>{message}</p>
              }
              <hr/>
              <div style={{ display: 'flex',justifyContent: 'flex-end'}}>
                <Link  style ={{marginLeft:'30px'}} to={`/admin/delivery/${_id}/details`}><Button className="general-btn">Details</Button></Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

  )
}
