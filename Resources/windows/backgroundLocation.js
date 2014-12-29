var latlon = 0;
var newlatlon;
var distanceTraveled = 0;
var timElapsed = 0;
var totalSecondsElapsed = 0;



myInterval=setInterval(function(){myTimer();}, 1000);
   		

function myTimer(){
	totalSecondsElapsed = totalSecondsElapsed + 1;
}

function locationCallBack(e){ 
    
        if(e.error) {
            //alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');
			Ti.API.info("geolocation error");
			stopLocating();
            return;
        }
		//Ti.API.info(e);
        var newlatlon = e.coords;
        
        if (latlon === 0) { 
        	latlon=newlatlon;
        }
        else {
        	
        	
        	var incrementalDistance = getDistance(latlon.latitude, latlon.longitude, newlatlon.latitude, newlatlon.longitude);
            Ti.API.info(incrementalDistance);
        	Ti.API.info("***********************");
        	Ti.API.info("inital distance traveled: " + distanceTraveled);

        	   distanceTraveled = distanceTraveled + incrementalDistance;
        	   Ti.API.info("added distance " + incrementalDistance);
            
            
        	latlon = newlatlon;
        	
        	Ti.API.info("total seconds elapsed: " + totalSecondsElapsed);
        	Ti.API.info("***********************");
        	
        }
        //Ti.API.info(latlon);
         
};

function startLocating (){
	if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.addEventListener('location', locationCallBack);
	}
	else {
		alert('To use the Nashvitality app, make sure that you have enabled the gps on your mobile device.');
	}
}


function toRad(Value) {
		/** Converts numeric degrees to radians */
		return Value * Math.PI / 180;
}


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




startLocating();
