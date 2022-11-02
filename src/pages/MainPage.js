import React from "react";

import classes from './MainPage.module.css';
import Map from "../components/map/Map";
import SideBar from '../components/side_bar/SideBar';

function MainPage() {
    return (
        <div className={classes.grid}>
            <SideBar></SideBar>
            <Map></Map>
        </div>
    );
}

export default MainPage;