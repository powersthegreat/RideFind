import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import classes from './Map.module.css';

function map() {
    return(
       <Map
       google = {this.props.google}
       style = {{width: "100%", height: "100%" }}
       zoom = {10}
       intialCenter = {
        {
            lat: 28.704060,
            lng: 77.102493
        }
        }
       
    />
    );
}

export default GoogleApiWrapper(
    {
        apiKey: "AIzaSyCYK8x8EyxKxEba0QftXmrSvC4TsDzlJg0"
    }
)(Map)
