import { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <div className='content'>

        <Outlet />
      </div>
    </>
  )
}

export default App
