function pgW(gpsInfo, navGroup) {
	
	//alert(latlon);
   
        var parksWindow = Titanium.UI.createWindow({
            id: 'parks_greenways',
            title: 'Parks & Greenways',
            color: '#ffffff',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#9FB02D',
            navBarHidden: false,
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });



	var data = [
	
		{title:'Explore Near Me',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/explorepk.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL :'select * from vw_explore_parks_greenways',  
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 22, //theRowNameField: 'Type', 
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', 
				typeField: 'Type', 
				summaryField: 'Notes', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
			 tableIDField: 'table_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point',
				parkActivitiesFields : ['restroom','commun_center','natur_center','ada','concession','dog_park','baseball','basketball','biking','biking_mtn','boating','disc_golf','fishing','golf','hiking','historic','horse','lake','picnic','picnic_shelter','playground','school','soccer','spray_park','skate_park','swimming','tennis','walk_jog'],				
				 photoField: 'images', theZoomSQL : 'Select * from vw_explore_parks_greenways_detail where table_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'table_id',  initialfilterDistance: 4}
				
				},
				
		{title:'Parks',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/parks.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'Select * from parks',  
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 14, //theRowNameField: 'Address', 
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', 
				//typeField: 'Type', 
				summaryField: 'Notes', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',  
				tableIDField: 'park_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point',
				parkActivitiesFields : ['restroom','commun_center','natur_center','ada','concession','dog_park','baseball','basketball','biking','biking_mtn','boating','disc_golf','fishing','golf','hiking','historic','horse','lake','picnic','picnic_shelter','playground','school','soccer','spray_park','skate_park','swimming','tennis','walk_jog'],				
				 photoField: 'images', theZoomSQL : 'Select * from parks where park_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'park_id'}
				},
	
		{title:'Metro Greenways',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/greenways.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from vw_explore_trails where category = "Greenway"', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 2,theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'category', summaryField: 'distance',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', photoField: 'photoField', 
				featureType:'Line', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon_p', mapTitleField:'label', mapCategoryField:'label2', popupIconField: 'popupicon', tableIDField: 'trail_id'}
			},

		{title:'Community Centers',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
			selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/communityCenter.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from recreation where category = "Community Center"', orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 12, //theRowNameField: 'Address', 
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkPointJSON', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', typeField: 'Type', summaryField: 'Notes',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', backButtonPath: 'images/buttons/back_main.png',
				tableIDField: 'rec_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point', theZoomSQL : 'Select * from recreation where rec_id = '
				, photoField: 'images',  mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'rec_id'}
				},
	
	
		{title:'Nature Centers',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/natureCenter.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from recreation where category = "Nature Center"',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'parkName', theRowHeaderTop: 12, //theRowNameField: 'parkName', 
				backButtonPath: 'images/buttons/back_main.png',
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkPointJSON', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', typeField: 'category', summaryField: 'parkName',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'rec_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point', theZoomSQL : 'Select * from recreation where rec_id = '
				, photoField: 'images',   mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'rec_id'}
				},
	
		{title:'Sports Facilities',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/sports.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from recreation where category in ("Baseball", "Basketball", "Community Center", "Four Square", "Golf Course", "Soccer", "RC Airfield", "Tennis", "Track", "Volleyball")',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'category', theRowHeaderTop: 8, theRowNameField: 'parkName', backButtonPath: 'images/buttons/back_main.png',
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkPointJSON', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', typeField: 'category', summaryField: 'parkName',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'rec_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point', theZoomSQL : 'Select * from recreation where rec_id = '
				, photoField: 'images', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'rec_id'}
				},
		
		{title:'Playgrounds',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/playgrounds.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from recreation where category = "Playground"', backButtonPath: 'images/buttons/back_main.png',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'parkName', theRowHeaderTop: 12, //theRowNameField: 'parkName', 
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkPointJSON', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', typeField: 'category', summaryField: 'parkName',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'rec_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point', theZoomSQL : 'Select * from recreation where rec_id = '
				, photoField: 'images', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'rec_id'}
				},
				
		{title:'Dog Parks',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:15,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/dog.png', hasChild: true, windowBarColor:'#9FB02D', 
				theSQL : 'select * from recreation where category = "Dog Park"', backButtonPath: 'images/buttons/back_main.png',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'parkName', theRowHeaderTop: 12, //theRowNameField: 'parkName', 
				//theRowSubHeadingField: '' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkPointJSON', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', typeField: 'category', summaryField: 'parkName',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'rec_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Point', theZoomSQL : 'Select * from recreation where rec_id = '
				, photoField: 'images', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'rec_id'}
				},
	];
    
    if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                   navGroup.closeWindow(parksWindow);
                });
                parksWindow.leftNavButton = leftButton;
            }
    
    var tableview = Titanium.UI.createTableView({
        data:data,
        top:0,
        //height:448,
        width:320,
        //font:{fontSize:18,fontFamily:'Helvetica-Bold',  fontColor:'#0C72BA'},
        backgroundColor:'transparent',
        //backgroundImage:'/images/backgrounds/tableBack.png',
        separatorColor:'#fff'
        });
	parksWindow.add(tableview);

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.width = 768;
	}
//TABLEVIEW EVENT LISTENER 
tableview.addEventListener('click', function(e)
{
		Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
		var genericChildW =  require('/windows/Generic_child');
		navGroup.openWindow(new genericChildW(e.rowData, navGroup, gpsInfo));
});        
	

			


        return parksWindow;
        
    
}

module.exports = pgW;

