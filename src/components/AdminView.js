import React, { useEffect, useState} from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config';
import Loading from './Loading'

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
    return (<Loading />)
  } else if (userLog && !isAdmin) {
    return (<Redirect to='/' />)
  }

  return (
    <>
      <AdminNav adminUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>
      
      <CreateLaundry onCreate={props.onCreate} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} createSucces={props.createSucces}/>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} />
    </>
  )
}
