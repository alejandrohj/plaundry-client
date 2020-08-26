import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'

export default function OrderList() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/orders`)
      .then((res) => {
        setOrders(res.data)
      })
  }, [])

  return (
    <div>
      <AdminNav />
      {
        orders.map((order, i) => {
          return <OrderCard key={'order' + i} order={order}/>
        })
      }
      <OrderCard />
    </div>
  )
}
