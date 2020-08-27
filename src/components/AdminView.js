import React from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'


export default function AdminView(props) {

  console.log(props.loggedInUser)
  return (
    <>
    {
      !props.loggedInUser ? 
      (<Redirect to={'/admin/sign-in'} />) :(
        <div>
        <AdminNav onAdminLogout={props.onAdminLogOut}/>
        
        <CreateLaundry onCreate={props.onCreate} />
          
        <hr></hr>
        <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete}/>
        
      </div>
      )
    }
    </>
  )
}
