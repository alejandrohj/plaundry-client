import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'

export default function OrderDetails(props) {

  // API-req order-detail in here
  const [order, setOrder] = useState('')

 
  let id = props.match.params.id

  // When status change: change both the state and change the db

  return (
    <div>
      <p>Address</p>
      <p>Map</p>
      <Button>Orderstatus: {order.status}</Button>
    </div>
  )
}
