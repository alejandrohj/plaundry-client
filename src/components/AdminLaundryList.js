import React from 'react'
import AdminLaundryCard from './AdminLaundryCard'
import Loading from './Loading'

export default function AdminLaundryList(props) {

  if (!props.laundrylist){
    return <Loading />
  }

  return (

    <div className="admin-list-container">
    {
      props.laundrylist.map((laundry) => {
        return <AdminLaundryCard onEdit={props.onEdit} onDelete={props.onDelete} item={laundry} key={'laundry' + laundry._id} err={props.err} errorMessage={props.errorMessage} handleError={props.handleError} />
      })
    }
    </div>

  )
}
