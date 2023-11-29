import { useState } from "react";
import "./NavBar.scss"
import { FaStar, FaChevronLeft, FaBars, FaPaste } from 'react-icons/fa';
import { SlLink } from "react-icons/sl";
import { RxColorWheel } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [toggled, setToggled] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div className="nav-header">
                { toggled &&
                <div className="nav-title" onClick={() => navigate("/")}>
                    K-R Demos
                </div>}
                <label htmlFor="nav-toggle" onClick={() => setToggled((toggled)=> !toggled)}>
                    { toggled ? <FaChevronLeft /> : <FaBars />}
                </label>
            </div>
            <hr/>
            <div className="nav-content">
                <div className="nav-button" onClick={() => navigate("drag-a-star")}>
                    <FaStar />
                    { toggled && <span>Drag a Star</span> }
                </div>
                <div className="nav-button" onClick={() => navigate("wheel-of-fortune")}>
                    <RxColorWheel />
                    { toggled && <span>Wheel of Fortune</span> }
                </div>
                <div className="nav-button" onClick={() => navigate("post-it")}>
                    <FaPaste />
                    { toggled && <span>Post-It</span>}
                </div>
                <div className="nav-button" onClick={() => navigate("connect-circles")}>
                    <SlLink />
                    { toggled && <span>Connect Circles</span>}
                </div>
                <div id="nav-content-highlight"></div>
            </div>
{/*             <hr/>
            <div className="nav-footer">
                Settings
            </div> */}
        </div>
    )
}

export default NavBar;