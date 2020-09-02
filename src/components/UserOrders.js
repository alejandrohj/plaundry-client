import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL, PUBLIC_URL} from '../config'
import {Link,Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap'

import Navbar from './Navbar';
import UserOrdersCard from './UserOrdersCard';

export default function UserOrders(props) {

    const[Orders, setOrders] = useState(null)
    const[loggedInUser, setLogIn] = useState(props.loggedInUser);
    const [Redirecting, setRedirecting] = useState(false);

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
                    .catch(() => {
                        setRedirecting(true)
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
    if(Redirecting || props.toIntro){
        return (<Redirect to={'/sign-in'}/>)
    } 
    if(!Orders){
        return <p>Loading...</p>
    }
    return (
        <div style={{height: '100%'}}>
            <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
            <div className="user-orders-container">
                <Link style={{marginTop: '20px'}} to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}} alt="button"/> Back to the lists</Button></p></Link>
                <div>
                    {
                        Orders.map((order)=>{
                            return <UserOrdersCard order={order}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
