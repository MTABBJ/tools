import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button, ConfigProvider, Space } from 'antd';

import { localPath } from '@/const'
import './App.css'

import Home from '@/pages/Home'
import Smth from '@/pages/Smth'
import Page1 from '@/pages/Page1'
import Error from '@/pages/Error'
import Loading from '@/components/Loading'

function App() {
  const [flag, setFlag] = useState(false)

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#000',
            borderRadius: 2,
            // 派生变量，影响范围小
            colorBgContainer: '#E5E9F1',
          },
        }}
      >
        {flag && <Loading />}
        {/* <Link to="/home">首页</Link><br /> */}
        {/* <Link to="/page2">页面2</Link><br /> */}

        <Routes>
          <Route path={`${localPath}/`} element={<Home />} />
          <Route path={`${localPath}/smth`} element={<Smth />} />
          <Route path={`${localPath}/page1`} element={<Page1 />} />
          <Route path={`*`} element={<Error />} />
        </Routes>

      </ConfigProvider>
    </>
  )
}

export default App;
