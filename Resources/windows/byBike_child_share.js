function bcsW (settings, navGroup, gpsInfo) {
       
		//showIndicator();
        var byBikeShareWindow = Titanium.UI.createWindow({
            id: 'byBikeShare',
            title: 'Bike Shares',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#D34140',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            orientationModes: [Ti.UI.PORTRAIT],
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
        
        if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(byBikeShareWindow);
                });
                byBikeShareWindow.leftNavButton = leftButton;
            }
            
        var bCycle = Ti.UI.createButton({
        	backgroundImage: '/images/buttons/bcycle.png',
        	top: 40,
        	width: 150,
        	height: 132
        	
        });
        
        
		
		
         bCycleLabel3 = Ti.UI.createLabel({
			text: 'fee-based, automated bicycles for quick trips',
			top: 165,
			width: 200,
			textAlign: 'center',
			font:{fontSize:9,fontFamily:'Helvetica-Bold'},
			color: '#0C72BA'
			
		});
        
        var greenBikes = Ti.UI.createButton({
        	backgroundImage: '/images/buttons/greenBikes.png',
        	top: 200,
        	width: 182,
        	height: 134
        });
        
        var greenBikesLabel = Ti.UI.createLabel({
			text: 'free bicycles for leisure or exercise \n in parks and greenways',
			top: 330,
			width: 200,
			textAlign: 'center',
			font:{fontSize:9,fontFamily:'Helvetica-Bold'},
			color: '#0C72BA'
			
		});
		
        byBikeShareWindow.add(bCycle);
        byBikeShareWindow.add(greenBikes);
        byBikeShareWindow.add(bCycleLabel3);
        byBikeShareWindow.add(greenBikesLabel);

        
       


 greenBikes.addEventListener('click', function(e)
	{
		var settings = {title:'Green Bikes',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/bikeParking.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from byBike where Type = "Bike Share"', orderField: 'name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 8, theRowNameField: 'Type2', 
				//theRowSubHeadingField: 'artName' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', 
				//addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', 
				typeField: 'Type', summaryField: 'Name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',  tableIDField: 'bybike_id', 
				//phoneField: 'phone', emailField: 'email', webField: 'URL', 
				featureType: 'Line', photoField: 'images', 
				theZoomSQL : 'Select Type2, Type, site_description, bybike_id, Name, images, artName, parkpoint_json, Lat, Lon  from byBike where bybike_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type2',  tableIDField: 'bybike_id'}
				
			};
		
		
		
			
		Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
		var greenBikesWindow =  require("/windows/Generic_child");
				navGroup.openWindow(new greenBikesWindow(settings, navGroup, gpsInfo));
		
	});
	
	
	bCycle.addEventListener('click', function(e)
	{
		var settings = {title:'Nashville B-Cycle', backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/bikeParking.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from byBike where Type = "B-Cycle"', orderField: 'name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 8, theRowNameField: 'address', 
				//theRowSubHeadingField: 'artName' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', 
				addressField: 'address', 
				//cityField: 'City', 
				openField: 'days', hoursField: 'hours', 
				typeField: 'Type', summaryField: 'Name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',  tableIDField: 'bybike_id', 
				phoneField: 'phone', emailField: 'email', webField: 'url', 
				featureType: 'Point', photoField: 'images', 
				theZoomSQL : 'Select Type2, Type, site_description, bybike_id, Name, images, phone, hours, days, url, email, address, artName, parkpoint_json, Lat, Lon  from byBike where bybike_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'bybike_id'}
				
			};
		
				Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
				var bCycleWindow =  require("/windows/Generic_child");
				navGroup.openWindow(new bCycleWindow(settings, navGroup, gpsInfo));
		
	});       
      


                return byBikeShareWindow;
        
    }

module.exports = bcsW;    
    
