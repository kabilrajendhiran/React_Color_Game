import {Fragment, Component} from 'react';
import './Navbar.css'

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark custom-navbar">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 p">COLOR GAME</span>
                </div>
            </nav>
        </Fragment>
        );
    }
}

export default NavBar;