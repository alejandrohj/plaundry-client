import React from 'react'
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
        
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete} />
      
    </div>
  )
}
