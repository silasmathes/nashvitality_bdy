	var latlon;
	//var baseMapAvailable;
	//var inRangeOfNashville = true;
	//nashLat = 36.166437;
	//nashLon = -86.778177;

	function setRange(rangeValue) {
		exports.inRangeOfNashville = rangeValue;
	}

	function checkBaseMapStatus(){
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert( "No internet connection is currently available.  You may still use this app to browse parks and activities, but maps and links to outside websites will not be fully functional. To recheck for connectivity, return to the main Nashvitality screen.");	
			exports.baseMapAvailable = false;
			return false;
		}
		else //check for basemap availability
		{
			var url = "http://maps.nashville.gov/MetGIS/rest/services/Basemaps/NashvilleBasemapMuted_MSD_WGS84/MapServer?f=json";
			 var client = Ti.Network.createHTTPClient({
			     // function called when the response data is available
			     onload : function(e) {
			         //Ti.API.info("Received text: " + this.responseText);
			         //alert(this.responseText);
			         if(JSON.parse(this.responseText).error){  //check for an error message from the GIS Server
			        		alert('The online basemap of Nashville is currently unavailable, and NashVitality will revert to a simple basemap stored on your device. To automatically re-check map availability, return to the main Nashvitality screen.');
			         	exports.baseMapAvailable = false;
			         	//return false;		         	
			         }
			         else {
			         	exports.baseMapAvailable = true;
			         	//return true;
			         }
			     },
			     // function called when an error occurs, including a timeout
			     onerror : function(e) {  //entire GIS server is most likely unavailable
			         Ti.API.debug(e.error);
			         alert('The online basemap of Nashville is currently unavailable, and NashVitality will revert to a simple basemap stored on your device. To automatically re-check map availability, return to the main Nashvitality screen.');
			         exports.baseMapAvailable = false;
			         //return false;
			     },
			     timeout : 5000  // in milliseconds
			 });
			 // Prepare the connection.
			 client.open("GET", url);
			 // Send the request.
			 client.send(); 
			}
		
	}
	
    exports.checkBaseMapStatus = checkBaseMapStatus;
    exports.setRange = setRange;