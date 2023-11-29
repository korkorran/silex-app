import './App.scss'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import logoUrl from './assets/Konva-react_demos.png';
import dragAStarUrl from './assets/screenshot-drag-a-star.png';
import wheelOfFortuneUrl from './assets/screenshot-wheel-of-fortune.png';
import postItUrl from './assets/screenshot-post-it.png';
import connectCirclesUrl from './assets/screenshot-connect-circles.png';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const [hasPressEnter, setHasPressEnter] = useState(false)
  const navigate = useNavigate();

  useEffect(() => setHasPressEnter(false), [])

  return (
    <>
      <NavBar />
      <div className='content'>
        { location.pathname == '/' && !hasPressEnter &&
          <div className='card'>
            <img src={logoUrl} className='logo-img' />
            <div>
              <button className='btn' onClick={()=>setHasPressEnter(true)}>Press Enter</button>
            </div>
          </div>
        }
        { location.pathname == '/' && hasPressEnter &&
          <div className='grid'>
            <div className='large'>
              <h1>Demos</h1>
            </div>
            <div className='card' onClick={() => navigate("drag-a-star")}>
              <img src={dragAStarUrl} className='logo-img' />
              <p>Drag a Star</p>
            </div>
            <div className='card' onClick={() => navigate("wheel-of-fortune")}>
              <img src={wheelOfFortuneUrl} className='logo-img' />
              <p>Wheel of Fortune</p>
            </div>
            <div className='card' onClick={() => navigate("post-it")}>
              <img src={postItUrl} className='logo-img' />
              <p>Post-it</p>
            </div>
            <div className='card' onClick={() => navigate("connect-circles")}>
              <img src={connectCirclesUrl} className='logo-img' />
              <p>Connect Circles</p>
            </div>
            <div className='large'>
              <button className='btn' onClick={()=>setHasPressEnter(false)}>Close Menu</button>
            </div>
          </div>
        }
        <Outlet />
      </div>
    </>
  )
}

export default App
