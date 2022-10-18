import React from "react";

import classes from './MainPage.module.css';
import Map from "../components/map/Map";
import RideList from "../components/ride_list/RideList";

function MainPage() {
    return (
        <div className={classes.grid}>
            <RideList></RideList>
            <Map></Map>
        </div>
    );
}

export default MainPage;