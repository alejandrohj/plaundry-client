import React from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'
import AdminLaundryCard from './AdminLaundryCard'

export default function AdminView(props) {


  return (
    <div>
      <AdminNav />
  
      {/* Write onCreate function in adminview.js or in app.js? */}
      <CreateLaundry onCreate />
        
      <hr></hr>
      {/* <AdminLaundryList laundrylist={props.laundrylist} /> */}
      <AdminLaundryCard />
    </div>
  )
}
