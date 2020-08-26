import React from 'react'
import AdminNav from './AdminNav'
import CreateLaundry from './CreateLaundry'
import AdminLaundryList from './AdminLaundryList'

export default function AdminView(props) {

  return (
    <div>
      <AdminNav />
  
      <CreateLaundry onCreate={props.onCreate} />
        
      <hr></hr>
      <AdminLaundryList laundrylist={props.laundrylist} onEdit={props.onEdit} onDelete={props.onDelete}/>

    </div>
  )
}
