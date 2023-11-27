import './App.scss'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import logoUrl from './assets/Konva-react_demos.png';

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div className='content'>
        { location.pathname == '/' &&
          <div className='card'>
            <img src={logoUrl} className='logo-img' />
            <div>
              <button className='btn'>Press Enter</button>
            </div>
          </div>
        }
        <Outlet />
      </div>
    </>
  )
}

export default App
