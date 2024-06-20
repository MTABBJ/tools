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
import {localPath} from './const'
function App() {
  // const location = useLocation()
  const [flag, setFlag] = useState(false)


  return (
    <>
      {flag && <Loading />}
      {/* <Link to="/home">首页</Link><br />
      <Link to="/page2">页面2</Link><br /> */}

      <Routes>
        <Route path={`${localPath}/smth`} element={<Home />} />
        <Route path={`${localPath}/home`} element={<Home />} />
        <Route path={`${localPath}/page1`} element={<Page1 />} />
      </Routes>
    </>


  )
}

export default App;
