function wW (gpsInfo, navGroup) {
        var waterWindow = Titanium.UI.createWindow({
            id: 'water',
            title: 'Water',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#3A86BB',
            navBarHidden: false,
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });


    var activityIndicator = Ti.UI.createActivityIndicator({
    	message: 'Loading!!!!'
    });

	var data = [
	
	
	
		{title:'Explore Near Me',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/explorewater.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'waterbody' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID', initialfilterDistance:4}
				},
				
		{title:'Waterway Access',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/access.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater where type="Water Access"',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'waterbody', theRowHeaderTop: 5, theRowNameField: 'name', 
				 backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				  tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID'}
				},
				
		{title:'Spraygrounds',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:16,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/splash.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater where type="Sprayground"',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 14,  backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID'}
				},
				
		{title:'Pools',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:16,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/pools.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater where type="Swimming Pool"',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 14, backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID'}
				},
				
	
		{title:'Wave Country',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/wave.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater where type="Wave Country"',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'waterbody' , backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID'}
				},
				
		{title:'Marina',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:16,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/marina.png', hasChild: true, windowBarColor:'#3A86BB', 
				theSQL :'select * from byWater where type="Marina"',  
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 14,  backButtonPath: 'images/buttons/back_main.png',
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'waterPointJSON', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'tableID', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from byWater where tableID = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'type',  tableIDField: 'tableID'}
				}
				
	
	];
    
    if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(waterWindow);
                });
                waterWindow.leftNavButton = leftButton;
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
	waterWindow.add(tableview);

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.width = 768;
	}
	
//TABLEVIEW EVENT LISTENER 
tableview.addEventListener('click', function(e)
{
		
		Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
		var genericChildW = require('/windows/Generic_child');
		navGroup.openWindow(new genericChildW(e.rowData, navGroup, gpsInfo));
});        
	
	
        return waterWindow;
        
    
    }

module.exports = wW;

