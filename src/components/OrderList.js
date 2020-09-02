import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'


export default function OrderList(props) {

  const [orders, setOrders] = useState()
  const [Redirecting, setRedirecting] = useState(false);
  const [userLog, setNew] = useState(props.loggedInUser);

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((result) => {
        console.log('dataorders',result.data)
        setOrders(result.data)
      })
    axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((result) => {
        setNew(result.data)
      })
      .catch(() => {
        setRedirecting(true)
      })
  },[])

  if (Redirecting) {
    return (<Redirect to='/admin/sign-in' />)
  }
  if(!orders) return(<p>Loading...</p>)
  
  return (
    <div className="orderlist-admin">
        <AdminNav adminUser={props.adminUser} onAdminLogOut={props.onAdminLogOut}/>

      {
        orders.map((order, i) => {
          console.log(order)
          return <OrderCard key={'orders'+i} order={order}/>
        })
      }
    </div> 
  )
}
