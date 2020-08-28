import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config'
import AdminNav from './AdminNav'

export default function OrderDetails(props) {

  const [order, setOrder] = useState(null);
  let id = props.match.params.id

  useEffect(() => {
    axios.get(`${API_URL}/order/${id}`, {withCredentials: true})
      .then((result) => {
          setOrder(result.data)
      })
  }, [])

  const handleStatusChange = (orderStatus) => {
    if (orderStatus === 'to pick up') orderStatus = 'picked up';
    else if (orderStatus === 'picked up') orderStatus = 'washing';
    else if (orderStatus === 'washing') orderStatus = 'to deliver';
    else if (orderStatus === 'to deliver') orderStatus = 'delivered';

    axios.post(`${API_URL}/order/${id}/edit`, {status: orderStatus}, {withCredentials: true})
      .then((result) => {
        result.data.status = orderStatus
        setOrder(result.data)
      })
  }

  if (!order){
    return <p>Loading ....</p>
  }

  const {status} = order

  return (
    <>
    {
      !props.loggedInUser ? 
      <Redirect to={'/admin/sign-in'} /> :
      (
      <div>
        <AdminNav />
        {/* <p>{order.street} {order.postal} {order.city}</p> */}
        <p>Map</p>
        {
          status === 'delivered' ? (<Button disabled={true}>{status}</Button>) :
          ( <Button onClick={() => handleStatusChange(order.status)}>{status}</Button> )
        }
      </div>
      )
    }
    </>
  )
}
