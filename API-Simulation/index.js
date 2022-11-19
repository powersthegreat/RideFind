const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { queries } = require('@testing-library/react');
const port = 1337;
const hostname = '127.0.0.1';
const qs = require('querystring');
const { type } = require('os');

let postedRideData = [];

class UberProduct {
	constructor(productType){
		if(productType == "uberblack"){
			this.upfront_fare_enabled = true;
			this.capacity = 4;
			this.product_id = "d4abaae7-f4d6-4152-91cc-77523e8165a4";
			this.price_details = new Object();
			this.price_details.service_fees = [];
			this.price_details.cost_per_minute = 0.65;
			this.price_details.distance_unit = "mile";
			this.price_details.minimum = 15;
			this.price_details.cost_per_distance = 3.75;
			this.price_details.base = 8;
			this.price_details.cancellation_fee = 10;
			this.price_details.currency_code = "USD";
			this.image = "http:\/\/d1a3f4spazzrp4.cloudfront.net\/car-types\/mono\/mono-black.png";
			this.cash_enabled = false;
			this.shared = false;
			this.short_description = "BLACK";
			this.display_name = "BLACK";
			this.product_group = "uberblack";
			this.description = "THE ORIGINAL UBER";
		}
		if(productType == "rideshare"){
			this.upfront_fare_enabled = true;
			this.capacity = 2;
			this.product_id = "26546650-e557-4a7b-86e7-6a3942445247";
			this.price_details = new Object();
			this.price_details.service_fees = [];
			this.price_details.service_fees[0] = new Object();
			this.price_details.service_fees[0].fee = 2;
			this.price_details.service_fees[0].name = "Booking fee";
			this.price_details.cost_per_minute = 0.15;
			this.price_details.distance_unit = "mile";
			this.price_details.minimum = 7.45;
			this.price_details.cost_per_distance = 1.1;
			this.price_details.base = 2;
			this.price_details.cancellation_fee = 5;
			this.price_details.currency_code = "USD";
			this.image = "http:\/\/d1a3f4spazzrp4.cloudfront.net\/car-types\/mono\/mono-uberx.png";
			this.cash_enabled = false;
			this.shared = true;
			this.short_description = "POOL";
			this.display_name = "POOL";
			this.product_group = "rideshare";
			this.description = "Share the ride, split the cost.";			
		}
		if(productType == "uberx"){
			this.upfront_fare_enabled = true;
			this.capacity = 2;
			this.product_id = "2d1d002b-d4d0-4411-98e1-673b244878b2";
			this.price_details = new Object();
			this.price_details.service_fees = [];
			this.price_details.service_fees[0] = new Object();
			this.price_details.service_fees[0].fee = 0.55;
			this.price_details.service_fees[0].name = "Booking fee";
			this.price_details.cost_per_minute = 0.4;
			this.price_details.distance_unit = "km";
			this.price_details.minimum = 9;
			this.price_details.cost_per_distance = 1.45;
			this.price_details.base = 2.5;
			this.price_details.cancellation_fee = 10;
			this.price_details.currency_code = "AUD";
			this.image = "http:\/\/d1a3f4spazzrp4.cloudfront.net\/car-types\/mono\/mono-uberx.png";
			this.cash_enabled = false;
			this.shared = false;
			this.short_description = "uberX";
			this.display_name = "uberX";
			this.product_group = "uberx";
			this.description = "Everyday rides that are always smarter than a taxi";
		}
		if(productType == "taxi"){
			this.upfront_fare_enabled = true;
			this.capacity = 4;
			this.product_id = "3ab64887-4842-4c8e-9780-ccecd3a0391d";
			this.price_details = new Object();
			this.price_details.service_fees = [];
			this.price_details.cost_per_minute = 0.55;
			this.price_details.distance_unit = "mile";
			this.price_details.minimum = 3.5;
			this.price_details.cost_per_distance = 2.75;
			this.price_details.base = 3.5;
			this.price_details.cancellation_fee = 5;
			this.price_details.currency_code = "USD";
			this.image = "http:\/\/d1a3f4spazzrp4.cloudfront.net\/car-types\/mono\/mono-taxi.png";
			this.cash_enabled = false;
			this.shared = false;
			this.short_description = "TAXI";
			this.display_name = "TAXI";
			this.product_group = "taxi";
			this.description = "TAXI WITHOUT THE HASSLE";
		}
	}
}

class UberEstimate{
	constructor(product, dist){
		this.localizedDisplayName=product.display_name;
		this.distance=dist;
		this.display_name=product.display_name;
		this.product_id = product.product_id;
		this.duration = (dist / (0.75 + (Math.random()*0.50 - 0.25)) * 60);
		this.high_estimate = (product.price_details.base + (Math.ceil((this.duration/60)) * (product.price_details.cost_per_minute)) + (dist * Math.ceil(product.price_details.cost_per_distance))).toFixed(2);
		this.low_estimate = (product.price_details.base + (Math.floor((this.duration/60)) * (product.price_details.cost_per_minute))+ (dist * Math.floor(product.price_details.cost_per_distance))).toFixed(2);
		this.estimate = "$"+this.low_estimate+"-"+this.high_estimate;
		this.currency_code = product.price_details.currency_code;
		this.image = product.image;
		this.eta = Math.floor(Math.random()*3 + 2);
		this.rating = Math.ceil(5-(Math.random()*4));
	}
}
    
class LyftEstimate{
	constructor(dist){
		this.image = 'https://findicons.com/files/icons/766/base_software/256/user1.png';
		this.ride_time = (dist / (0.75 + (Math.random()*0.50 - 0.25)) * 60);
		this.cost = (dist * 3.50 + 2.75).toFixed(2);
		this.eta = Math.floor(Math.random()*3 + 2);
		this.rating = Math.ceil(5-(Math.random()*4));
		this.vehicle = "Lyft";
	}
}

function latLongDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}




const server = http.createServer((request,response)=>{
	const current_url = new URL("http://127.0.0.1" + request.url);
	response.setHeader('Access-Control-Allow-Origin','*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	if(request.method == 'GET'){
		
		if(current_url.pathname === '/'){
			response.statusCode = 200;
			response.setHeader('Content-Type','application/json');
			response.setHeader('Access-Control-Allow-Origin','*');
			response.write('Hello there!\n');
			response.end();
		}
		if(current_url.pathname === '/uber/v1.2/products'){
			var latitude = current_url.searchParams.get("latitude");
			var longitude = current_url.searchParams.get("longitude");
			latitude = parseFloat(latitude);
			longitude = parseFloat(longitude);
			if(isNaN(latitude) || isNaN(longitude)){
				response.statusCode = 400;
				response.write("{\"code\":\"bad request\",\"message\":\"Missing or invalid parameters.\"}");
				response.end();
			}else{
				var products = new Object();
				products.products = [];
				products.products[0] = new UberProduct("uberblack");
				products.products[1] = new UberProduct("rideshare");
				products.products[2] = new UberProduct("uberx");
				products.products[3] = new UberProduct("taxi");
				response.statusCode = 200;
				response.setHeader('Content-Type','application/json');
				response.write(JSON.stringify(products));
				response.end();
			}
		}
		if(current_url.pathname === '/uber/v1.2/estimates/price'){
			var start_latitude = current_url.searchParams.get("start_latitude");
			var start_longitude = current_url.searchParams.get("start_longitude");
			var end_latitude = current_url.searchParams.get("end_latitude");
			var end_longitude = current_url.searchParams.get("end_longitude");
			var seat_count = current_url.searchParams.get("seat_count");
			start_latitude = parseFloat(start_latitude);
			end_latitude = parseFloat(end_latitude);
			start_longitude = parseFloat(start_longitude);
			end_longitude = parseFloat(end_longitude);
			if(isNaN(start_latitude) || isNaN(start_longitude) || isNaN(end_latitude) || isNaN(end_longitude)){
				response.statusCode = 400;
				response.setHeader('Content-Type','application/json');
				response.write("{\"code\":\"bad request\",\"message\":\"Missing or invalid parameters.\"}");
				response.end();
			}else{
				response.statusCode = 200;
				response.setHeader('Content-Type','application/json');
				var prices = [];
				var products = [];
				products[0] = new UberProduct("uberblack");
				products[1] = new UberProduct("rideshare");
				products[2] = new UberProduct("uberx");
				products[3] = new UberProduct("taxi");
				
				var distance = latLongDistance(start_latitude, start_longitude, end_latitude, end_longitude, "M");
				var numOfResults = Math.floor(Math.random() * 10 + 5);
				for(var i=0; i<numOfResults; i++){
					var productNumber = Math.floor(Math.random() * 4);
					prices[i] = new UberEstimate(products[productNumber],distance);
					
				}
				
				response.write(JSON.stringify(prices));
				response.end();
			}
		}
		
		
		if(current_url.pathname === '/lyft/rides'){
			var start_latitude = current_url.searchParams.get("start_latitude");
			var start_longitude = current_url.searchParams.get("start_longitude");
			var end_latitude = current_url.searchParams.get("end_latitude");
			var end_longitude = current_url.searchParams.get("end_longitude");
			var seat_count = current_url.searchParams.get("seat_count");
			start_latitude = parseFloat(start_latitude);
			end_latitude = parseFloat(end_latitude);
			start_longitude = parseFloat(start_longitude);
			end_longitude = parseFloat(end_longitude);
			if(isNaN(start_latitude) || isNaN(start_longitude) || isNaN(end_latitude) || isNaN(end_longitude)){
				response.statusCode = 400;
				response.setHeader('Content-Type','application/json');
				response.write("{\"code\":\"bad request\",\"message\":\"Missing or invalid parameters.\"}");
				response.end();
			}else{
				response.statusCode = 200;
				response.setHeader('Content-Type','application/json');
				var prices = [];
				
				var distance = latLongDistance(start_latitude, start_longitude, end_latitude, end_longitude, "M");
				var numOfResults = Math.floor(Math.random() * 10 + 5);
				for(var i=0; i<numOfResults; i++){
					prices[i] = new LyftEstimate(distance);
					
					
				}
				
				response.write(JSON.stringify(prices));
				response.end();
			}
		}

		if(current_url.pathname === '/getdriverdata'){
			response.statusCode = 200;
			response.setHeader('Content-Type','application/json');
			response.setHeader('Access-Control-Allow-Origin','*');
			response.write(JSON.stringify(postedRideData));
			response.end();
		}

	} else if(request.method === "POST") {
		if (request.url === "/writedriverdata") {
		  var requestBody = '';
		  request.on('data', function(data) {
			requestBody += data;
			if(requestBody.length > 1e7) {
			  response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
			  response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
			}
		  });
		  request.on('end', function() {
			var formData = requestBody;
			// console.log(true);
			// // console.log(formData);
			// console.log(typeof formData);

			postedRideData = JSON.parse(formData);
			console.log("post stored");
	
			// fs.writeFile("data.txt", formData, (err) => {
			// 	if (err) throw err;
			// 	console.log("done writing....");
			//   });

			// console.log(postedRideData);
			
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('<!doctype html><html><head><title>response</title></head><body>');
			response.write('Thanks for the data!<br />User Name: '+formData.UserName);
			response.write('<br />Repository Name: '+formData.Repository);
			response.write('<br />Branch: '+formData.Branch);
			response.end('</body></html>');
		  });
		} else {
		  response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
		  response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
		}

	}else{
		response.statusCode = 405;
		
	}
});

server.listen(port,hostname, ()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
	
});