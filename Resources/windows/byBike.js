function bkW (gpsInfo, navGroup) {
        var bikeWindow = Titanium.UI.createWindow({
            id: 'byBike',
            title: 'Bike',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#D34140',
            translucent: false,
            navTintColor: '#ffffff',
            orientationModes: [Ti.UI.PORTRAIT],
            navBarHidden: false,
            fullscreen: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });

	

	var data = [
	
		{title:'Explore Near Me',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_1.png', leftImage: '/images/tableviews/explorebk.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from vw_explore_bikes',
				theHeaderField: 'Name', theRowHeaderField: 'Type', theRowHeaderTop: 8, theRowNameField: 'Name', 
				//theRowSubHeadingField: 'segment' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', 
				//addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'Hours', 
				//typeField: 'descriptor', summaryField: 'full_name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',
				tableIDField: 'table_id', phoneField: 'Phone', emailField: 'email', webField: 'URL', featureType: 'Line',
				parkActivitiesFields : [],				
				 photoField: 'images', theZoomSQL : 'Select * from vw_explore_bikes where table_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type',  tableIDField: 'table_id', initialfilterDistance: 2}
				//, photoField: 'images'
				},
				
		{title:'Bike Share Program',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/borrow.png', hasChild: true,
				headerfont: {fontSize:16,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from vw_explore_trails where surface="Paved"', 
				orderField: 'th.name', 
				theHeaderField: 'name', theRowHeaderField: 'trailhead_type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'segment' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', typeField: 'descriptor', summaryField: 'full_name',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', mapIconField: 'mapicon', mapIconURL: '/mapping/redpin.png', 
			 tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'URL', featureType: 'Line',				
				 photoField: 'images', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'full_name', mapCategoryField:'descriptor',  tableIDField: 'table_id'}
				//, photoField: 'images'
				},
		
				
		{title:'Road Routes',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/road.png', hasChild: true,
				headerfont: {fontSize:16,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140'/*, 
				theSQL : 'select * from vw_explore_trails where surface="Unpaved"', 
				orderField: 'th.name', 
				theHeaderField: 'name', theRowHeaderField: 'trailhead_type', theRowHeaderTop: 8, theRowNameField: 'name', 
				theRowSubHeadingField: 'segment' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', typeField: 'descriptor', summaryField: 'full_name',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', mapIconField: 'mapicon', mapIconURL: '/mapping/redpin.png', 
				mapTitleField:'full_name', mapCategoryField:'descriptor', popupIconField: 'popupicon', tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'URL', featureType: 'Line',				
				 photoField: 'images', theZoomSQL : 'Select * from vw_explore_trails where trail_id = '
				//, photoField: 'images'*/
				},
				
		{title:'Mtn. Bike Trails',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/mtnbike.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'Select Name || " " || Type || ", " || Segment  as full_name, Type, lat, lon, mtb_id, mtngeojson, site_description, url, images, email, phone, mapicon from mtn_bike_trailheads',
				 orderField: 'name', theHeaderField: 'Type', theRowHeaderField: 'full_name', theRowHeaderTop: 8, //theRowNameField: '', 
				//theRowSubHeadingField: 'segment' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'mtngeojson', addressField: '', cityField: '', openField: '', hoursField: '', typeField: '', summaryField: '',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', tableIDField: 'mtb_id', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',				
				 photoField: 'images', 
				 theZoomSQL : 'Select Name || " " || Type || ", " || Segment  as full_name, Type, lat, lon, mtb_id, mtngeojson, site_description, url, images, email, phone, mapicon from mtn_bike_trailheads where mtb_id = ',
				  backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'trails',
				mapIconField: 'mapicon', mapTitleField:'full_name', mapCategoryField:'Type',  tableIDField: 'mtb_id'}
				//, photoField: 'images'
				},
				
		{title:'Metro Greenways',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA',font: {fontSize:18,fontFamily:'Helvetica-Bold' },headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_3.png', leftImage: '/images/tableviews/greenwaysBike.png', hasChild: true, windowBarColor:'#D34140', 
				theSQL : 'select * from vw_explore_trails where category = "Greenway"', orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 2,theRowNameField: 'segment', 
				theRowSubHeadingField: 'distance' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'trailjson', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'category', summaryField: 'label2',
				descriptionField: 'trail_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg',  tableIDField: 'trail_id', phoneField: 'phone', emailField: 'email', webField: 'webField', photoField: 'photoField', 
				featureType:'Line', theZoomSQL : 'Select * from vw_explore_trails where trail_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon_b', mapTitleField:'label', mapCategoryField:'label2',  tableIDField: 'trail_id'}
			},
			
				
		{title:'Music City Bikeway',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/musicbikeway.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from music_city_bikeway', 
				orderField: 'name', theHeaderField: 'name', theRowHeaderField: 'name', theRowHeaderTop: 8, //theRowNameField: 'name', 
				//theRowSubHeadingField: 'segment' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: 'musicbikeway_json', addressField: 'address', cityField: 'city', openField: 'open', hoursField: 'hours', typeField: 'category', summaryField: 'name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', tableIDField: 'tableid', phoneField: 'phone', emailField: 'email', webField: 'url', featureType: 'Point',				
				 photoField: 'images', theZoomSQL : 'Select * from music_city_bikeway where tableid = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: false, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'name', mapCategoryField:'category',  tableIDField: 'tableid'}
				//, photoField: 'images'
				},	
	
		{title:'The Groove',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/groove.png', hasChild: true,
				headerfont: {fontSize:12,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from groove', orderField: 'name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 8, theRowNameField: 'Type2', 
				theRowSubHeadingField: '' ,
				latitudeField: 'lat', longitudeField:'lon', jsonField: '', 
				//addressField: 'Address', cityField: 'City', openField: 'Days', hoursField: 'hours', 
				typeField: 'category', summaryField: 'name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', mapIconField: 'mapicon', mapIconURL: '/mapping/redpin.png', 
				mapTitleField:'name', mapCategoryField:'category', popupIconField: 'popupicon', tableIDField: 'groove_id', legendPath: '/images/legends/groove_legend.png',
				//phoneField: 'phone', emailField: 'email', webField: 'URL', 
				featureType: 'Line',				
				 photoField: 'images', theZoomSQL : 'Select * from groove where tableid= '
				//, photoField: 'images'
			},
						
		{title:'Bike Parking',backgroundImage:'/images/backgrounds/tableBack.png', height: 64, color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_4.png', leftImage: '/images/tableviews/bikeParking.png', hasChild: true,
				headerfont: {fontSize:14,fontFamily:'Helvetica-Bold' },subheaderfont: {fontSize:12,fontFamily:'Helvetica-Bold' },windowBarColor:'#D34140', 
				theSQL : 'select * from byBike where Type in ("Bike Share", "Bike Rack")', orderField: 'name', theHeaderField: 'Name', theRowHeaderField: 'Name', theRowHeaderTop: 2, theRowNameField: 'Type2', 
				theRowSubHeadingField: 'artName' ,
				latitudeField: 'Lat', longitudeField:'Lon', jsonField: 'parkpoint_json', 
			
				typeField: 'Type2', summaryField: 'Name',
				descriptionField: 'site_description', defaultPhotoLink: '/images/photos/parks/shelby_btm.jpeg', tableIDField: 'bybike_id', 
				parkActivitiesFields :[],
				featureType: 'Line',				
				 photoField: 'images', theZoomSQL : 'Select Type2, Type, site_description, bybike_id, Name, artName, images, parkpoint_json, Lat, Lon  from byBike where bybike_id = ', backButtonPath: 'images/buttons/back_main.png',
				 mapSettings: {mapIconPath: 'icons/mappins/', polyLineColor: '#ff7800', pointColor: '#ff7800', startLocator: true, mainLayer: 'sidewalksbikes',
				mapIconField: 'mapicon', mapTitleField:'Name', mapCategoryField:'Type2',  tableIDField: 'bybike_id', initialfilterDistance: 2}
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
                   navGroup.closeWindow(bikeWindow);
                });
                bikeWindow.leftNavButton = leftButton;
            }
    
    var tableview = Titanium.UI.createTableView({
        data:data,
        top:0,
        //height:448,
        width:320,
        //color:'#fff',
        //font:{fontSize:18,fontFamily:'Helvetica-Bold',  fontColor:'#0C72BA'},
        backgroundColor:'transparent',
        //backgroundImage:'/images/backgrounds/tableBack.png',
        separatorColor:'#fff'
        });
	bikeWindow.add(tableview);

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.width = 768;
	}


/*tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,barColor:'#000'
		});
		Nash.navGroup.open(win,{animated:true});
	}
	else if (e.rowData.title == 'Explore Near Me') {
		 /*Nash.navGroup.open(Nash.ui.createMetroParksWindow({
                //title: e.rowData.name,
               // uid: e.rowData.uid,
                //name: e.rowData.name
            }), {
                animated: true
            });
		
	}*/
//TABLEVIEW EVENT LISTENER 
//TABLEVIEW EVENT LISTENER 
tableview.addEventListener('click', function(e)
{

	
		
			
		 if (e.rowData.title == "Bike Share Program"){
				var theBikeShareWindow =  require("/windows/byBike_child_share");
				navGroup.openWindow(new theBikeShareWindow(e.rowData, navGroup, gpsInfo));
		}
		
		
		else if (e.rowData.title == "The Groove"){
				var theGrooveWindow =  require("/windows/byBike_child_groove");
				navGroup.openWindow(new theGrooveWindow(e.rowData, navGroup, gpsInfo));

		}
			else if (e.rowData.title == "Road Routes"){
				
				var theRRWindow =  require("/windows/byBike_child_roadroutes");
				navGroup.openWindow(new theRRWindow(e.rowData, navGroup, gpsInfo));
		}
		
		else  {		
			Ti.App.fireEvent('show_indicator', {message: 'Loading Maps and Data . . .'});
			var genericChildWindow = require("/windows/Generic_child");
			navGroup.openWindow(new genericChildWindow(e.rowData, navGroup, gpsInfo));
		
		}

	


	}); 
	
	
    return bikeWindow;
         
}
module.exports = bkW;    
    


