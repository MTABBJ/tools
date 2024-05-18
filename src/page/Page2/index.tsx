import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Page2 = memo(() => {
  return (
    <div> <Link to="/home">home</Link></div>
  )
})

export default Page2