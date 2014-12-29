//var geoTools = require('windows/geolocate');

function GenericWindow(settings, navGroup, latlon){
	

	
	//set up animations for moving between views
	var fadeInAnimation = Ti.UI.createAnimation({
		opacity:1,
		duration:250
	});
		
	var fadeOutAnimation = Ti.UI.createAnimation({
		opacity:0,
		duration:250
	});	

	
   

				    
	

	
var checkBaseMap = require('/utility/basemap_available');
var baseMapAvailable = checkBaseMap.baseMapAvailable;
var inRangeOfNashville = checkBaseMap.inRangeOfNashville;
if(inRangeOfNashville == false) {
			var nashLat = 36.166437;
			var nashLon = -86.778177;
	
			latlon.latitude = nashLat;
			latlon.longitude = nashLon;
}			




	var _currentfilterDistance = 100000;
	var _filterResultLength;
	
				
	var x, y, lat, lon;
	var mapViewAdded = true;
	var tableViewAdded = false;


	var theMapURL = '/mapping/map.html';

	if (Ti.Platform.osname == 'ipad')  
	{  var theMapURL = '/mapping/map_ipad.html';};
	
	var mapView = Ti.UI.createWebView({
            url: theMapURL,
            backgroundColor: '#FFFFFF',
    		barColor: '#414444',
            top: 0,
            width: width,
            height: height *.8,
            fullscreen: false
       		 });
       		 
     if (Ti.Platform.osname == 'ipad')  
	{  mapView.height = height *.84;}; 


	var allGInfoFields;
	
	//expose these UI elements to the rest of the function so that they can be removed if necessary.
     var informationContainer, addressContainer, shareContainer, toolbarGInfoInfo; 
  
    var myGeoJSON;
   // alert(latlon);
	//Ti.include('/windows/map.js');
 		
 		//alert(_webviewLoaded);
       //set the window name to ginfo
        var ginfo = Ti.UI.createWindow({
			navBarHidden: false,
			id: 'ginfo',
			backgroundImage: '/images/backgrounds/background.png',
			title: settings.title,
			width: '100%',
			height: '100%',
			barColor: settings.windowBarColor,
			orientationModes: [Ti.UI.PORTRAIT],
			fullscreen: false,
			translucent: false,
			statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
			});
        
        
        
        
        //controller.createWindow('Generic Table and Map Views');
        
        
/*
            ginfo.id = 'ginfo';
            ginfo.title= settings.title;
            ginfo.backgroundImage= '/images/backgrounds/background.png';
            ginfo.barColor= settings.windowBarColor;
            ginfo.width= '100%';
            ginfo.height= '100%';
            ginfo.fullscreen= false;
            ginfo.userLocation= true;
        
        ginfo.orientationModes = [Ti.UI.PORTRAIT];*/

		
				
	var backButton = Ti.UI.createButton({
   			backgroundImage: settings.backButtonPath,
   			width: 58,
            height: 20
   	});

		ginfo.setLeftNavButton(backButton);
	
	
		//initialize an array to hold the ginfo listing
		var data = [];
		
		//intiialize a value to filter the ginfo tableview by a distance
		var filter_value = '';
		
		//CREATE SEARCH BAR for the ginfo tableview
		var search = Titanium.UI.createSearchBar({
			showCancel:true,
			barColor:'#747575',
			height: 43,
			top:0
			});
		
		
		//create the tableview with all the ginfo
    	var tableview = Titanium.UI.createTableView({
       	 	
       	 	top:0,
       	 	height: height * .8,
        	rowHeight: 64,
       		backgroundColor:'transparent',
        	separatorColor:'#fff', 
        	filterAttribute:'search_me',
        	showVerticalScrollIndicator: true,
        	search:search, 
        	width: width
        	});
  
  		if (Ti.Platform.osname == 'ipad')  
			{tableview.height = height *.84;}; 
    
	     	
	
	ginfo.add(tableview);
	

	
	ginfo.add(mapView);
	
	
	mapViewAdded = true;	
	
	
		// Create a Legend if necessary
	if(settings.legendPath) {
		var theLegendButton = Titanium.UI.createButton({
			title: 'Legend',
			backgroundColor: '#ffffff',
			bottom: height * .05,
			borderRadius: 10,
			width: 100,
			height: 30,
			right: 10
		});
			
		if (Ti.Platform.osname == 'ipad'){
			theLegendButton.width = 200;
			theLegendButton.height = 60;
		}
		
		var theLegendBackgroundView = Ti.UI.createView({
			height: height * .5,
			width: width,
			bottom: height * .1,
			backgroundColor: '#333333',
			opacity: 0.9					
			});
					
		var theLegend = Ti.UI.createImageView({
				image: settings.legendPath,
				bordesrColor: '#ffffff',				
				borderRadius: 5
		});
		
		var closeView = Ti.UI.createImageView({
			height: 40,
			width: 40,
			top: 5,
			right: 5,
			image: '/images/buttons/close.png'
		});
							
		theLegendBackgroundView.add(theLegend, closeView);
					

	
	theLegendButton.addEventListener('click', function(e){
			Titanium.API.info('Legend Button was Clicked!');
			ginfo.add(theLegendBackgroundView);				
			theLegendBackgroundView.addEventListener('click', function()
				{
					ginfo.remove(theLegendBackgroundView);
				});			
		});		
	mapView.add(theLegendButton);
}	
	
	
				
	//create a metro ginfo toolbar to hold the buttons for switching between the map, tableview, and filter control
	var toolbarMapFilter = Ti.UI.createView({
		width: width,
		height: height * .1,
		backgroundColor: '#CBCCCC',
		borderColor:'#A9ABB3',
		borderWidth: 2,
		bottom:0
	});
	var mapButton = Ti.UI.createButton({
		width:width/2,
		left: 0,
		height:height * .1,
		backgroundImage: '/images/tableviews/mapview.png',
		backgroundColor:''
	});
	
	var listButton = Ti.UI.createButton({
		width:width/2,
		left: 0,
		height:height * .1,
		backgroundImage: '/images/tableviews/listview.png',
		backgroundColor:''
	});

	var filterDistance = Ti.UI.createButton({
		width:width /2,
		right:0,
		height:height * .1,
		backgroundImage: '/images/tableviews/filter.png'
	});
	
	
	var bottombar = Ti.UI.createView({
		bottom: 0,
		height: height * .1,
		width: width,
		backgroundColor:'#CBCCCC'
	});
	
	horizontalLine = Ti.UI.createView({
		right: width / 2,
		width: 3,
		height: height * .1,
		backgroundColor: '#A9ABB3',
		bottom: 0
	});
	
	if (Ti.Platform.osname =='ipad'){
		filterDistance.backgroundImage = '/images/tableviews/filter_ipad.png';
		listButton.backgroundImage = '/images/tableviews/listview_ipad.png';
		mapButton.backgroundImage = '/images/tableviews/mapview_ipad.png';
		
 	}
	//ginfo.add(toolbarMapFilter);	
	
	//##########################################################################//
	//##########################Begin Map View#################################//
	//##########################################################################//
	

    
    //Map Button Click Event to remove tableview and add the map
	mapButton.addEventListener('click', function(e)
	{
		
		if (mapViewAdded == false) {	
				//alert("adding map window for the first time");	
				//ActiveTi.API.info(mapView);
				
				ginfo.add(mapView);
				mapView.setZIndex(0);
				
				mapViewAdded = true;	
		}	
		
			tableview.animate(fadeOutAnimation, function(){
    				tableview.hide();
    			});
    			
    			
    			mapView.animate(fadeInAnimation, function(){
    				mapView.show();
    			});
		
				
		toolbarMapFilter.remove(mapButton);
		toolbarMapFilter.add(listButton);
		
		});
	
	
	//List Button Click Event to remove map and add the table view
	listButton.addEventListener('click', function(e)
	{
		mapView.animate(fadeOutAnimation, function(){
			mapView.hide();
		});
		  
		toolbarMapFilter.remove(listButton);
		toolbarMapFilter.add(mapButton);		
		tableview.animate(fadeInAnimation, function(){
		   tableview.show();	
		});
		
	});
	
	
	toolbarMapFilter.add(listButton, filterDistance, horizontalLine);
	
	
	ginfo.add(bottombar,toolbarMapFilter);		
	

	
	
		
var initialFilterRows = [];
var rows = [];
function buildTable() {
        //alert(db.file.nativePath);
         var theGeoJSON = '{ "type": "FeatureCollection","features": [';
         var theFilterGeoJSON = '{ "type": "FeatureCollection","features": [';
          var initialPoints = [];
		var sql = settings.theSQL;
	  	
       //ActiveTi.API.info(sql);
      	//var db = Ti.Database.open('nashville1.2');
		var db = Titanium.Database.open("nashville1.5");
		var rec = db.execute(sql);	
		var n = 0;
		
	    var totalRecNum = rec.rowCount;
	    
		if (totalRecNum == 0) {
			alert('No records found. Try expanding your filter options');
		}		
		
		//create each table view row by looping through the records returned from the sql query
		//tableview rows hold sutome variables that can be accessed by the win window through the click event
		//adds event listeners to rows 
		while (rec.isValidRow()) {
			
			
			rows[n] = Ti.UI.createTableViewRow({
				hasChild:true,
				backgroundImage: '/images/backgrounds/tableBack.png',
				selectedBackgroundColor: 'blue',
				height: 64,
				className: 'datarow' + n
				//horizontalWrap: false
				
			});
						
			var theSearchString = "";
			
			
	
			//REQUIRED FIELDS		
			var lon = rec.fieldByName(settings.longitudeField);
			var lat = rec.fieldByName(settings.latitudeField);
			var mapicon = rec.fieldByName(settings.mapSettings.mapIconField);
			var maptitle = rec.fieldByName(settings.mapSettings.mapTitleField);
			var mapcategory = rec.fieldByName(settings.mapSettings.mapCategoryField);
			var tableid = rec.fieldByName(settings.mapSettings.tableIDField);
			var maplabel = rec.fieldByName(settings.mapSettings.mapTitleField);
			var mapcategoryName = settings.mapSettings.mapCategoryField;
			var maptitleName = settings.mapSettings.mapTitleField;
			var maptableidName = settings.mapSettings.tableIDField;
			var mapiconName = settings.mapSettings.mapIconField;
			var tableidName = settings.mapSettings.tableIDField;
			//var mapicon = rec.fieldByName(settings.mapIconField);
			
			var theString = '{ "type": "Feature","geometry": {"type": "Point", "coordinates": [' + lon +',' + lat +']},' +
				 '"properties": {"'+maptableidName+ '": "'+ tableid+ '"' +
				 ',"'+ maptitleName + '": "'+ maptitle + '"' +
				 ',"' + mapiconName + '": "'+ mapicon + '"' +
				 ',"'+ mapcategoryName + '": "'+ mapcategory + '"' +
				  '}},';
	
			theGeoJSON = theGeoJSON + theString;
			
			rows[n].mapData = {lat: lat, lon: lon, mapiconName:mapicon, maptitleName: maptitle, mapcategoryName:mapcategory, tableidName:tableid, maplabelName:maplabel};
			
			// create a parent view to hold the text views for each table row			
			var theTableRowView = Ti.UI.createView({
				//horizontalWrap: false
				height: 64,
				width: 290
			});
			
			if (Ti.Platform.osname == 'ipad')
			{
				theTableRowView.width = 728;
			}
						
			if ((latlon.latitude) && (latlon.longitude)) {  //check to make sure that the geolocation callback returned a valid response
    	       	currentlatitude = latlon.latitude;
           		currentlongitude = latlon.longitude;		
				var geoTools = require('/windows/geolocate');
				var locationlatitude = parseFloat(lat);
				var locationlongitude = parseFloat(lon);
				//alert(currentlatitude + ';'+ currentlongitude + ';'+locationlatitude + ';'+locationlongitude);
				var myDistance = geoTools.getDistance(currentlatitude, currentlongitude, locationlatitude, locationlongitude);
				rows[n].sortDistance = myDistance;
				var distanceBox = Ti.UI.createView({
					backgroundImage:'/images/tableviews/mileage.png',
					width: 60, 
					height: 60,
					left: 5 
				});
				
				var distance = Ti.UI.createLabel({
					font:{fontSize:14,fontFamily:'Helvetica-Bold' },
					color:'#0C72BA',
					text:myDistance + "\n"+  "mi."
				});
				
				distanceBox.add(distance);
				theTableRowView.add(distanceBox);
			
			
			if(settings.theRowHeaderField != null){
				theTop = settings.theRowHeaderTop;
				if(theTop == null){
					theTop = 10;
				}
				var theRowHeaderText = rec.fieldByName(settings.theRowHeaderField);
				var theRowHeader = Ti.UI.createLabel({
					font: settings.headerfont,
					color:'#0C72BA',
					left:67,
					width: 230,
					top: theTop,
					height:30,
					text:theRowHeaderText
				});
				
				if (Ti.Platform.osname == 'ipad')
				{
					theRowHeader.width = 400;	
				}
				
				theTableRowView.add(theRowHeader);
				theSearchString = theSearchString + theRowHeaderText;
			}
			
			if(settings.theRowNameField !=null){
				var theRowNameText = rec.fieldByName(settings.theRowNameField);
				var theRowName = Ti.UI.createLabel({
					font:settings.subheaderfont,
					color:'#0C72BA',
					left:67,
					top: theTop+20,
					width: 230,
					height:20,
					text:theRowNameText
				});

				theTableRowView.add(theRowName);
				theSearchString = theSearchString + " " +theRowNameText;
				
				if (Ti.Platform.osname == 'ipad')
				{
					theRowName.width = 400;
				}
			}		
			
				
				
			if(settings.theRowSubHeadingField != null){	
				var theRowSubHeadingText = rec.fieldByName(settings.theRowSubHeadingField);
				var theRowSubHeading = Ti.UI.createLabel({
					font:settings.subheaderfont,
					color:'#0C72BA',
					left:67,
					width: 230,
					top: theTop +35,
					height:20,
					text:theRowSubHeadingText
				});

				theTableRowView.add(theRowSubHeading);
				theSearchString = theSearchString + " " + theRowSubHeadingText;
				
				if (Ti.Platform.osname == 'ipad')
				{
					theRowSubHeading.width = 400;	
				}
			}
			
		

			}
			
			
	
			
	  			rows[n].add(theTableRowView);
	  			rows[n][settings.tableIDField] = tableid;
				rows[n].search_me = theSearchString;
				
				
				//if an initial filterDistance is specified theen push matching rows to an array.
				if (settings.mapSettings.initialfilterDistance) { 
				
					if(myDistance < settings.mapSettings.initialfilterDistance){
							initialFilterRows.push(rows[n]);
							//ActiveTi.API.info(rows[n]);
							theFilterGeoJSON = theFilterGeoJSON + theString;
					}		
				}
				
			
				

		n++;
		
		if (n==totalRecNum){
			Ti.API.info("Reached the end of the tableview records: " + n + ", out of " + totalRecNum);
		}
		
		rec.next();
		
			
		}  //end while loop through database records
		//close the database connection
		rec.close();
		db.close();
		theGeoJSON = theGeoJSON.slice(0, -1) + ']}';
		

      _filterResultLength = initialFilterRows.length;
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'allpoints.geojson');
		f.write(theGeoJSON); 
		// write to the file
		//alert(f.read().text);	
	    if (settings.mapSettings.initialfilterDistance && (_filterResultLength > 0)) {
	    	theFilterGeoJSON = theFilterGeoJSON.slice(0, -1) + ']}'; 
		    var f2 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'filter.geojson');
				f2.write(theFilterGeoJSON);
				//alert(f2.read().text);	
				}

		var appFilePath = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'allpoints.geojson').nativePath;


	
	rows = rows.sort(compare);
	if (settings.mapSettings.initialfilterDistance && (_filterResultLength > 0)) { 
				tableview.setData(initialFilterRows.sort(compare));
	}
	else {			
			tableview.setData(rows);
   }

}	
//	
	//CREATE FILTER DISTANCE UI AND FUNCTIONS
	var filterDistanceMenu = Ti.UI.createView ({
		width: width,
		height: height * .32,
		opacity: .9,
		right: '',
		backgroundColor: '#333333' 
			});
			
	var filterDistanceContainer = Ti.UI.createView({
		width: width,
		height: height * .32,
		bottom: height * -.38,
		right: '',
		_down:true,
		backgroundColor: 'transparent'
			});
			
			
	var filterDistanceHeader = Ti.UI.createView({
		width: width,
		height: height * .07,
		top: 0,
		opacity:.9,
		backgroundColor: '#999999'
			});
			
	var filterDistanceHeaderLabel = Ti.UI.createLabel({
		text: 'Filter By Distance',
	 	font:{fontSize:18,fontFamily:'Helvetica-Bold' },
		color: '#ffffff',
		zIndex:1
		});
	
	var filterDistanceSlider = Titanium.UI.createSlider({
		min:1,
		max:18,
		width: width * .9,
		height:'auto',
		top: height * .09,
		thumbImage:'/images/filter/sliderThumb.png',
		selectedThumbImage:'/images/slider_thumb.png',
		highlightedThumbImage:'/images/chat.png'
	});		
	
	var filterDistanceIncrement = Ti.UI.createView({
		width: width,
		height: '65',
		top: height * .095,
		backgroundImage:'/images/filter/increments.png'
			});
	
	var applyFilterbutton = Titanium.UI.createButton({
   		backgroundImage: '/images/buttons/filter_button.png',
   		bottom: 5,
   		width: 45,
   		height: 25
	});
	
	
	
	if (Ti.Platform.osname == 'ipad')
			{
				
			var filterDistanceMenu = Ti.UI.createView ({
		width: width/2,
		height: height * .28,
		opacity: .9,
		right: 0,
		backgroundColor: '#333333' 
			});
			
	var filterDistanceContainer = Ti.UI.createView({
		width: width/2,
		height: height * .28,
		bottom: height * -.38,
		right: 0,
		_down:true,
		backgroundColor: 'transparent'
			});
			
			
	var filterDistanceHeader = Ti.UI.createView({
		width: width/2,
		height: height * .07,
		top: 0,
		opacity:.9,
		backgroundColor: '#999999'
			});
			
	var filterDistanceHeaderLabel = Ti.UI.createLabel({
		text: 'Filter By Distance',
	 	font:{fontSize:18,fontFamily:'Helvetica-Bold' },
		color: '#ffffff',
		zIndex:1
		});
	
	var filterDistanceSlider = Titanium.UI.createSlider({
		min:1,
		max:18,
		width: width * .45,
		height:'auto',
		top: height * .138,
		thumbImage:'/images/filter/sliderThumb.png',
		selectedThumbImage:'/images/slider_thumb.png',
		highlightedThumbImage:'/images/chat.png'
	});		
	
	var filterDistanceIncrement = Ti.UI.createView({
		width: width/2,
		height: '65',
		top: height * .143,
		backgroundImage:'/images/filter/increments.png'
			});
	
	var applyFilterbutton = Titanium.UI.createButton({
   		backgroundImage: '/images/buttons/filter_button.png',
   		bottom: 5,
   		width: 45,
   		height: 25
	});
				
				
			}

	
	
	filterDistanceContainer.add(filterDistanceMenu, filterDistanceIncrement,filterDistanceSlider, applyFilterbutton);
	filterDistanceMenu.add(filterDistanceHeader);
	filterDistanceHeader.add(filterDistanceHeaderLabel);

  




	//ADD THE EVENT LISTENER FOR FILTER DISTANCE		
	filterDistance.addEventListener('click', function(e){
    		
   			 //ActiveTi.API.info(e.source);
   			 if (filterDistanceContainer._down !== true) {
   			 	filterDistanceContainer.animate({bottom:height * -.37,duration:500});
        		filterDistanceContainer._down = true;
        		filterDistance.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
        		filterDistanceContainer.animate({bottom:height * .1,duration:500});
       			filterDistanceContainer._down = false;
       			filterDistance.backgroundColor = '#fff';
   			 }
				});	
		
		
	applyFilterbutton.addEventListener('click',function(e){
		//ActiveTi.API.info(e.value);
		Ti.App.fireEvent('show_indicator', {title:'Filtering . . .'});
		
		
		
		Ti.App.fireEvent('location.stop',{});
		var slidervalue;
		var v = filterDistanceSlider.value;
		if ((v == null) || (v < 2.5)) {slidervalue = 1;}
		else if (v>=2.5 && v<3.75) {slidervalue = 2; }
		else if (v>=3.75 && v<6.5) {slidervalue = 3;}
		else if (v>=6.5 && v<8.25) {slidervalue =6;}
		else if (v>=8.25 && v<10.8) {slidervalue = 9;}
		else if (v>=10.8 && v<12.5) {slidervalue= 10;}
		else if (v>=12.5 && v<15) {slidervalue = 12;}
		else if (v>=15 && v<17) {slidervalue = 15;}
		else if (v>=17) {slidervalue = 10000;}
		
		
		var theFilterText = '';
		var theFilterColor = '#858585';
		if (slidervalue == 1){
			//showIndicator('Filtering Records By 1 Mile . . .');
		  Ti.App.fireEvent('show_indicator', {message: 'Filtering Records By 1 Mile . . .'});
			
			theFilterText = 'Results Filtered By ' + slidervalue + ' Mile';
			theFilterColor = '#0C72BA';
		}
		else if (slidervalue >1 && slidervalue<50){
			Ti.App.fireEvent('show_indicator', {message: 'Filtering Records By ' + slidervalue + ' Miles . . .'});
			
			
			theFilterText = 'Results Filtered By ' + slidervalue + ' Miles';
			theFilterColor = '#0C72BA';
		}
		else {
		  //showIndicator('Filtering For All Records . . .');	
		  
		  Ti.App.fireEvent('show_indicator', {message: 'Filtering For All Records . . .'});
		  theFilterText = 'Filter';
		  theFilterColor = '#858585';
		}
		
		filterDistanceHeaderLabel.text = theFilterText;
		//filterDistanceLabel.text = theFilterText;
		//filterDistanceLabel.color = theFilterColor;
		

		
		_currentfilterDistance = slidervalue;
		
		filterByDistance(slidervalue);
		
	});	
	
ginfo.add(filterDistanceContainer);

 if (settings.mapSettings.initialfilterDistance && (_filterResultLength > 0)){
		var slidervalue = settings.mapSettings.initialfilterDistance;
		var theFilterText = '';
		var theFilterColor = '#858585';
		if (slidervalue == 1){
			theFilterText = 'Results Filtered By ' + slidervalue + ' Mile';
			theFilterColor = '#0C72BA';
		}
		else if (slidervalue >1 && slidervalue<50){
			theFilterText = 'Results Filtered By ' + slidervalue + ' Miles';
			theFilterColor = '#0C72BA';
		}
		else {
		  theFilterText = 'Filter';
		  theFilterColor = '#858585';
		}
		
		var sliderDisplayValue;
		if(slidervalue == 4){sliderDisplayValue = 7;};
		if(slidervalue == 3){sliderDisplayValue = 5.3;};
		if(slidervalue == 2){sliderDisplayValue = 2.65;};
		if(slidervalue == 1){sliderDisplayValue = 0;};
		
		filterDistanceHeaderLabel.text = theFilterText;
		//filterDistanceLabel.text = theFilterText;
		//filterDistanceLabel.color = theFilterColor;
		filterDistanceSlider.setValue(sliderDisplayValue);
	}			

buildTable();





	//END FILTER DISTANCE FUNCTIONS AND UI		
/***********************************************************************************************/			
/***********************************************************************************************/	
		//TABLEVIEW EVENT LISTENER FOR METRO PARKS
/***********************************************************************************************/	
/***********************************************************************************************/	
/***********************************************************************************************/	

		
function createInformationTableRowClick (e){		
		
		theRowTableID = e.rowData[settings.tableIDField];
			//var rowSQL = settings.theRowSQL;
			var rowSQL = settings.theZoomSQL + '"' + theRowTableID + '"';
			//ActiveTi.API.info(rowSQL);
			var allGInfoFields = [];
			var db = Titanium.Database.open("nashville1.5");
			var rec = db.execute(rowSQL);
			var fieldCount = rec.fieldCount;
			for (var x=0; x< fieldCount; x++){
		
						theFieldName = rec.fieldName(x);
							allGInfoFields[x] = rec.fieldName(x);
					}
			
		   var n = 0;
		   var theDataRows = [];
			while (rec.isValidRow()) {
					var ginfoActivities = [];
					
		            theDataRows[n] = {};
					//Add all the fields from the select statement to the table, AND
					//check for values = 1 to store fieldname for ginfo ammenities icon lookup (icons have the same name as the ammentiy fields in the database)
					var allFieldsLength = allGInfoFields.length;
					//ActiveTi.API.info("allFieldsLength" + allFieldsLength);
					for (var x =0; x<allFieldsLength; x++){
							var theFieldName = allGInfoFields[x];
							if(theFieldName!='rowid'){
								var theValue = rec.fieldByName(theFieldName);
								theDataRows[n][theFieldName] = theValue;
								if((theValue == 1) && (theFieldName !== 'softball')) {
									ginfoActivities.push(theFieldName);
								}
							}				
		
		
						}
						
		
				    theDataRows[n].activities = ginfoActivities;
					
					n++;
					rec.next();
					
					
			}
			rec.close();
			db.close();
			db = null;
		

		
		toolbarMapFilter.hide();
		
		if (e.rowData[settings.tableIDField])
		{
			//hide the filter distance container
			filterDistanceContainer.animate({bottom: height * -.37,duration:500});
			filterDistanceContainer._down = true;
			filterDistance.backgroundColor = null;
        		
        		
			var theTableID = e.rowData[settings.tableIDField];		
			 
		    var mRow = theDataRows[0]; //primary key 
			//alert(mRow[settings.jsonField]); 	
			var theFeatureType = settings.featureType;
			var theJSON = mRow[settings.jsonField];
				
				lat=mRow[settings.latitudeField];
				lon=mRow[settings.longitudeField];
				
			var featureLocation = {};
			if(settings.featureType == "Point"){	
			//CREATE JSON For the CURRENT POINT	
				
				featureLocation["type"] = "Feature";
				featureLocation["geometry"] = JSON.parse(mRow[settings.jsonField]);
			}
			else {
			  	var featureLocation  = mRow[settings.jsonField];	
				  featureLocation =	JSON.parse(featureLocation);		
			}
			
		//ActiveTi.API.info(featureLocation);
		//OLD//ActiveTi.API.info(JSON.stringify(pointLocation));
		//Ti.App.fireEvent('location.off', {});
		//Ti.API.info(JSON.stringify(mRow));
		//Ti.API.info(settings.mapTitleField);
		//Ti.API.info("Visibility is: " + toolbarGInfoInfo);
		removeInfoUI();
		Ti.App.fireEvent('zoomfeature', {theData: featureLocation, lat: lat, lon: lon,
			featureType:settings.featureType, mapTitle:mRow[settings.mapSettings.mapTitleField], 
			tableID: mRow[settings.tableIDField], category:mRow[settings.mapSettings.mapCategoryField]});
		
				
			toolbarGInfoInfo = Ti.UI.createView({
				width: width,
				height: height*.1,
				backgroundColor: '#CBCCCC',
				borderColor:'#A9ABB3',
				borderWidth: 2,
				bottom:0
				});
			
			
						
			var information = Ti.UI.createButton({
				title: 'Information',
				font:{fontSize:15,fontFamily:'Helvetica-Bold' },
				color: '#666666',
				height: height * .1,
				width: width * .34,
				left: 0,
				bottom:0,
				backgroundImage: '/images/detail/button.png'
			});
			
			var address = Ti.UI.createButton({
				left: width * .34,
				title: 'Address',
				font:{fontSize:15,fontFamily:'Helvetica-Bold' },
				color: '#666666',
				height: height * .1,
				width: width * .32,
				bottom:0,
				backgroundImage: '/images/detail/button.png'
			});
			
			var share = Ti.UI.createButton({
				right: 0,
				color: '#666666',
				height: height * .1,
				width: width * .34,
				bottom:0,
				backgroundImage: '/images/detail/button.png'
			});
			
			var fb_image = Ti.UI.createImageView({
				backgroundImage: '/images/buttons/fb.png',
				height: 40,
				width: 40
			});
			
			share.add(fb_image);
			
			var horizontalLine2 = Ti.UI.createView({
				right: width * .34,
				width: 3,
				height: height * .1,
				backgroundColor: '#A9ABB3',
				bottom: 0
			});
			
			var horizontalLine3 = Ti.UI.createView({
				left: width * .34,
				width: 3,
				height: height * .1,
				backgroundColor: '#A9ABB3',
				bottom: 0
			});
			
			if (Ti.Platform.osname == 'ipad'){
				information.font = {fontSize:30,fontFamily:'Helvetica-Bold' };
				address.font = {fontSize:30,fontFamily:'Helvetica-Bold' };
				address.font = {fontSize:30,fontFamily:'Helvetica-Bold' };
				fb_image.height = 80;
				fb_image.width = 80;
			}
			

			toolbarGInfoInfo.add(information, address, share, horizontalLine2, horizontalLine3);
			
			
			///CREATE INFORMATION POPUP
			
			var CreateInformationContainer = require('/windows/gc_information_view'); 
			informationContainer = new CreateInformationContainer(mRow,settings, latlon); 
			
			
		
			information.addEventListener('click', function(e){

   			 if (informationContainer._down !== true) {
   			 	informationContainer.animate({bottom:height * -.7,duration:500});
        		informationContainer._down = true;
        		information.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
      			      			//hide the address container
        		addressContainer.setBottom(height * -.36);
        		addressContainer._down = true;
        		address.backgroundColor = null;
        		
        		       		
        		//hide the share container
        		
        		shareContainer.setBottom(height * -.65);
        		shareContainer._down = true;
        		share.backgroundColor = null;
      			
      			
        		informationContainer.animate({bottom: height * .1,duration:500});
       			informationContainer._down = false;
       			information.backgroundColor = '#fff';
   			 }
				});	
		
	
		
		
			//////CREATE ADDRESS POPUP
			var CreateAddressContainer = require('/windows/gc_address_view'); 
			addressContainer = new CreateAddressContainer(mRow,settings,latlon);		
				
			address.addEventListener('click', function(e){
    		
   			 //ActiveTi.API.info(e.source);
   			 if (addressContainer._down !== true) {
   			 	addressContainer.animate({bottom:height * -.36,duration:500});
        		addressContainer._down = true;
        		address.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
      			//hide the information container
        		informationContainer.setBottom(height * -.7);
        		informationContainer._down = true;
        		information.backgroundColor = null;
        		
        		       		
        		//hide the share container
        		shareContainer.setBottom(height * -.65);
        		shareContainer._down = true;
        		share.backgroundColor = null;
        		
        		addressContainer.animate({bottom: height * .1,duration:500});
       			addressContainer._down = false;
       			address.backgroundColor = '#fff';
   			 }
				});	
			
			
			//////CREATE SHARE POPUP
            var CreateShareContainer = require('/windows/gc_share_view'); 
			shareContainer = new CreateShareContainer();
			ginfo.add(shareContainer);

			share.addEventListener('click', function(e){
    		
   			 if (shareContainer._down !== true) {
   			 	shareContainer.animate({bottom:height * -.85,duration:500});
        		shareContainer._down = true;
        		share.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
      			      			//hide the information container
        		informationContainer.setBottom(height * -.7);
        		informationContainer._down = true;
        		information.backgroundColor = null;
        		
        		       		
        		//hide the address container
        		addressContainer.setBottom(height * -.36);
        		addressContainer._down = true;
        		address.backgroundColor = null;
      			
      			
        		shareContainer.animate({bottom: height * .1,duration:500});
       			shareContainer._down = false;
       			share.backgroundColor = '#ffffff';
   			 }
				});	
			
			  if(toolbarMapFilter.getVisible()){
    				
				ginfo.remove(toolbarMapFilter);					      
			}

			
			
				
			ginfo.add(toolbarGInfoInfo);
			ginfo.title = mRow[settings.theHeaderField];
			ginfo.add(informationContainer);
			informationContainer.visible = true;
			ginfo.add(addressContainer);
			
			
			
			
			
			if(tableview.getVisible()){
    				
				tableview.animate(fadeOutAnimation, function()
				{
				  	mapView.show();
				  	mapView.animate(fadeInAnimation);
				});					      
			}
			
			
		var backListButton = Ti.UI.createButton({
    		backgroundImage: settings.backButtonPath,
   			width: 58,
            height: 20

		});
   
   		
   
       
   
    	backListButton.addEventListener("click", function() {
    		

    				
    			mapView.animate(fadeOutAnimation, function(){
    				mapView.hide();
    				Ti.App.fireEvent('zoomdataextent', {});
    				//mapView.setOpacity = 1;
    			});
    			
    			tableview.setOpacity = 0;
    			//tableview.show();
    			
    			tableview.animate(fadeInAnimation, function(){
    				
    				tableview.show();
    				
    			});
    			
    			
    	        ginfo.remove(informationContainer);
    	        ginfo.remove(addressContainer);
    	        ginfo.remove(shareContainer);
    	        ginfo.remove(toolbarGInfoInfo);
				
				
				
				toolbarMapFilter.add(mapButton);    
				ginfo.leftNavButton= backButton;
				ginfo.title = settings.title;
				Ti.API.info(listButton.title);  
    			toolbarMapFilter.remove(listButton);						      
				toolbarMapFilter.show();
    	       
		});
		

		//set the back button to go to the main map/filter/list screen	
		ginfo.setLeftNavButton(backListButton);
	
		}//close the if statement for the tableview click event listener
		

	} //end of the tableview event listener 
	//simulateTableRowClick();
	
   function removeInfoUI(){
   		if (shareContainer){
   				Ti.API.info("ShareContainer Visibility = " + shareContainer.getVisible());
   			 	shareContainer.animate({bottom:height * -.85,duration:500});
        		shareContainer._down = true;
        		//share.backgroundColor = null;
        		//ginfo.remove(shareContainer);	 	
  		} 
  		
  		if (informationContainer) {
  				Ti.API.info("informationContainer Visibility = " + informationContainer.getVisible());
        		informationContainer.animate({bottom: height * -.7, duration:500});
        		informationContainer._down = true;
        		Ti.API.info("informationContainer Visibility = " + informationContainer.getVisible());
        		//informationContainer.hide();
        		//information.backgroundColor = null;
        		//ginfo.remove(informationContainer);
        		
        		//Ti.API.info("informationContainer Visibility = " + informationContainer.getVisible());
        }		
        
        if (addressContainer) {
        		//hide the address container
        		Ti.API.info("addressContainer Visibility = " + addressContainer.getVisible());
        		addressContainer.animate({bottom: height * -.36, duration:500});
        		addressContainer._down = true;
        		//address.backgroundColor = null;
        		//ginfo.remove(addressContainer);
      	}		
      	
		if(toolbarGInfoInfo)  {
			Ti.API.info("toolbarGInfoInfo Visibility = " + toolbarGInfoInfo.getVisible());
			ginfo.remove(toolbarGInfoInfo);		
		}  
   	
   }

	 	
	 	function filterByDistance(filterDistance){
	 		
	 		//var result = rows.filter(function (p) {
	 			
	 		//	return p.sortDistance <= filterDistance;
	 		//});
	 		var result = [];
	 		var theGeoJSON = '{ "type": "FeatureCollection","features": [';
	 		var rowLength = rows.length;
	 		for (var x=0; x< rowLength; x++){
	 			
	 			if(rows[x].sortDistance <= filterDistance){
					var lat = rows[x].mapData.lat;
					var lon = rows[x].mapData.lon;
		   			var maptitle = rows[x].mapData.maptitleName;
					var mapcategory = rows[x].mapData.mapcategoryName;
					var tableid = rows[x].mapData.tableidName;
					var maplabel = rows[x].mapData.maplabelName;
					var mapicon = rows[x].mapData.mapiconName;
					var mapcategoryName = settings.mapSettings.mapCategoryField;
					var maptitleName = settings.mapSettings.mapTitleField;
					var maptableidName = settings.mapSettings.tableIDField;
					var mapiconName = settings.mapSettings.mapIconField;
					var tableidName = settings.mapSettings.tableIDField;
					var theString = '{ "type": "Feature","geometry": {"type": "Point", "coordinates": [' + lon +',' + lat +']},' +
				 '"properties": {"'+maptableidName+ '": "'+ tableid+ '"' +
				 ',"'+ maptitleName + '": "'+ maptitle + '"' +
				 ',"' + mapiconName + '": "'+ mapicon + '"' +
				 ',"'+ mapcategoryName + '": "'+ mapcategory + '"' +
				  '}},';
	
					theGeoJSON = theGeoJSON + theString;
				//rows[n].mapData = {mapicon:mapicon, maptitle: maptitle, mapcategory:mapcategory, tableid:tableid, maplabel:maplabel};
           			result.push(rows[x]);	
           	
           	 	}	
                		//filterPoints.push(result[x].pointLocation);
                		
			}
	 		
	 		theGeoJSON = theGeoJSON.slice(0, -1) + ']}';
		

		//ActiveTi.API.info(theGeoJSON);

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'filter.geojson');
		f.write(theGeoJSON); // write to the file
	 	//alert(f.read().text);
	 	var appFilePath = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'filter.geojson').nativePath;
	 	
	 		
	 		//ActiveTi.API.info(result.length);
			if (result.length > 0) {
			 		tableview.setData(result);
			 		//displayMapPoints(result); 	 		
			 		Ti.App.fireEvent('filtermap', {filterDistance: filterDistance, lat: latlon.latitude, lon: latlon.longitude, appFilePath: appFilePath});
			} else
			{
				
				Ti.App.fireEvent('hide_indicator');
				filterDistanceHeaderLabel.text = 'Filter';
		  		//filterDistanceLabel.text = 'Filter';
				//filterDistanceLabel.color = '#858585';
				alert("There are no records within " + filterDistance + " miles of your current location.  Try choosing a different filter distance.");
				
			}	
	 	}
	 	
   	 	
 	

		
			

		
		
		function simulateTableRowClick (e) {
			
			
			//ActiveTi.API.info(e);				
			var result = rows.filter(function(p){
				return p[settings.tableIDField] == e.tableID;
			});

			
			if(result.length == 1){
				var theRow = result[0];
				tableview.fireEvent("click", {
		        	rowData: theRow});

			}
			else {
				alert("Additional information is not yet available for this location.");
			}
		}
		
		Ti.App.addEventListener('identifyMapFeature', simulateTableRowClick);
	

		backButton.addEventListener("click", function(){
			Ti.API.info("removing identify map feature event listener");			
			Ti.App.removeEventListener('identifyMapFeature', simulateTableRowClick);
		
						Ti.API.info("firing stop location event");
						Ti.App.fireEvent('location.stop',{});
	
			//Ti.App.fireEvent('removeweblisteners',{});
		    Ti.App.removeEventListener('webmapready', populateWindow);
			//mapView.close();
			//ginfo.remove(mapView);
			//mapView = null;
			//mapView = Titanium.UI.createView({});
			//ginfo.add(mapView);
			
	
			
			//AI.removeActivityIndicator();
			//ActiveTi.API.info("ginfo window closed!");	
		
			//ginfo.close();
			//ginfo.remove();
         	navGroup.closeWindow(ginfo);
         
	});
			
			





		//function for sorting table rows by distance
		function compare(a,b){
			return (a.sortDistance - b.sortDistance);
		}
	
		
	
		//check to see if the page is being opened, and make sure that the map is added only once.
		ginfo.addEventListener('open', function(e){	
			//tableview.show();
			//buildTable();
					//Event listener 
			
				 //mapView.open({animate:true});
				 //actInd.show();
				 
				//mapWindow.animate({zIndex:1});
				filterDistanceContainer.animate({zIndex:2});
			//Ti.App.fireEvent('addweblisteners',{});		
			
			//ActiveTi.API.info("open event fired!");
			
		});
		
		
		//***************************************************************
		//START THE MAP HERE: 
		//waits until the webmap is ready to get GPS coordinates, populate tables and map!!!! 
		//***************************************************************
		
		
		Ti.App.addEventListener('webmapready', populateWindow);

		
		
		function populateWindow(ready) {
			 //Ti.API.info(tableview.data.length);
			 if (settings.mapSettings.initialfilterDistance && (_filterResultLength > 0)) {
					var appFilePath = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'filter.geojson').nativePath;
				}
				else {
					var appFilePath = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'allpoints.geojson').nativePath;
				}	
			
			
			Ti.App.fireEvent('initializemap',{ title :settings.title, latlon: latlon, appFilePath: appFilePath, mapSettings:settings.mapSettings, baseMapAvailable: baseMapAvailable });
			
		}


		
		tableview.addEventListener('click', createInformationTableRowClick);
		
			
    return ginfo;
}  
module.exports = GenericWindow;
