function Foot(gpsInfo, navGroup){
        var footWindow = Titanium.UI.createWindow({
            id: 'byFoot',
            title: 'Walk / Run',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#F07534',
            navBarHidden: false,
            fullscreen: false,
            orientationModes: [Ti.UI.PORTRAIT],
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
        
        
	
	
	var data = [
	
	
	//{title:'Explore Near Me', settings: {mapIconField: 'mapicon_w',mapTitleField:'maptitle', mapCategoryField:'mapcategory', tableIDField: 'tableid', mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails'}},	

	
		{title:'Explore Near Me',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/exploreft.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select * from vw_explore_trails',
				orderField: 'th.name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 3, theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'descriptor', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', featureType: 'Line',
				parkActivitiesFields : [],	backButtonPath: 'images/buttons/back_main.png',			
				 photoField: 'photoField', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', 
				mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id',  initialfilterDistance: 4}
				},
				
		{title:'Paved Trails',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/paved.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select * from vw_explore_trails where surface="Paved"', 
				orderField: 'th.name', backButtonPath: 'images/buttons/back_main.png',
				theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 3, theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'descriptor', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',  
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', featureType: 'Line',				
				 photoField: 'photoField', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', 
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id'}
				},
		
				
		{title:'Unpaved Trails',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/unpaved.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select * from vw_explore_trails where surface="Unpaved"', 
				orderField: 'th.name', backButtonPath: 'images/buttons/back_main.png',
				theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 3, theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'descriptor', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				 tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', featureType: 'Line',				
				 theZoomSQL : 'Select * from vw_explore_trails where trail_id = ',
				photoField: 'photoField', 
				mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id'}
				
				},
				
		{title:'Metro Greenways',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/greenwaysft.png', hasChild: true, windowBarColor:'#F07534', 
				theSQL : 'select * from vw_explore_trails where category = "Greenway"', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 3,theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'category', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', photoField: 'photoField', 
				featureType:'Line', theZoomSQL : 'Select * from vw_explore_trails where trail_id = '
				, mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id'}
			},
				
		{title:'Sidewalks',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/sidewalks.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select * from vw_explore_trails', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 3, theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'descriptor', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', featureType: 'Line',				
				 photoField: 'photoField', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ',
				 legendPath: '/images/legends/sidewalk_legend.png',				
				mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id', initialfilterDistance: 4}
				},
				
		{title:'Walk 100 Miles',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/walk100.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select *, trailhead_type || " - " || name as descriptor, segment || ": "  || mileage || " miles, " || surface as full_name from trailheads', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'trailhead_type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'segment' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', typeField: 'descriptor', summaryField: 'full_name',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'URL', featureType: 'Line',				
				 photoField: 'photoField', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', 
				mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id', initialfilterDistance: 4}
				//, photoField: 'images'
				},
				
				{title:'Record A Workout',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/workout.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#F07534', 
				theSQL : 'select *, trailhead_type || " - " || name as descriptor, segment || ": "  || mileage || " miles, " || surface as full_name from trailheads', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'trailhead_type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'segment' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', typeField: 'descriptor', summaryField: 'full_name',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'URL', featureType: 'Line',				
				 photoField: 'photoField', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', 
				mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon_w', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id', initialfilterDistance: 4}
				//, photoField: 'images'
				}				
	
	
	
	
	];
    
        if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
                    height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(footWindow);
                });
                footWindow.leftNavButton = leftButton;
            }
    
    var tableview = Titanium.UI.createTableView({
        data:data,
        top:0,
        //height:448,
        width:width,
        //color:'#fff',
        //font:{fontSize:18,fontFamily:'Helvetica-Bold',  fontColor:'#0C72BA'},
        backgroundColor:'transparent',
        //backgroundImage:'/images/backgrounds/tableBack.png',
        separatorColor:'#fff'
        });
	footWindow.add(tableview);
	//footWindow.add(pb);
	//pb.show();
	

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.rowHeight = 64;
		tableview.width = width;
	}



//TABLEVIEW EVENT LISTENER 
tableview.addEventListener('click', function(e) {
//Ti.App.fireEvent('show_indicator', {title:'Loading Maps and Data ...'});

		if(e.rowData.title == "Walk 100 Miles"){
				var Walk = require('/windows/byFoot_child_walk100');
				navGroup.openWindow(new Walk(navGroup));
			
		}
		
		else if(e.rowData.title == "Record A Workout"){
		     if (Ti.Platform.osname == 'ipad'){
		 		alert('iPads are not configured for \n Workout Tracking');
		 	}	
		
			else{
				var WorkOut = require('/windows/byFoot_child_workout');
				navGroup.openWindow(new WorkOut(navGroup));
			}
		}
		
		
		else {		
		
			Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
			var Generic = require('/windows/Generic_child');
			navGroup.openWindow(new Generic(e.rowData, navGroup, gpsInfo));
		}

	


}); 
	
	
        return footWindow;
        
    
    }
module.exports = Foot;



