/**
 * @author Silas Mathes
 */
//
var geolocateEventListenerState = false;
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS;


var distanceTraveled = 0;
var startTime;  //keep track of actual exercise starts/resumes/pauses date-time, resets for pauses
var workoutEndTime;  //keep track of date-time when workout Ended 
var totalSecondsElapsed = 0;  //keep track of actual seconds excercised, minus pauses
var pausedTime;  //keep track of date-time when paused
var workoutStartTime; //keep track date-time when workout started
var paused = true; //keep track of paused state
var totalPausedSeconds = 0;  

exports.setStartTime = function(sDate) {
	startTime = sDate;
	workoutStartTime = sDate;
};

exports.calcTimeElapsed = function(eDate){
	endTime = eDate;	
	
	var hours = parseInt(totalSecondsElapsed/3600, 10) % 24;
	var minutes = parseInt(totalSecondsElapsed/60, 10) % 60;
	var seconds = totalSecondsElapsed % 60;
	var totalWorkoutSeconds = parseInt(Math.abs(endTime-workoutStartTime)/1000, 10);
	
			//var d=new Date();
			//var t=d.toLocaleTimeString();
	var timeValueString=pad(hours,2)+":"+ pad(minutes,2) + ":" + pad(seconds,2);
	return ({totalSecondsElapsed: totalSecondsElapsed, totalPausedSeconds: totalPausedSeconds, timeValueString: timeValueString, totalWorkoutSeconds:totalWorkoutSeconds });	
};


exports.pauseTime = function(eDate){
	paused = true;
	pausedTime = eDate;
	var elapsedSeconds = parseInt(Math.abs(pausedTime-startTime)/1000, 10);
	
	totalSecondsElapsed = totalSecondsElapsed + elapsedSeconds;
	Ti.API.info("Paused, Seconds since last start/pause: " + elapsedSeconds + ", and total seconds elapsed now are: " + totalSecondsElapsed);
	return totalSecondsElapsed;
};

exports.resumeTime = function(eDate){
	var newStartTime = eDate;
	var secondsPaused = parseInt(Math.abs(pausedTime-newStartTime)/1000, 10);
	totalPausedSeconds = totalPausedSeconds + secondsPaused;
	paused = false;
	startTime = newStartTime; //reset the startTime
	Ti.API.info("Resumed, Duration of pause: " + secondsPaused + ", and total seconds elapsed now are: " + totalSecondsElapsed);
	return totalSecondsElapsed;
};
 
exports.resetTime = function(){

	distanceTraveled = 0;
	startTime = 0 ;  //keep track of actual exercise starts/resumes/pauses date-time, resets for pauses
    workoutEndTime = 0;  //keep track of date-time when workout Ended 
    totalSecondsElapsed = 0;  //keep track of actual seconds excercised, minus pauses
	pausedTime = 0;  //keep track of date-time when paused
	workoutStartTime = 0; //keep track date-time when workout started
	paused = true; //keep track of paused state
	totalPausedSeconds = 0;  
	
}; 
 
     
function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

//Titanium.Geolocation.distanceFilter = .25;
Ti.Geolocation.purpose = "We will only use your location to find or map nearby parks.  Location data will not be sent outside of the mobile application.";

// PUBLIC FUNCTION
/**
* @param {Object} _callback call on completion of location query                       
*/
exports.currentLocation = function(_callback) {
    Titanium.Geolocation.getCurrentPosition(function(e) {

        if(e.error) {
            alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');

            // to keep it simple, just returning null, could be
            // error information
            if(_callback) {
                _callback(e.error);
            }
            return;
        }

        Ti.App.fireEvent('location.updated', e.coords);

        if(_callback) {
        	
        	
            _callback(e.coords);
        }
    });
};


function locationCallBack(e){ 
    
        if(e.error) {
            alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');


            return;
        }
		//Ti.API.info(e);
        latlon = e.coords;
        Ti.App.fireEvent('location.updated', e);       
};



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

exports.getDistance =  function(lat1, lon1, lat2, lon2) {
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
			return (d * 0.000621371192).toFixed(1);
		}
};  //end getDistance function
