import './App.scss'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import logoUrl from './assets/Konva-react_demos.png';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { demosDetails } from './constant';

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
              <a href='https://github.com/frederic-lang/awesome-konva-react-demos' target='_blank'>
                <FaGithub />
              </a>
            </div>
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
            {demosDetails.map(d => (
              <div key={d.path} className='card' onClick={() => navigate(d.path)}>
                <img src={d.screenshotUrl} className='logo-img' />
                <p>{d.title}</p>
              </div>
            ))}
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
