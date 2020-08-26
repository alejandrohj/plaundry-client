import React from 'react'
import AdminLaundryCard from './AdminLaundryCard'

export default function AdminLaundryList(props) {
  return (
    <div>
    {
      props.laundrylist.map((laundry, i) => {
        return <AdminLaundryCard item={laundry} key={i}/>
      })
    }
    </div>
  )
}
