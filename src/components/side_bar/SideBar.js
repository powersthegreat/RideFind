
import React, { useState, useEffect, useRef, useContext } from 'react';
import { RideDataContext } from '../../contexts/RideDataContext';
import DriverItem from './DriverItem';

// import { rideData } from './DriverData';

import classes from './SideBar.module.css';

function SideBar() {
    const mykey = 'AIzaSyCYK8x8EyxKxEba0QftXmrSvC4TsDzlJg0';
    const { directionsResponse } = useContext(RideDataContext);
    const [userLocation, setUserLocation] = useState(()=>{
      return ""
    });
    const [rideData, setRideData] = useState([]);
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('cost');
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputEl = useRef("");

    async function userLocationDisplay() {
      async function successCallback(position) {
        let locationLat = position.coords.latitude;
        let locationLng = position.coords.longitude;
        if (locationLat !== null || locationLat !== ""){
          let locaitonFetch = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationLat},${locationLng}&key=${mykey}`);
          let result = await locaitonFetch.json();
          let convertedLocation = result.results[0].formatted_address;
          setUserLocation(convertedLocation);
        }
      }

      async function errorCallback(error) {
        console.log("could not get users location")
      }
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

    userLocationDisplay();

    // const successCallback = (position) => {
    //   let locationLat = position.coords.latitude;
    //   let locationLong = position.coords.longitude;
    //   if (locationLat !== null || locationLat !== ""){
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${mykey}`)
    //     .then((response) => {
    //       console.log("got location")
    //     }).then((result) => {
    //       console.log(result)
    //     }).catch((error) => {
    //       console.log("Error occured while converting user location.")
    //     })
    //   }
    // };
    // const errorCallback = (error) => {
    //   console.log("could not get users location")
    // };
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    async function renderRideData(){
      let response = await fetch('http://localhost:1337/getdriverdata');
      let result = await response.json();
      // console.log("result loaded");
      // console.log(result);
      setRideData(result);
      // console.log("result set");
    }

    useEffect(() => {
      if (directionsResponse !== null){
        renderRideData();
      }
    }, [directionsResponse])

    const getSearchTerm = () => {
      let searchTerm = inputEl.current.value;
      setSearchTerm(searchTerm);
      if (searchTerm !== "") {
        const filtered = rideData.filter((item) => {
          return (Object.values(item)[1] + " " + Object.values(item)[5] + " " + Object.values(item)[6]).toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(filtered);
      } else {
        setSearchResults(data);
      }
    };

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
      }, [sortType, rideData]);

    return (
        <div className={classes.container}>
            <div className={classes.filtersortbarmain}>
                <div className={classes.leftdiv}>
                    <h3 className={classes.title}>Rides in Area</h3>
                    <p className={classes.location}>{userLocation}</p>
                </div>
                <div className={classes.rightdiv}>
                    <div className={classes.buttonsdiv}>
                        <input className={classes.filterbutton} type="text" placeholder='Search' ref={inputEl} onChange={getSearchTerm}></input>
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
                <DriverItem data={searchTerm.length < 1 ? data : searchResults} type={sortType}></DriverItem>
            </div>
        </div>
    );
}
export default SideBar;