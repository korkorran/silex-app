import { useState } from "react";
import "./NavBar.scss"
import { FaChevronLeft, FaBars } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import { demosDetails } from "./constant";

function NavBar() {
    const [toggled, setToggled] = useState(true);
    const navigate = useNavigate();
    const {pathname} = useLocation()

    const toggle = () => {
        if(toggled) {
            setToggled(false);
        } else {
            setTimeout(() => setToggled(true), 200)
        }
    }
    return (
        <div className="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div className="nav-header">
                { toggled &&
                <div className="nav-title" onClick={() => navigate("/")}>
                    <span className="highlight">Silex </span> <br/>
                    Demos 
                </div>}
                <label htmlFor="nav-toggle" onClick={toggle}>
                    { toggled ? <FaChevronLeft /> : <FaBars />}
                </label>
            </div>
            <hr/>
            <div className="nav-content">
                { demosDetails.map(d => (
                    <div 
                        key={d.path}
                        className={"nav-button"+ (pathname === d.path ? ' active' : '') } 
                        onClick={() => navigate(d.path)}>
                        {d.icon}
                        { toggled && <span>{d.title}</span> }
                    </div>
                ))}
                <div id="nav-content-highlight"></div>
                <div id="nav-content-active"></div>
            </div>
{/*             <hr/>
            <div className="nav-footer">
                Settings
            </div> */}
        </div>
    )
}

export default NavBar;