import React from 'react'
import Navbar from './Navbar';
import {Spinner} from 'react-bootstrap'

export default function Loading() {
  return (
    <>
    <Navbar />
    <div className="admin-list-container" style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '100%'}}>
      <Spinner animation="border" role="status" style={{color: '#46C5FF'}}></Spinner>
    </div>
    </>
  )
}
