import { useState, useEffect } from 'react'
import './App.css'
import {
  Routes, Route, 
  // Link,
  useLocation 
} from 'react-router-dom'
import Home from './pages/Home'
import Page1 from './pages/Page1'
import Loading from './components/Loading'

function App() {
  // const location = useLocation()
  const [flag, setFlag] = useState(false)


  return (
    <>
      {flag && <Loading />}
      {/* <Link to="/home">首页</Link><br />
      <Link to="/page2">页面2</Link><br /> */}

      <Routes>
        <Route path="/myblog/" element={<Home />} />
        <Route path="/myblog/home" element={<Home />} />
        <Route path="/myblog/page1" element={<Page1 />} />
      </Routes>
    </>


  )
}

export default App;
