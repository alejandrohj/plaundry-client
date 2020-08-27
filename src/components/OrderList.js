import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default function OrderList(props) {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((res) => {
        setOrders(res.data)
      })
  }, [])

  // Sort by status. BUT status is not alphabetical, so you have to set a number or something to each status and sort on that
  const handleSort = () => {
    let ordersClone = JSON.parse(JSON.stringify(orders));
    ordersClone.sort((a,b) =>  {
    
    })
    console.log(ordersClone)
    setOrders(ordersClone)
  }

  return (
    <>
    {
      !props.loggedInUser ? 
      (<Redirect to={'/admin/sign-in'} />) :
      (
      <div>
        <AdminNav />
        <Button onClick={handleSort}>Sort by status</Button>
        {
          orders.map((order, i) => {
            return <OrderCard key={'order' + i} order={order}/>
          })
        }
        </div>
      )
    }
    </>
  )
}
