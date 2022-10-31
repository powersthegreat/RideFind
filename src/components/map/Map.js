import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import classes from './Map.module.css';

function map() {
    
    // default center if no location services 
    const pos = {
        lat: 28.704060,
        lng: 77.102493
    }

    // get current location if location services are enabled
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
        })
    };
    
    return(
       <Map
       google = {this.props.google}
       style = {{width: "100%", height: "100%" }}
       zoom = {10}
       intialCenter = {
        {
            pos
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
