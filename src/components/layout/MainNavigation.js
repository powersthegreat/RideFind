import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css'


function MainNavigation() {

    return (
        <header className={classes.header}>
            <div>RideFind</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/tutorial">Tutorial</Link>
                    </li>
                    <li>
                        <Link to="/resources">Resources</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;