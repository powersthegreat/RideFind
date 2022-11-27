
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

import { useRef, useState, useContext, useEffect } from 'react';
import { RideDataContext } from '../../contexts/RideDataContext';

// let center = { lat: 38.957111, lng: -95.254387 };

// const mykey=process.env.REACT_APP_MY_SECRET_KEY;
const mykey = 'AIzaSyCSPa7qb6AM4fWS6h0rhK_Vgk8E6uh1uAQ';
// console.log(mykey);
function MapLoader() {
  const [center, setCenter] = useState(() => {return { lat: 38.957111, lng: -95.254387 }});
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mykey,
  libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  // const [directionsResponse, setDirectionsResponse] = useState(null)
  const {directionsResponse, setDirectionsResponse} = useContext(RideDataContext);
  const [coordinates, setCoordinates] = useState([[38.95008406477576, -95.23592305902609], [38.956976561477894, -95.27903033200737]]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  useEffect(() => {
    async function userLocationDisplay() {
      async function successCallback(position) {
        let locationLat = position.coords.latitude;
        let locationLng = position.coords.longitude;
        if (locationLat !== null || locationLat !== ""){
          setCenter({ lat: locationLat, lng: locationLng});
        }
      }
  
      async function errorCallback(error) {
        console.log("could not get users location")
      }
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };
  
    userLocationDisplay();
  }, [map])

  if (!isLoaded) {
    return <SkeletonText />
  }

  // API SIMULATION FUNCTION HERE
  async function getRideData(){
    // let start_coordinates = [originRef.current.value];
    // let end_coordinates = [destinationRef.current.value];
    let response = await fetch(`http://localhost:1337/uber/v1.2/estimates/price?start_latitude=${coordinates[0][0]}&start_longitude=${coordinates[0][1]}&end_latitude=${coordinates[1][0]}&end_longitude=${coordinates[1][1]}`);
    let result = await response.json();
    let returnArr = [];
    for(var i=0; i<result.length; i++){
      returnArr[i] = {};
      returnArr[i].company_logo = 'https://clipground.com/images/logo-uber-png-2.png';
      returnArr[i].car_icon = result[i].image;
      returnArr[i].company = 'uber';
      returnArr[i].eta = result[i].eta;
      returnArr[i].ride_time = Math.floor(result[i].duration / 60);
      returnArr[i].cost = parseFloat(result[i].high_estimate);
      // console.log(returnArr[i].cost);
      returnArr[i].vehicle = result[i].display_name;
      returnArr[i].rating = result[i].rating;
      returnArr[i].driver_name = "John Smith";
    }
    
    let response2 = await fetch(`http://localhost:1337/lyft/rides?start_latitude=${coordinates[0][0]}&start_longitude=${coordinates[0][1]}9&end_latitude=${coordinates[1][0]}&end_longitude=${coordinates[1][1]}`);
    let result2 = await response2.json();
    for(var j=0; j<result2.length; j++){
      let temp = {};
      temp.company_logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png';
      temp.car_icon = result2[j].image;
      temp.company = 'lyft';
      temp.eta = result2[j].eta;
      temp.ride_time = Math.floor(result2[j].ride_time / 60);
      temp.cost = parseFloat(result2[j].cost);
      temp.vehicle = result2[j].vehicle;
      temp.rating = result2[j].rating;
      temp.driver_name = "Lyft Driver";
      returnArr.push(temp);
    }
    
    return(returnArr);
  }


  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }

    console.log(coordinates);
    // getting user entered addresses and converting to lat long for api calls
    // origin
    let originFetch = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${originRef.current.value}&key=${mykey}`);
    let originResult = await originFetch.json();
    let originLatLng = originResult.results[0].geometry.location;
    // destination
    let destinationFetch = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destinationRef.current.value}&key=${mykey}`);
    let destinationResult = await destinationFetch.json();
    let destinationLatLng = destinationResult.results[0].geometry.location;
    setCoordinates([[originLatLng.lat, originLatLng.lng],[destinationLatLng.lat, destinationLatLng.lng]]);
    console.log([[originLatLng.lat, originLatLng.lng],[destinationLatLng.lat, destinationLatLng.lng]]);
    // console.log(coordinates);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })

    // CALL API SIMULATION HERE AND ??EXPORT DATA??
    getRideData().then(function(result){

			fetch("http://localhost:1337/writedriverdata",
      {
        method: "POST",
        body: JSON.stringify(result),
        type: 'application/json'
      })
      .then((result) => {
        // console.log(result);
        console.log("post sent")
      })
      .catch((error) => {
        console.log(error);
      })
      
		});


    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='50vh'
      w='50vw'
      
    >
      <Box position='absolute' left={0} top={0} h='183%' w='139.5%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '98.5%', overflow: 'hidden', borderRadius: 10, margin: "5px 0px 0px 0px",}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={5}
        borderRadius='lg'
        m={2}
        marginLeft={350}
        marginTop={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='docked'
        
      >
        <HStack spacing={3} justifyContent='space-between'>
          <Box flexGrow={2}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={3}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button id="calcroute" colorScheme={'messenger'}  type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent=''>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default MapLoader;
