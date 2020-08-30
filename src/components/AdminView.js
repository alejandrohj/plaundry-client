import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'


export default function AdminView(props) {

 
  // if (!props.loggedInUser || props.onLogOut) {
  //   return <Redirect to={'/admin/sign-in'} />
  // }

  return (
    <div>
      <AdminNav adminUser={props.adminUser} onAdminLogOut={props.onAdminLogOut}/>
      
      <CreateLaundry onCreate={props.onCreate} />
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete} />
      
    </div>
  )
}
