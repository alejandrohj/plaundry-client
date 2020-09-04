import React,{useEffect,useState} from 'react'
import {Redirect} from 'react-router-dom';
import AdminNav from './AdminNav'
import axios from 'axios'
import {API_URL} from '../config';

import Loading from './Loading'

export default function DelivererHomePage(props) {
    const [userLog, setNew] = useState(null);
    const [Redirecting, setRedirecting] = useState(false);
    const [isDeliverer, setIsDeliverer] = useState(false);
  
    useEffect(() => {
        axios.get(`${API_URL}/availability`, {withCredentials: true})
            .then((result) => {
            if (result.data.type === 'deliverer') {
                setIsDeliverer(true)
            }
            setNew(result.data)
            })
            .catch(() => {
            setRedirecting(true)
            })
    }, [])
    if (Redirecting || props.toIntro) {
        return (<Redirect to='/admin/sign-in' />)
      }
    
      if(!userLog){
        return (<Loading />)
      } else if (userLog && !isDeliverer) {
        return (<Redirect to='/' />)
      }

    return (
        <div>
            <AdminNav loggedInUser={userLog} onAdminLogOut={props.onAdminLogOut}/>
        </div>
    )
}
