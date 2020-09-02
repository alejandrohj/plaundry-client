import React from 'react'
import Navbar from './Navbar';
import {Spinner} from 'react-bootstrap'

export default function Loading() {
  return (
    <>
    <Navbar />
    <div className="admin-list-container" style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
      <Spinner animation="border" role="status"></Spinner>
    </div>
    </>
  )
}
