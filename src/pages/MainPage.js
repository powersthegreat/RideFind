import React from "react";

import classes from './MainPage.module.css';
import MapLoader from "../components/map/Map";
import SideBar from '../components/side_bar/SideBar';
import { ChakraProvider} from '@chakra-ui/react'
function MainPage() {
    return (
        <div className={classes.grid}>
            <SideBar/>
            <ChakraProvider>
                <MapLoader className="mapContainer"/>
            </ChakraProvider>
           
           
            
        </div>
    );
}

export default MainPage;