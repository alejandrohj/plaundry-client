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
        // Sort results by status
        let ordersClone = JSON.parse(JSON.stringify(res.data));
        let ordering = {};
        let sortOrder = ['to pick up', 'picked up', 'washing', 'to deliver', 'delivered'];
        for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
        ordersClone.sort((a,b) =>   (ordering[a.status] - ordering[b.status]))
        setOrders(ordersClone)
      })
  }, [])

  return (
    <>
    {
      !props.loggedInUser ? 
      (<Redirect to={'/admin/sign-in'} />) :
      (
      <div>
        <AdminNav />
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
