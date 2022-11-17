import React, { useState, useEffect, useRef } from 'react';
import DriverItem from './DriverItem';

//import { rideData } from './DriverData';
import classes from './SideBar.module.css';

var rideData = [];
async function getRideData(){
	let response = await fetch('http://localhost:1337/uber/v1.2/estimates/price?start_latitude=38.95008406477576&start_longitude=-95.23592305902609&end_latitude=38.956976561477894&end_longitude=-95.27903033200737');
	let result = await response.json();
	let returnArr = [];
	for(var i=0; i<result.length; i++){
		returnArr[i] = new Object();
		returnArr[i].company_logo = 'https://clipground.com/images/logo-uber-png-2.png';
		returnArr[i].car_icon = result[i].image;
		returnArr[i].company = 'uber';
		returnArr[i].eta = result[i].eta;
		returnArr[i].ride_time = Math.floor(result[i].duration / 60);
		returnArr[i].cost = parseFloat(result[i].high_estimate);
		console.log(returnArr[i].cost);
		returnArr[i].vehicle = result[i].display_name;
		returnArr[i].rating = result[i].rating;
		returnArr[i].driver_name = "John Smith";
	}
	
	let response2 = await fetch('http://localhost:1337/lyft/rides?start_latitude=38.95008406477576&start_longitude=-95.23592305902609&end_latitude=38.956976561477894&end_longitude=-95.27903033200737');
	let result2 = await response2.json();
	for(var i=0; i<result2.length; i++){
		let temp = new Object();
		temp.company_logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png';
		temp.car_icon = result2[i].image;
		temp.company = 'lyft';
		temp.eta = result2[i].eta;
		temp.ride_time = Math.floor(result2[i].ride_time / 60);
		temp.cost = parseFloat(result2[i].cost);
		temp.vehicle = result2[i].vehicle;
		temp.rating = result2[i].rating;
		temp.driver_name = "Lyft Driver";
		returnArr.push(temp);
	}
	
	return(returnArr);
}


function SideBar() {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('cost');
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputEl = useRef("");

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
		getRideData().then(function(result){
			rideData = result;
			
		});
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