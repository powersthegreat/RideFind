import React from 'react';
import DriverItem from './DriverItem';

import classes from './DriverList.module.css';

function DriverList() {
    return (
        <div className={classes.container}>
            <ul className={classes.list}>
                <DriverItem></DriverItem>
                <DriverItem></DriverItem>
                <DriverItem></DriverItem>
                <DriverItem></DriverItem>
            </ul>
        </div>
    );
}

export default DriverList;