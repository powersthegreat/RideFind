import React, { useState } from "react";

import classes from './MainPage.module.css';
import MapLoader from "../components/map/Map";
import SideBar from '../components/side_bar/SideBar';
import { ChakraProvider } from '@chakra-ui/react'
import { RideDataContext } from "../contexts/RideDataContext";

function MainPage() {
    const [directionsResponse, setDirectionsResponse] = useState(null)

    return (
        <div className={classes.grid}>
            <ChakraProvider>
                <RideDataContext.Provider value={{directionsResponse, setDirectionsResponse}}>
                    <SideBar/>
                    <MapLoader className="mapContainer"/>
                </RideDataContext.Provider>
            </ChakraProvider>
            
           
            
        </div>
    );
}

export default MainPage;