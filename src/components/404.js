import React from 'react'
import {Link} from 'react-router-dom'

export default function ErrorComponent() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px'}}>
      Page not found! Please take some time to relax.
      <iframe src="https://giphy.com/embed/a1kftfCMBOa0o" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen title="washer"></iframe>
      <Link to='/home'>Or go to our homepage!</Link>
    </div>
  )
}
