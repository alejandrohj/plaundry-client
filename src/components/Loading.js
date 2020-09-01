import React from 'react'
import Navbar from './Navbar';
import {Spinner} from 'react-bootstrap'

export default function Loading() {
  return (
    <div className="admin-list-container">
      <Navbar />
      <Spinner animation="border" role="status"></Spinner>
    </div>
  )
}
