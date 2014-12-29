//Master View Component Constructor


function MasterWindow() {
	
	//var latlon;
	//var baseMapAvailable;
	//var inRangeOfNashville = true;
	nashLat = 36.166437;
	nashLon = -86.778177;
	
	//create object instance, parasitic subclass of Observable
	function CurrentOrientation()
	{
 
	    var w = Titanium.Platform.displayCaps.platformWidth;
	    var h = Titanium.Platform.displayCaps.platformHeight;
	    
	    if( w > h){
	       	width = Ti.Platform.displayCaps.platformHeight;
			height = Ti.Platform.displayCaps.platformWidth;
	    }
	    else
	    {
	        height = Ti.Platform.displayCaps.platformHeight;
			width = Ti.Platform.displayCaps.platformWidth;
	   	}
	}
	
	function checkBaseMapStatus(){
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert( "No internet connection is currently available.  You may still use this app to browse parks and activities, but maps and links to outside websites will not be fully functional. To recheck for connectivity, return to the main Nashvitality screen.");	
			baseMapAvailable = false;
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
			         	baseMapAvailable = false;
			         	//return false;		         	
			         }
			         else {
			         	baseMapAvailable = true;
			         	//return true;
			         }
			     },
			     // function called when an error occurs, including a timeout
			     onerror : function(e) {  //entire GIS server is most likely unavailable
			         Ti.API.debug(e.error);
			         alert('The online basemap of Nashville is currently unavailable, and NashVitality will revert to a simple basemap stored on your device. To automatically re-check map availability, return to the main Nashvitality screen.');
			         baseMapAvailable = false;
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
	
	CurrentOrientation();
	
	var geoTools = require('/windows/geolocate');
	var checkBaseMap = require('/utility/basemap_available');

    var baseMapStatus = checkBaseMap.checkBaseMapStatus();
	
	//create object instance
	var mainWindow = Ti.UI.createWindow({
        backgroundImage: '/images/backgrounds/background_plain.png',
        height: height,
        width: width,
        top:0,
        navBarHidden: true,
        fullscreen: false,
		orientationModes: [Ti.UI.PORTRAIT]
    });
	

	//mainWindow.top = 20;	
	//mainWindow.orientationModes = [Ti.UI.PORTRAIT];
	var navGroup = Ti.UI.iOS.createNavigationWindow({
    	window: mainWindow
    });
    
    mainWindow.navGroup = navGroup;
	
	
	var logo = Ti.UI.createImageView({
		backgroundImage: '/images/logos/nashvitalityLogo.png',
		height: height * 0.25,
		width: width * 0.9,
		top: height * 0.04
	});
	
	verticalLine = Ti.UI.createView({
		right: width /2,
		height: height * 0.7,
		width: 2,
		backgroundColor: '#CAD7D6',
		top: height * 0.23
	});
	
	horizontalLine1 = Ti.UI.createView({
		right: width * 0.018,
		width: width * 0.96,
		height: 2,
		backgroundColor: '#CAD7D6',
		top: height * 0.4
	});
	
	horizontalLine2 = Ti.UI.createView({
		right: width * 0.018,
		width: width * 0.96,
		height: 2,
		backgroundColor: '#CAD7D6',
		top: height * 0.57
	});
	
	horizontalLine3 = Ti.UI.createView({
		right: width * 0.018,
		width: width * 0.96,
		height: 2,
		backgroundColor: '#CAD7D6',
		top: height * 0.75
	});
	
	mainWindow.add(logo);
	mainWindow.add(verticalLine);
	mainWindow.add(horizontalLine1);
	mainWindow.add(horizontalLine2);
	mainWindow.add(horizontalLine3);
	
	mainWindow.addEventListener('blur', function(){			
			
	
				mainWindow.removeEventListener('blur', function(){});		
		});
	
	
	var foot = Ti.UI.createButton({backgroundImage: '/images/buttons/byFoot.png',left: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.24});
	var bike = Ti.UI.createButton({backgroundImage: '/images/buttons/byBike.png',right: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.24});
	var parks = Ti.UI.createButton({backgroundImage: '/images/buttons/parksGreenways.png',left: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.41});
	var water = Ti.UI.createButton({backgroundImage: '/images/buttons/water.png',right: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.41});
	var green = Ti.UI.createButton({backgroundImage: '/images/buttons/green.png',left: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.59});
	var explore = Ti.UI.createButton({backgroundImage: '/images/buttons/explore.png',right: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.59});
	var news = Ti.UI.createButton({backgroundImage: '/images/buttons/news.png',left: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.76});
	var about = Ti.UI.createButton({backgroundImage: '/images/buttons/about.png',right: width * 0.015,height: width * .25, width: width * 0.460, top: height * 0.76});
	
		
	if (Ti.Platform.osname == 'ipad')  
	{  
    //mainWindow.backgroundImage = 'images/backgrounds/background_main_ipad.png';
    var foot = Ti.UI.createButton({backgroundImage: '/images/buttons/byFoot.png',left: 38,height: 160, width:295, top: 250});
	var bike = Ti.UI.createButton({backgroundImage: '/images/buttons/byBike.png',right: 38,height: 160, width:295, top: 250});
	var parks = Ti.UI.createButton({backgroundImage: '/images/buttons/parksGreenways.png',left: 38,height: 160, width:295, top: 430});
	var water = Ti.UI.createButton({backgroundImage: '/images/buttons/water.png',right: 38,height: 160, width:295, top: 430});
	var green = Ti.UI.createButton({backgroundImage: '/images/buttons/green.png',left: 38,height: 160, width:295, top: 610});
	var explore = Ti.UI.createButton({backgroundImage: '/images/buttons/explore.png',right: 38,height: 160, width:295, top: 610});
	var news = Ti.UI.createButton({backgroundImage: '/images/buttons/news.png',left: 38,height: 160, width:295, top: 790});
	var about = Ti.UI.createButton({backgroundImage: '/images/buttons/about.png',right: 38,height: 160, width:295, top: 790});
	
		
	
	var terms = Ti.UI.createLabel({
   		font:{fontSize:18,fontFamily:'Helvetica-Bold'},
        color: '#7C7C7F',
        text: 'Terms & Conditions',
        bottom: 2,
        textAlign: 'center'
   	});	
    
	};
	
	var icons = [foot, bike, parks, water, green, explore, news, about];
	
	for (var i=0;i<icons.length;i++) { 
		mainWindow.add(icons[i]);
	}
	
	
	explore.addEventListener('click', function(e){
   		//createAboutWindow();
   		//activity.createLoadingListeners();
   		//Ti.App.fireEvent('showIndicator');
   			
			Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
			
   			var exploreWindow = require('/windows/explore');
 

		
  
   		
   		geoTools.currentLocation(locationCallback);
		function locationCallback(e) {
			navGroup.openWindow(exploreWindow(e, navGroup));

		}
		
		
	});
	
	
	about.addEventListener('click', function(e){
   		//createAboutWindow();
   		var aboutWindow = require ('/windows/about');
   		navGroup.openWindow(new aboutWindow(navGroup));
		
		});
	
	news.addEventListener('click', function(e){
		var newsWindow = require('/windows/news_events');
		navGroup.openWindow(new newsWindow(navGroup));	
	});
	
	foot.addEventListener('click', function(e){
		
		var footWindow = require('/windows/byFoot');
		geoTools.currentLocation(locationCallback);
		function locationCallback(e) {
			navGroup.openWindow(new footWindow(e, navGroup));			
		}
	
	});
	
	bike.addEventListener('click', function(e){
		var bikeWindow = require('/windows/byBike');
		geoTools.currentLocation(locationCallback);
				function locationCallback(e) { 
				  	navGroup.openWindow(new bikeWindow(e, navGroup));
				}
			});
	
	
	parks.addEventListener('click', function(e){
		var parksWindow = require('/windows/parks_greenways');
		geoTools.currentLocation(locationCallback);
				function locationCallback(e) { 
					navGroup.openWindow(new parksWindow(e, navGroup));
				}
			});
	
	water.addEventListener('click', function(e){
		var waterWindow = require('/windows/water');
		geoTools.currentLocation(locationCallback);
				function locationCallback(e) { 
					navGroup.openWindow(new waterWindow(e, navGroup));
				}
			});
	
	green.addEventListener('click', function(e){
		//createGreenWindow();
		var greenWindow = require('/windows/green');
		geoTools.currentLocation(locationCallback);
				function locationCallback(e) { 
					navGroup.openWindow(new greenWindow(e, navGroup));
				}
			});
	
	var walk100 = Ti.UI.createButton({
		title: 'Walk 100 Miles',
		font:{fontSize:12,fontFamily:'HelveticaNeue-Bold'},
		color: '#ffffff',
		backgroundColor: '#F27536',
		backgroundImage:'',
		width: width * .45,
		height: width * .10,
		bottom: 0,
		left: 0
	});
	
	var workout = Ti.UI.createButton({
		title: 'Record a Workout',
		font:{fontSize:12,fontFamily:'HelveticaNeue-Bold'},
		color: '#ffffff',
		backgroundColor: '#F27536',
		backgroundImage:'',
		width: width * .45,
		height: width * .10,
		bottom: 0,
		right: 0
	});
	
	var clock = Ti.UI.createImageView({
   		image: '/images/backgrounds/home_clock.png',
   		height:  width * .18,
   		width: width * .18,
   		bottom: 0
	
   	});
   	
   	if (Ti.Platform.osname == 'ipad')  
	{
		walk100.font = {fontSize:24,fontFamily:'HelveticaNeue-Bold'};
		workout.font = {fontSize:24,fontFamily:'HelveticaNeue-Bold'};
	}
   	
	mainWindow.add(clock, walk100, workout);
	
	
	walk100.addEventListener('click', function(e){
		var walkWindow = require('/windows/byFoot_child_walk100');
		navGroup.openWindow(new walkWindow(navGroup));
		});
		
	workout.addEventListener('click', function(e){
		if (Ti.Platform.osname == 'ipad'){
		 	alert('iPads are not configured for \n Workout Tracking');
		 	}	
		
		else{
			var WorkOut = require('/windows/byFoot_child_workout');
			navGroup.openWindow(new WorkOut(navGroup));
		}
		
	});
		
	mainWindow.addEventListener('focus', function(){ 
   		geoTools.currentLocation(gpsCallback);
   		checkBaseMap.checkBaseMapStatus();  	
   	});

	//alert("Model : " + Ti.Platform.model +"\nName :"+ Ti.Platform.name + "\nOsName: " + Ti.Platform.osname + "\nOsType: " + Ti.Platform.ostype + "\nOsVersion: " + Ti.Platform.version);
	
	

      function gpsCallback(_coords) {
    	
    	//latlon=_coords;
    	latlon = _coords;
    	
       	var inRangeOfNashville;
    	
		var myDistance = geoTools.getDistance(latlon.latitude, latlon.longitude, nashLat, nashLon);
    	
    	if (myDistance > 18) {
    		inRangeOfNashville = false;
    		alert ("It appears that you are currently located outside of Nashville/Davidson County. \n Downtown Nashville will be used for distances and some maps.");
    		latlon.latitude = nashLat;
			latlon.longitude = nashLon;
    		
    	
    	}
    	else {
    		inRangeOfNashville = true;

    	}
    	
    	checkBaseMap.setRange(inRangeOfNashville);
    	//alert(latlon);
   		
	}

		function latlonCallback (latlonreturned){
			
			var latlon = latlonreturned;
				//latlon = "hello";
			
			
				
		}

	
	return navGroup;
};

module.exports = MasterWindow;