import { useState } from "react";
import "./NavBar.scss"
import { FaStar, FaChevronLeft, FaBars, FaPaste } from 'react-icons/fa';
import { SlLink } from "react-icons/sl";
import { RxColorWheel } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
    const [toggled, setToggled] = useState(true);
    const navigate = useNavigate();
    const {pathname} = useLocation()
    return (
        <div className="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div className="nav-header">
                { toggled &&
                <div className="nav-title" onClick={() => navigate("/")}>
                    <span className="highlight">Awesome </span> <br/>
                    Konva-React <br/>
                    <span className="highlight"> Demos</span>
                </div>}
                <label htmlFor="nav-toggle" onClick={() => setToggled((toggled)=> !toggled)}>
                    { toggled ? <FaChevronLeft /> : <FaBars />}
                </label>
            </div>
            <hr/>
            <div className="nav-content">
                <div 
                  className={"nav-button"+ (pathname === '/drag-a-star' ? ' active' : '') } 
                  onClick={() => navigate("drag-a-star")}>
                    <FaStar />
                    { toggled && <span>Drag a Star</span> }
                </div>
                <div 
                  className={"nav-button"+ (pathname === '/wheel-of-fortune' ? ' active' : '') } 
                  onClick={() => navigate("wheel-of-fortune")}>
                    <RxColorWheel />
                    { toggled && <span>Wheel of Fortune</span> }
                </div>
                <div 
                  className={"nav-button"+ (pathname === '/post-it' ? ' active' : '') }
                  onClick={() => navigate("post-it")}>
                    <FaPaste />
                    { toggled && <span>Post-It</span>}
                </div>
                <div 
                  className={"nav-button"+ (pathname === '/connect-circles' ? ' active' : '') } 
                  onClick={() => navigate("connect-circles")}>
                    <SlLink />
                    { toggled && <span>Connect Circles</span>}
                </div>
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