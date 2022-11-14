import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css'
import MainLogo from '../side_bar/logos/mainLogo.png';
import HomeLogo from '../side_bar/logos/homeLogo.png';
import TutorialLogo from '../side_bar/logos/tutorialLogo.png';
import ResourceLogo from '../side_bar/logos/resourcesLogo.png';


function MainNavigation() {

    return (
        <header className={classes.header}>
            <div className='mainLogo'>
                <Link to="/">
                    <img style={{ width: 300, height: "4rem", position:'relative'}} src={MainLogo} alt="mainLogo"/>
                </Link>
                
            </div>
            <nav className={classes.header}>
                <ul>
                    <li>
                        <Link to="/">
                            <img style={{ width: 120, height: 48,position:'relative' }} src={HomeLogo} alt="homeLogo"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tutorial">
                            <img style={{ width: 120, height: 48,position:'relative' }} src={TutorialLogo} alt="homeLogo"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/resources">
                            <img style={{ width: 120, height: 48,position:'relative'}} src={ResourceLogo} alt="homeLogo"/>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </header>
    );
}

export default MainNavigation;