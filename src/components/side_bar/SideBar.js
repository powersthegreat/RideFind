import React from 'react';

import classes from './SideBar.module.css';
import FilterSortBar from './filter_sort_bar/FilterSortBar';
import DriverList from './driver_list/DriverList';

function SideBar() {
    return (
        <div className={classes.container}>
            <FilterSortBar></FilterSortBar>
            <DriverList></DriverList>
        </div>
    );
}

export default SideBar;