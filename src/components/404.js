import React from 'react'
import {Link} from 'react-router-dom'
import './404.css'

export default function ErrorComponent() {
  return (
    <div className="body-404" >
      <p className='text-404'>Page not found! <br></br>Please take some time to relax.</p>
      <iframe src="https://giphy.com/embed/a1kftfCMBOa0o" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen title="washer"></iframe>
      <Link to='/home' className="link-404">Or go to our homepage!</Link>
    </div>
  )
}
