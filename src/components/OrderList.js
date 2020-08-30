import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'

export default function OrderList(props) {

  const [orders, setOrders] = useState()

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((result) => {
        // Sort results by status
        //let ordersClone = JSON.parse(JSON.stringify(res.data));
        // let ordering = {};
        // let sortOrder = ['to pick up', 'picked up', 'washing', 'to deliver', 'delivered'];
        // for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
        // ordersClone.sort((a,b) =>   (ordering[a.status] - ordering[b.status]))
        console.log('dataorders',result.data)
        setOrders(result.data)
      })
  },[])
  if(!orders) return(<p>Loading...</p>)
  if(!props.loggedInUser) return(<Redirect to={'/admin/sign-in'} />)
  
  return (
    <div>
        <AdminNav adminUser={props.adminUser} onAdminLogOut={props.onAdminLogOut}/>
      {
        orders.map((order, i) => {
          console.log(order)
          return <OrderCard key={'orders'+i} order = {order}/>
        })
      }
    </div> 
  )
}
