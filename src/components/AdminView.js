import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import {Redirect} from 'react-router-dom'

export default function AdminView(props) {
  
  console.log(props)
  // if (!props.loggedInUser) {
  //   console.log('redirect')
  //   return <Redirect to='/admin/sign-in' />
  // }

  return (
    <div>
      {
        !props.loggedInUser ? <Redirect to='/admin/sign-in' /> : 
      <>
      <AdminNav adminUser={props.adminUser} onAdminLogOut={props.onAdminLogOut}/>
      
      <CreateLaundry onCreate={props.onCreate} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} createSucces={props.createSucces}/>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} />
      </>
      }

    </div>
  )
}
