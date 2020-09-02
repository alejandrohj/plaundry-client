import React, { useEffect, useState} from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config';

export default function AdminView(props) {

  const [userLog, setNew] = useState(null);
  const [Redirecting, setRedirecting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          if (result.data.type === 'admin') {
            setIsAdmin(true)
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
    return <p>Loading...</p>
  } else if (userLog && !isAdmin) {
    return (<Redirect to='/' />)
  }

  return (
    <div>

    </div>
  )
}
