import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'

export default function OrderList(props) {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((res) => {
        setOrders(res.data)
      })
  }, [])

  return (
    <>
    {
      !props.loggedInUser ? 
      <Redirect to={'/admin/sign-in'} /> :
      <div>
        <AdminNav />
        {
          orders.map((order, i) => {
            return <OrderCard key={'order' + i} order={order}/>
          })
        }
        <OrderCard />
      </div>
    }
    </>
  )
}
