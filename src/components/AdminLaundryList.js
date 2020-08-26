import React from 'react'
import AdminLaundryCard from './AdminLaundryCard'

export default function AdminLaundryList(props) {
  return (
    <div>
    {
      props.laundrylist.map((laundry, i) => {
        return <AdminLaundryCard onEdit={props.onEdit} onDelete={props.onDelete} item={laundry} key={'laundry' + i}/>
      })
    }
    </div>
  )
}
