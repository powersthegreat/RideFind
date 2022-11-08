
import React, { useState, useEffect} from 'react';
import { rideData } from './DriverData';
import DriverItem from './DriverItem';

import classes from './SideBar.module.css';

import React from 'react';

import classes from './SideBar.module.css';
import FilterSortBar from './filter_sort_bar/FilterSortBar';
import DriverList from './driver_list/DriverList';

function SideBar() {
    return (
        <div className={classes.container}>
            <div className={classes.filtersortbarmain}>
                <div className={classes.leftdiv}>
                    <h3 className={classes.title}>Rides in Area</h3>
                    <p className={classes.location}>1111 Indiana St, Lawrence KS</p>
                </div>
                <div className={classes.rightdiv}>
                    <div className={classes.buttonsdiv}>
                        <button className={classes.filterbutton} type="popup">Filter</button>
                        <select className={classes.sortbutton}>
                            <option value='cost'>Cost</option>
                            <option value='time'>Time</option>
                            <option value='rating'>Rating</option>
                            <option value='eta'>ETA</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={classes.driverlistmain}>
                <DriverItem></DriverItem>
            </div>
              <FilterSortBar></FilterSortBar>
            <DriverList></DriverList>
        </div>
    );
}

export default SideBar;