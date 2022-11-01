import React from 'react';

import classes from './DriverItem.module.css';


function DriverItem() {
    return (
        <li>
            <div className={classes.listitem}>
                <div className={classes.container1}>
                    <img src='https://clipground.com/images/logo-uber-png-2.png' alt="logo" width="50" height="auto"></img>
                </div>
                <div className={classes.container2}>
                    $19.98
                </div>
                <div className={classes.container3}>
                    19 minutes away
                </div>
            </div>
        </li>
    );
}

export default DriverItem;