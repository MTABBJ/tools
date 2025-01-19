import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button, ConfigProvider, Space } from 'antd';

import { localPath } from '@/const'
import './App.css'

import Home from '@/pages/Home'
import Smth from '@/pages/Smth'
import Metronome from '@/pages/Metronome'
import Drawarea from '@/pages/Drawarea'
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
        <Routes>
          <Route path={`${localPath}/`} element={<Home />} />
          <Route path={`${localPath}/smth`} element={<Smth />} />
          <Route path={`${localPath}/metronome`} element={<Metronome />} />
          {/* <Route path={`${localPath}/drawarea`} element={<Drawarea />} /> */}
          <Route path={`*`} element={<Error />} />
        </Routes>

      </ConfigProvider>
    </>
  )
}

export default App;
