import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import {API_URL} from '../config'
import {Link} from 'react-router-dom';


export default function AmountCart(props) {
    const [laundries, setLaunries] = useState(null)
    useEffect(() => {
        let OrderStorage = JSON.parse(localStorage.getItem('order'));
        OrderStorage? (setLaunries(OrderStorage)):(
            axios.get(`${API_URL}/laundry`)
            .then((res)=>{
                setLaunries(res.data)
            })
        )
    },[props.laundries])
    
    if(!laundries){
        return <p>Loading ....</p>
    }
    
    let total = laundries.reduce((acc,cur)=>{
        return acc + (cur.quantity * cur.price);

    },0)
    return (
        <div>
            <h5>Total:{total}</h5>
        </div>
    )
}
