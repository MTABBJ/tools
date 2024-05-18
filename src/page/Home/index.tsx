import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Home = memo(() => {

  return (
    <>
      <Link to="/page2">About</Link>
      <div>Home </div>
    </>
  )
})


export default Home