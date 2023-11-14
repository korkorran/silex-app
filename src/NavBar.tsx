import { useState } from "react";
import "./NavBar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faEye, faGears, faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    const [toggled, setToggled] = useState(true);

    return (
        <div className="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div className="nav-header">
                { toggled &&
                <div className="nav-title">
                    CODEBOARD
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
                <div className="nav-button">
                    <FontAwesomeIcon icon={faEye} />
                    { toggled && <span>View Code</span> }
                </div>
                <div className="nav-button">
                    <FontAwesomeIcon icon={faCirclePlay} />
                    { toggled && <span>Workflows</span> }
                </div>
                <div className="nav-button">
                    <FontAwesomeIcon icon={faGears} />
                    { toggled && <span>Models</span>}
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