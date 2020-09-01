import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../config'

import Navbar from './Navbar';
import UserOrdersCard from './UserOrdersCard';

export default function UserOrders(props) {

    const[Orders, setOrders] = useState(null)
    const[loggedInUser, setLogIn] = useState(props.loggedInUser);

    useEffect(()=>{
        if(!loggedInUser){
            axios.get(`${API_URL}/user`, {withCredentials: true})
              .then((result) => {
                setLogIn(result.data)
                console.log(result.data)
                axios.get(`${API_URL}/orders`, {withCredentials: true})
                    .then((res)=>{
                        let myOrders = res.data.filter((orders)=>{
                            return orders.userId._id === result.data._id
                        })
                        setOrders(myOrders)
                    })
              })
          }
        else{
            axios.get(`${API_URL}/orders`, {withCredentials: true})
                    .then((res)=>{
                      console.log(res.data)
                        let myOrders = res.data.filter((orders)=>{
                            return orders.userId._id === loggedInUser._id
                        })
                        setOrders(myOrders)
                    })
        }    
    },[])
    if(!Orders){
        return <p>Loading...</p>
    }
    return (
        <div style={{height: '100%'}}>
            <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
            <div className="admin-list-container">
            {
                Orders.map((order)=>{
                    return <UserOrdersCard order={order}/>
                })
            }
            </div>
        </div>
    )
}
