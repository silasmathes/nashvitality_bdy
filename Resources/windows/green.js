function gW(gpsInfo, navGroup) {
        var greenWindow = Titanium.UI.createWindow({
            id: 'green',
            title: 'Green Features',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#168844',
            navBarHidden: false,
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });




	var data = [
		
		{title:'Explore Near Me',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/exploregn.png', hasChild: true, windowBarColor:'#168844', 
				theSQL :'select * from green',  
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Label', theRowHeaderTop: 8, theRowNameField: 'Name', 
				//theRowSubHeadingField: 'waterbody' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'greenjson', AddressField: 'Address', CityField: 'City', openField: 'Days', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', tableIDField: 'green_id', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from green where green_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'green_id', initialfilterDistance: 4}
				},
				
		{title:'Community Engagement',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/community.png', hasChild: true, windowBarColor:'#168844',  backButtonPath: 'images/buttons/back_main.png'},
				
		{title:'Energy',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/energy.png', hasChild: true, windowBarColor:'#168844', 
				theSQL :'select * from vw_green where category = "Energy"',   backButtonPath: 'images/buttons/back_main.png',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Label', theRowHeaderTop: 8, theRowNameField: 'Name', 
				//theRowSubHeadingField: 'waterbody' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'greenjson', AddressField: 'Address', CityField: 'City', openField: 'Days', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'green_id', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from vw_green where green_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'green_id'}
				},
				
		{title:'Natural Resources',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/natural.png', hasChild: true, windowBarColor:'#168844', 
				theSQL :'select * from green where category="Natural Resources"',  
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Label', theRowHeaderTop: 8, theRowNameField: 'Name', 
				//theRowSubHeadingField: 'waterbody' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'greenjson', AddressField: 'Address', CityField: 'City', openField: 'Days', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary', backButtonPath: 'images/buttons/back_main.png',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', tableIDField: 'green_id', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from green where green_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'green_id'}
				},
				
				
	
		{title:'Transit',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' }, 
		selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/mobility.png', hasChild: true, windowBarColor:'#168844',  backButtonPath: 'images/buttons/back_main.png', windowTitle: 'Transit', logo: '/images/logos/mta.png', html: '/pages/transit.html', url: 'http://www.nashvillemta.org/'},
				
		{title:'Recycling',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/waste.png', hasChild: true, windowBarColor:'#168844', 
				theSQL :'select * from green where category="Waste"',   backButtonPath: 'images/buttons/back_main.png',
				orderField: 'Name', theHeaderField: 'Name', theRowHeaderField: 'Label', theRowHeaderTop: 8, theRowNameField: 'Name', 
				//theRowSubHeadingField: 'waterbody' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'greenjson', AddressField: 'Address', CityField: 'City', openField: 'Days', hoursField: 'hours', 
				//typeField: 'Type', 
				summaryField: 'summary', moreInfoButton: true,
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', 
				tableIDField: 'green_id', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point', parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from green where green_id = ', mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'green_id'}
				}
				
	
	];
    
    if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(greenWindow);
                });
                greenWindow.leftNavButton = leftButton;
            }
    
    var tableview = Titanium.UI.createTableView({
        data:data,
        top:0,
        width:width,
        backgroundColor:'transparent',
        separatorColor:'#fff'
        });
	greenWindow.add(tableview);

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.width = 768;
	}
	
	//TABLEVIEW EVENT LISTENER 
	tableview.addEventListener('click', function(e)
	{	
		var windowTitle = e.rowData.windowTitle;
		var logo = e.rowData.logo;
		var html = e.rowData.html;
		var url = e.rowData.url;

	
		if(e.rowData.title == "Community Engagement"){
				var theCommunityEngagementWindow =  require('/windows/green_child_community');
				navGroup.openWindow(new theCommunityEngagementWindow(e.rowData, navGroup));
			
		}
		
		else if (e.rowData.title == "Transit"){
				var moreInfo = require('/windows/moreInfo');
				navGroup.openWindow(new moreInfo(navGroup, windowTitle,logo,html,url));
			
		}


		else  {		
			Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
			var genericChildW = require('/windows/Generic_child');
			navGroup.openWindow(new genericChildW(e.rowData, navGroup, gpsInfo));
			
		}

	


	});        
	
	
        return greenWindow;
        
    
 }
module.exports = gW;  


