import React, { useState, useEffect} from 'react';
import DriverItem from './DriverItem';

import { rideData } from './DriverData';

import classes from './SideBar.module.css';

function SideBar() {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('cost');

    useEffect(() => {
        const sortArray = type => {
          const types = {
            cost: 'cost',
            time: 'ride_time',
            rating: 'rating',
            eta: 'eta',
          };
          let sorted = [];
          const sortProperty = types[type];
          if (sortProperty === "rating") {
            sorted = [...rideData].sort((a, b) => b[sortProperty] - a[sortProperty]);
          } else {
            sorted = [...rideData].sort((b, a) => b[sortProperty] - a[sortProperty]);
          }
          setData(sorted);
        };

        sortArray(sortType);
      }, [sortType]);
    

    return (
        <div className={classes.container}>
            <div className={classes.filtersortbarmain}>
                <div className={classes.leftdiv}>
                    <h3 className={classes.title}>Rides in Area</h3>
                    <p className={classes.location}>Current Location Here</p>
                </div>
                <div className={classes.rightdiv}>
                    <div className={classes.buttonsdiv}>
                        <button className={classes.filterbutton} type="popup">Filter</button>
                        <select className={classes.sortbutton} onChange={(e) => setSortType(e.target.value)}>
                            <option value='cost'>Cost</option>
                            <option value='time'>Time</option>
                            <option value='rating'>Rating</option>
                            <option value='eta'>ETA</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={classes.driverlistmain}>
                <DriverItem data={data} type={sortType}></DriverItem>
            </div>
        </div>
    );
}
export default SideBar;