import { memo, useState } from 'react'
import iconLogo from '../../assets/icon.png'

const Home = memo(() => {
  const [count, setCount] = useState(0)

  return (
    <>
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
})


export default Home