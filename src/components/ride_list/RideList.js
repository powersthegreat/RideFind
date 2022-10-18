import React from 'react';

import classes from './RideList.module.css';
import FilterSortBar from './FilterSortBar';
import DriverList from './DriverList';

function RideList() {
    return (
        <div className={classes.container}>
            <FilterSortBar></FilterSortBar>
            <DriverList></DriverList>
        </div>
    );
}

export default RideList;