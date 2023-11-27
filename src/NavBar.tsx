import { useState } from "react";
import "./NavBar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faGears, faChevronLeft, faBars, faStar, faPaste } from '@fortawesome/free-solid-svg-icons'
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
                    { toggled ? 
                        <FontAwesomeIcon icon={faChevronLeft}/> :
                        <FontAwesomeIcon icon={faBars}/>
                    }
                </label>
            </div>
            <hr/>
            <div className="nav-content">
                <div className="nav-button" onClick={() => navigate("drag-a-star")}>
                    <FontAwesomeIcon icon={faStar} />
                    { toggled && <span>Drag a Star</span> }
                </div>
                <div className="nav-button" onClick={() => navigate("wheel-of-fortune")}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                    { toggled && <span>Wheel of Fortune</span> }
                </div>
                <div className="nav-button" onClick={() => navigate("post-it")}>
                    <FontAwesomeIcon icon={faPaste} />
                    { toggled && <span>Post-It</span>}
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