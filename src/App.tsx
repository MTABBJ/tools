import { useState, useEffect } from 'react'
import iconLogo from './assets/icon.png'
import './App.css'
import { RouterProvider ,useNavigate} from 'react-router-dom'
import router from './router/index.tsx'
import Loading from './components/Loading'

function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    setFlag(true)

    setTimeout(() => {
      console.log('app-mount, 3S timeout ')

      setFlag(false)
    }, 3000);

  }, [])

  return (
    <>
      {flag && <Loading />}
      <RouterProvider router={router} />
      <div>
        <img src={iconLogo} className="logo" alt="icon logo" />
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
