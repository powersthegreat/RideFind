import React from 'react';
import DriverItem from './DriverItem';

import classes from './DriverList.module.css';

function DriverList() {
    return (
        <div className={classes.container}>
            <DriverItem></DriverItem>
        </div>
    );
}

export default DriverList;