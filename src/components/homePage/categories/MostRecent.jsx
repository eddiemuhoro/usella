import { ThumbDown, ThumbUp } from '@mui/icons-material'
import React from 'react'

const MostRecent = () => {
  return (
    <div>
      <div className='job-card'>
        <div className='card-title'>
          <h3>Website developer</h3>
          <div style={{ display: 'flex' }}>
            <ThumbUp style={{ color: '#375d06', border: '1px solid gray', padding: '5px', borderRadius: '50%' }} />
            <ThumbDown style={{ color: '#375d06', border: '1px solid gray', padding: '5px', borderRadius: '50%', marginLeft: "10px" }} />
          </div>
        </div>
        <div className='card-content'>
          <div className='card-content-left'>
            <p>Hi, we'd be looking to adjust an HTML for a landing page https://spadia.shop/supplements/ We're using an a/b testing tool Google Optimize, for which we'd need to align our text based on a document with the use of HTML in the tool.</p>
          </div>
        </div>
        {/* skills */}
        <div className='card-skills'>
          <p>HTML</p>
          <p>CSS</p>
        </div>
      </div>
    </div>
  )
}

export default MostRecent