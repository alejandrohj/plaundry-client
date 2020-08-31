import React, { useEffect, useState} from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config';

export default function AdminView(props) {

  const [userLog, setNew] = useState(props.loggedInUser);

  useEffect(() => {
    if(!userLog){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setNew(result.data)
        })
    }
  }, [userLog])
  console.log(userLog)

  return (
    <div>
      {
        !userLog ? <p>Loading...</p> : (
        !props.loggedInUser ? <Redirect to='/admin/sign-in' /> :
      (<>
      <AdminNav adminUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>
      
      <CreateLaundry onCreate={props.onCreate} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} createSucces={props.createSucces}/>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} />
      </>))
      }
    </div>
  )
}
