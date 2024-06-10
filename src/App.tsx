import './App.scss'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import logoUrl from './assets/Silex-demos.png';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { demosDetails } from './constant';
import Giscus from '@giscus/react';

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
          <div className='board'>
            <img src={logoUrl} className='logo-img' />
            <div>
              <a href='https://github.com/silex-camp/silex-demos' target='_blank'>
                <FaGithub />
              </a>
            </div>
            <p>A bootstrap app for Silex</p>
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
        { location.pathname.startsWith('/demos/') && 
          <>
            <div className='board'>
              <Outlet />
            </div>
            <Giscus
              key={location.pathname}
              id="comments"
              repo="silex-camp/silex-demos"
              repoId="R_kgDOKtUG1g"
              category="Announcements"
              categoryId="DIC_kwDOKtUG1s4Cbi04"
              mapping="pathname"
              term="Welcome to @giscus/react component!"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="light"
              lang="en"
              loading="lazy"
            />
          </>
        }
      </div>
    </>
  )
}

export default App
