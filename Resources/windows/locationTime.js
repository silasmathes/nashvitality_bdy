/**
 * @author Silas Mathes
 */

var latlon = 0;
var locationCount = 0;
//from the BenCoding Library
//Define our location monitor object
var locationMonitor = {
    module : null,
    errorEvt : function(e){
    	alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');
        Ti.API.info("Location Monitor Error " + JSON.stringify(e));
    },
    changeEvt : function(e){
        Ti.API.info("Location Monitor Change " + JSON.stringify(e));
         
        locationCallBack(e);
             
    },
    startEvt : function (e){
        Ti.API.info("Location Monitor Start " + JSON.stringify(e)); 
    },
    stopEvt : function(){
        Ti.API.info("Location Monitor Stop " + JSON.stringify(e));              
    },  
    timerEvt : function(){
        Ti.API.info("Location Monitor Stop " + JSON.stringify(e));              
    },              
    start : function(){
        //First we start everything up
        if(locationMonitor.module==null){
            locationMonitor.module = require("bencoding.basicgeo").createLocationMonitor();
            locationMonitor.module.addEventListener('error', locationMonitor.errorEvt);
            locationMonitor.module.addEventListener('start', locationMonitor.startEvt);
            locationMonitor.module.addEventListener('stop', locationMonitor.stopEvt);
            locationMonitor.module.addEventListener('change',locationMonitor.changeEvt);    
            locationMonitor.module.addEventListener('timerFired', locationMonitor.timerEvt);
            Ti.API.info('Location Monitor Listeners Added');                                    
        }
        //Add our configuration parameters
        locationMonitor.module.purpose = "We will only use your location to calculate workout distance, or to find or map nearby parks.  Locations will not be sent outside of the mobile application.";   
        locationMonitor.module.staleLimit = 5;
        locationMonitor.module.accuracy = Ti.Geolocation.ACCURACY_BEST;
        //locationMonitor.module.distanceFilter = 5;
                            
        //Start monitoring for changes
        locationMonitor.module.startMonitoring();
     },
     stop : function(){
        if(locationMonitor.module!=null){
            locationMonitor.module.stopMonitoring();
            Ti.API.info('locationMonitor Stopped');                 
            locationMonitor.module.removeEventListener('error', locationMonitor.errorEvt);
            locationMonitor.module.removeEventListener('start', locationMonitor.startEvt);
            locationMonitor.module.removeEventListener('stop',  locationMonitor.stopEvt);
            locationMonitor.module.removeEventListener('change',locationMonitor.changeEvt);
            locationMonitor.module.removeEventListener('timerFired', locationMonitor.timerEvt);
            Ti.API.info('locationMonitor Listeners Removed');                       
            locationMonitor.module=null;
            latlon = 0;  //reset the initial lat lon    
        }       
    }   
};

//Start up location monitoring




//locationTime based on geolocate
var geolocateEventListenerState = false;
//Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS;


var distanceTraveled = 0;
var rate = 0;  //miles per hour
var startTime;  //keep track of actual exercise starts/resumes/pauses date-time, resets for pauses
var workoutEndTime;  //keep track of date-time when workout Ended 
var totalSecondsElapsed = 0;  //keep track of actual seconds excercised, minus pauses
var pausedTime;  //keep track of date-time when paused
var workoutStartTime; //keep track date-time when workout started
var paused = true; //keep track of paused state
var totalPausedSeconds = 0;  

var skipDistanceTraveledWhilePaused = false; 

exports.getdistanceTraveled = function(){
	return distanceTraveled;
};

exports.getSpeed = function(){
	 var minpermile = 1/(latlon.speed*2.23694/60);
	
	if (isFinite(minpermile) && minpermile > 0.01) {
		return minpermile;
	}
	else {
		return 0;  //meters per second to min per mile
	} 

};

exports.gettotalSecondsElapsed = function(){
	return totalSecondsElapsed;
};

exports.setStartTime = function(sDate) {
	paused = false;
	startTime = sDate;
	workoutStartTime = sDate;
	locationMonitor.start();
	//startLocating();
};

exports.calcTimeDistanceElapsed = function(eDate){
	endTime = eDate;	
	
	var hours = parseInt(totalSecondsElapsed/3600, 10) % 24;
	var minutes = parseInt(totalSecondsElapsed/60, 10) % 60;
	var seconds = totalSecondsElapsed % 60;
	var totalWorkoutSeconds = parseInt(Math.abs(endTime-workoutStartTime)/1000, 10);
	
	var averagePaceMinPerMile = (1/(distanceTraveled/totalSecondsElapsed * 60));
	
	if (averagePaceMinPerMile > 100) {
		averagePaceMinPerMile = "> 100";
	}
	else {
		averagePaceMinPerMile = averagePaceMinPerMile.toFixed(1);
	}; 

    var totalCalculatedTimeSeconds = totalWorkoutSeconds - totalPausedSeconds;
	Ti.API.info("TOTAL CALCULATED SECONDS BASED ON DATE: " + totalCalculatedTimeSeconds);
	Ti.API.info("TOTAL RUNNING SECONDS BASED ON SUBTRACTING INCREMENTAL PAUSES: " + totalSecondsElapsed);
			//var d=new Date();
			//var t=d.toLocaleTimeString();
	var timeValueString=pad(hours,2)+":"+ pad(minutes,2) + ":" + pad(seconds,2);
	return ({totalSecondsElapsed: totalSecondsElapsed, 
			totalPausedSeconds: totalPausedSeconds, 
			timeValueString: timeValueString, 
			totalWorkoutSeconds:totalWorkoutSeconds,
			distanceTraveled:distanceTraveled,
			averagePace: averagePaceMinPerMile});	
};


exports.pauseTime = function(eDate){
	paused = true;
	pausedTime = eDate;
	var elapsedSeconds = parseInt(Math.abs(pausedTime-startTime)/1000, 10);
	locationMonitor.stop();
	totalSecondsElapsed = totalSecondsElapsed + elapsedSeconds;
	Ti.API.info("Paused, Seconds since last start/pause: " + elapsedSeconds + ", and total seconds elapsed now are: " + totalSecondsElapsed);
	return totalSecondsElapsed;
};

exports.resumeTime = function(eDate){
	var newStartTime = eDate;
	var secondsPaused = parseInt(Math.abs(pausedTime-newStartTime)/1000, 10);
	totalPausedSeconds = totalPausedSeconds + secondsPaused;
	paused = false;
	skipDistanceTraveledWhilePaused = true;
	locationMonitor.start();
	startTime = newStartTime; //reset the startTime
	Ti.API.info("Resumed, Duration of pause: " + secondsPaused + ", and total seconds elapsed now are: " + totalSecondsElapsed);
	return totalSecondsElapsed;
};
 
exports.resetTime = function(){
    latlon = 0;
	locationCount = 0;
	distanceTraveled = 0;
	startTime = 0 ;  //keep track of actual exercise starts/resumes/pauses date-time, resets for pauses
    workoutEndTime = 0;  //keep track of date-time when workout Ended 
    totalSecondsElapsed = 0;  //keep track of actual seconds excercised, minus pauses
	pausedTime = 0;  //keep track of date-time when paused
	workoutStartTime = 0; //keep track date-time when workout started
	paused = true; //keep track of paused state
	totalPausedSeconds = 0;
	locationMonitor.stop();  
	
}; 
 
     
function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

//Titanium.Geolocation.distanceFilter = .25;
Ti.Geolocation.purpose = "We will only use your location to calculate workout distance, or to find or map nearby parks.  Locations will not be sent outside of the mobile application.";

// PUBLIC FUNCTION
/**
* @param {Object} _callback call on completion of location query                       

Titanium.App.addEventListener('resumed', handleApplicationPauses);

function handleApplicationPauses(){
	Ti.API.info("The App was resumed.");
	var d = new Date();
	var elapsedSeconds = parseInt(Math.abs(d-startTime)/1000, 10);
	totalSecondsElapsed = totalSecondsElapsed + elapsedSeconds;
} 
*/

function locationCallBack(e){ 
    
        if(e.error) {
            
			Ti.API.info("geolocation error");
			stopLocating();
			alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');
            return;
        }
		//Ti.API.info(e);
        var newlatlon = e.coords;
        var currentAccuracy = e.coords.accuracy;
        Ti.API.info(currentAccuracy); 
        locationCount = locationCount + 1;
        if (latlon === 0 || locationCount < 3) {  //don't add area for the first couple of location attempts, since the GPS can be off. 
        	latlon=newlatlon;
        	
        }
        else {
        	
        	
        	var incrementalDistance = getDistance(latlon.latitude, latlon.longitude, newlatlon.latitude, newlatlon.longitude);
            Ti.API.info(locationCount);
            Ti.API.info(incrementalDistance);            
        	Ti.API.info("***********************");
        	Ti.API.info("inital distance traveled: " + distanceTraveled);
        	if(skipDistanceTraveledWhilePaused && incrementalDistance > 0){
        		skipDistanceTraveledWhilePaused = false;
        		Ti.API.info("skipped distance " + incrementalDistance);
        		
        	
        	} else if (currentAccuracy <= 50)  {
        	   distanceTraveled = distanceTraveled + incrementalDistance;
        	   Ti.API.info("added distance " + incrementalDistance);
            }
            
        	latlon = newlatlon;
        	Ti.API.info("total distance traveled: " + distanceTraveled);
        	Ti.API.info("total seconds elapsed: " + totalSecondsElapsed);
        	Ti.API.info("***********************");
        	Ti.API.info(JSON.stringify(e.coords));
        	
        }
        //Ti.API.info(latlon);
         
};

/*
function startLocating (){
	if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.addEventListener('location', locationCallBack);
	}
	else {
		alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');
	}
};

exports.startLocating = startLocating();

function stopLocating(){
	Titanium.Geolocation.removeEventListener('location', locationCallBack);
};

exports.stopLocating = stopLocating();

Ti.App.addEventListener('location.stop', function(){
	if (geolocateEventListenerState === true) {
		Titanium.Geolocation.removeEventListener("location", locationCallBack);
		geolocateEventListenerState = false;
  }
});


Ti.App.addEventListener('location.start', function(){
  if (geolocateEventListenerState === false) {	
	Titanium.Geolocation.addEventListener('location', locationCallBack);
	geolocateEventListenerState = true;
  }
});
*/

function toRad(Value) {
		/** Converts numeric degrees to radians */
		return Value * Math.PI / 180;
}

exports.createGeoJSON = function(theLatLongTitleArray) {
	theLength = theLatLongTitleArray.length;
	var theGeoJSON = {};
	
	theGeoJSON["type"] = "FeatureCollection";
	var theFeatureArray = [];
	var theFeatureObject = {};
	for (var i = 0, theLength; i<theLength; i++) {
		theGeoJSONFeature = {};
		theGeoJSONFeature["type"] = "Feature";
		theGeoJSONFeature["id"] = i;
		theGeoJSONFeature["properties"] = {"Name":theLatLongTitleArray[i].title, "category":theLatLongTitleArray[i].category, 
											"mapicon":theLatLongTitleArray[i].mapicon, "popupicon":theLatLongTitleArray[i].popupicon, "tableid":theLatLongTitleArray[i].tableid};
		
		theGeoJSONFeature["geometry"] = { "type": "Point", "coordinates": [ theLatLongTitleArray[i].longitude, theLatLongTitleArray[i].latitude] };
		theFeatureArray.push(theGeoJSONFeature);		
	}
	theGeoJSON["features"] = theFeatureArray;
	//alert(JSON.stringify(theGeoJSON));
	return theGeoJSON;
};

/*exports.createGeoJSONFeature = function(theFeatureTitleArray) {
	theLength = theLatLongTitleArray.length;
	theGeoJSON = {};
	
	theGeoJSON["type"] = "FeatureCollection";
	var theFeatureArray = [];
	var theFeatureObject = {};
	for (var i = 0, theLength; i<theLength; i++) {
		theGeoJSONFeature = {};
		theGeoJSONFeature["type"] = "Feature";
		theGeoJSONFeature["id"] = i;
		theGeoJSONFeature["properties"] = {"Name":theLatLongTitleArray[i].title};
		theGeoJSONFeature["geometry"] = { "type": "Point", "coordinates": [ theLatLongTitleArray[i].longitude, theLatLongTitleArray[i].latitude] };
		theFeatureArray.push(theGeoJSONFeature);		
	}
	theGeoJSON["features"] = theFeatureArray;
	return theGeoJSON;
};*/

function getDistance(lat1, lon1, lat2, lon2) {
		var R = 6371;
		// km
		var dLat = toRad(lat2 - lat1);
		var dLon = toRad(lon2 - lon1);
		var lat1 = toRad(lat1);
		var lat2 = toRad(lat2);

		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		d = Math.round(d * 1000);
		var p;
		var type = 1;		
		if(type == 0) {
			if(d > 999) {
				return Math.round(d / 1000) + " km";
			} else {
				return d + " meters";
			}
		} else if(type == 1) {
			//Hardcoded to Return Numeric Miles
			return (d * 0.000621371192);
		}
}  //end getDistance function
exports.getDistance =  getDistance();
