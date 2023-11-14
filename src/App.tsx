import { useState } from 'react'
import './App.css'
import Canva from './Canva'
import NavBar from './NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <div className='content'>

        <Canva />
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
