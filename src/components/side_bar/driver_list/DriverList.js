import React from 'react';
import DriverItem from './DriverItem';
import Accordion from './DriverItem2';

import classes from './DriverList.module.css';

function DriverList() {
    return (
        <div className={classes.container}>
            <ul className={classes.list}>
                <Accordion></Accordion>
                <DriverItem></DriverItem>
            </ul>
        </div>
    );
}

export default DriverList;