import React from 'react';

import classes from './FilterSortBar.module.css';


function FilterSortBar() {
    return (
        <div className={classes.container}>
            <div className={classes.leftdiv}>
                <h3 className={classes.title}>Rides in Area</h3>
                <p className={classes.location}>1111 Indiana St, Lawrence KS</p>
            </div>
            <div className={classes.rightdiv}>
                <div className={classes.buttonsdiv}>
                    <button className={classes.filterbutton} type="popup">Filter</button>
                    <button className={classes.sortbutton} type="select">Sort</button>
                </div>
            </div>
            <p>filter and sort bar here</p>
        </div>
    );
}

export default FilterSortBar;