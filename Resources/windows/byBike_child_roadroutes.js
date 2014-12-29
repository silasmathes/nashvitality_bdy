function rrW (settings, navGroup, gpsInfo) {
       
		//showIndicator();
        var byRRWindow = Titanium.UI.createWindow({
            id: 'byRR',
            title: 'Road Routes',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#D34140',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
        
        if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
                    height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(byRRWindow);
                });
                byRRWindow.leftNavButton = leftButton;
            }
            
        var suggested = Ti.UI.createButton({
        	backgroundImage: '/images/logos/suggestedRoutes.png',
        	top: 20,
        	width: 150,
        	height: 150
        	
        });
        
         suggestedLabel = Ti.UI.createLabel({
			text: 'Suggested Road Routes',
			top: 155,
			width: 200,
			textAlign: 'center',
			font:{fontSize:12,fontFamily:'Helvetica-Bold'},
			color: '#0C72BA'
			
		});
        
        var theGroove = Ti.UI.createButton({
        	backgroundImage: '/images/logos/thegroove_logo.png',
        	top: 215,
        	width: 200,
        	height: 80
        });
        
        var theGrooveLabel = Ti.UI.createLabel({
			text: 'Easy-Routes in Nashville',
			top: 300,
			width: 200,
			textAlign: 'center',
			font:{fontSize:12,fontFamily:'Helvetica-Bold'},
			color: '#0C72BA'
			
		});
		
        byRRWindow.add(suggested, suggestedLabel, theGroove, theGrooveLabel);
        
       theGroove.addEventListener('click', function(e)
		{
			
		var settings = {title:'The Groove',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/groove.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from groove', orderField: 'name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 8, theRowNameField: 'Type2', 
				theRowSubHeadingField: '' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: '', 
				//addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', 
				typeField: 'category', summaryField: 'name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', mapIconField: 'mapicon', mapIconURL: '/mapping/redpin.png', 
				mapTitleField:'name', mapCategoryField:'category', popupIconField: 'popupicon', tableIDField: 'groove_id', 
				legendPath: '/images/legends/groove_legend.png',
				//phoneField: 'phone', emailField: 'email', webField: 'URL', 
				featureType: 'Line',				
				 photoField: 'images', theZoomSQL : 'Select * from groove where groove_id= '
				//, photoField: 'images'
		};
		
			
		var theGrooveWindow =  require("/windows/byBike_child_groove");
				navGroup.openWindow(new theGrooveWindow(settings, navGroup, gpsInfo));
		});
		


 suggested.addEventListener('click', function(e) {
		var settings = 		{title:'Road Routes',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/musicbikeway.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from bike_routes', 
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 4, theRowNameField: 'distanceLabel', 
				//theRowSubHeadingField: 'segment' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'musicbikeway_json', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'category', summaryField: 'name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',tableIDField: 'tableid', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',				
				 photoField: 'images', theZoomSQL : 'Select * from bike_routes where tableid = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: '',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'distanceLabel',  tableIDField: 'tableid'}
				//, photoField: 'images'
				};
		
		Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});			
		var roadbikeWindow =  require("/windows/Generic_child");
		navGroup.openWindow(new roadbikeWindow(settings, navGroup, gpsInfo));
		
	});
		
		
        byRRWindow.orientationModes = [Ti.UI.PORTRAIT];

                return byRRWindow;
        
    }
    
module.exports = rrW;
