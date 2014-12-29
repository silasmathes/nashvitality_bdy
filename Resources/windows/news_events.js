
var height = Ti.Platform.displayCaps.platformHeight;
var width = Ti.Platform.displayCaps.platformWidth;
var moment = require('/libs/moment.min');

function News(navGroup){
	
        var StyledLabel = require('ti.styledlabel');
        
        var self = Titanium.UI.createWindow({
            id: 'newsEventsWindow',
            title: 'News & Events',
           	backgroundImage: '/images/backgrounds/background.png',
            barColor: '#7C7C7F',
            fullscreen: false,
            orientationModes: [Ti.UI.PORTRAIT],
            navBarHidden: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
                        
        });
	
       	var back = Ti.UI.createButton({
            backgroundImage: 'images/buttons/back_main.png',
            width: 58,
            height: 20
        });
        
        
        back.addEventListener('click', function () {
                    navGroup.closeWindow(self);
                });
        
        self.leftNavButton = back;      
        
        var newsButton = Ti.UI.createButton({
        	title: 'News',
        	font: {fontSize:18,fontFamily:'Helvetica-Bold' },
        	backgroundImage: '/images/buttons/news_off.png',
        	borderColor: '#000000',
        	borderWidth: 1,
        	top: 0,
        	right: 0,
        	height: height * .1,
        	width: width /2
        });
        
        
         var eventsButton = Ti.UI.createButton({
        	title: 'Events',
        	font: {fontSize:18,fontFamily:'Helvetica-Bold' },
        	backgroundImage: '/images/buttons/news_on.png',
        	borderColor: '#000000',
        	borderWidth: 1,
        	top: 0,
        	left: 0,
        	height: height * .1,
        	width: width /2
        });
        
		if (Ti.Platform.osname == 'ipad')  
			{  
    		eventsButton.width = 200;
    		newsButton.width = 200;
   			eventsButton.height = 60;
   			newsButton.height = 60;
    		eventsButton.left = 184;
   			newsButton.right = 184;
			};	
			        
        eventsButton.addEventListener('click', function (e){
        	eventsButton.backgroundImage = '/images/buttons/news_on.png';
        	newsButton.backgroundImage = '/images/buttons/news_off.png';
        	myEventsTable.show();
        	myNewsTable.hide();
        });
        
        newsButton.addEventListener('click', function (e){
        	eventsButton.backgroundImage = '/images/buttons/news_off.png';
        	newsButton.backgroundImage = '/images/buttons/news_on.png';
        	myEventsTable.hide();
        	myNewsTable.show();
        });
        
        
		self.add(newsButton);
		self.add(eventsButton);
		
		myNewsTable = createItemsTable('http://www.nashville.gov/Feeds/NewsEventFeed.aspx?type=NEWS&catid=516');
		self.add(myNewsTable);		
		
		myEventsTable = createItemsTable('http://www.nashville.gov/Feeds/NewsEventFeed.aspx?type=EVENTS&catid=516');
		self.add(myEventsTable);	
			
	    myNewsTable.hide();
	    

	
	function createItemsTable(url){	

		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', url);
		var data = [];

		var theItemsTable = Ti.UI.createTableView({
			height: 'auto', 
			width: width,
			top:height * .1,
			left:0,
			rowHeight: 64
		});
		
		theItemsTable.setSeparatorInsets({left:0, right:0});
		
		if (Ti.Platform.osname == 'ipad')  
			{  
    		theItemsTable.width = 768;
    		theItemsTable.top = 60;
			};
			
		theItemsTable.addEventListener('click', function(e){
			var selectedRow = e.rowData; 
			
			Ti.API.info(selectedRow._mytitle);
			var detailWindow = Titanium.UI.createWindow({
				backgroundColor:'#ffffff',
				barColor: '#7C7C7F',
				translucent: false,
				id: 0
			});
			
			var back = Ti.UI.createButton({
            	backgroundImage: 'images/buttons/back_main.png',
           	 	width: 58,
            	height: 20
        	});
        
        
        	back.addEventListener('click', function () {
                    navGroup.closeWindow(detailWindow);
                });
        
        	detailWindow.leftNavButton = back; 
			
			
			var pubDateFormat = moment(selectedRow._date).format('LLLL');
			
			//finally, add the full description so we can read the whole recipe
			var calendar = Ti.UI.createLabel({
				text: pubDateFormat,
				font: {fontSize:16,fontFamily:'Helvetica' },				
				left: 10,
				top: 5,
				width: 310,
				color:'#000'
				
			});
			
			var infoTable = Ti.UI.createTableView ({
				top: height * .05,
				height: 'auto',
				separatorColor:'#fff'
			});
			
			var row0 = Ti.UI.createTableViewRow({
    			
  			});
			
			var row1 = Ti.UI.createTableViewRow({
    			
  			});
			var row2 = Ti.UI.createTableViewRow({
    			
  			});
			
			var row3 = Ti.UI.createTableViewRow({
    			
  			});
  			
  			
			
			var overview = Ti.UI.createLabel({
				text: selectedRow._mytitle,
				font: {fontSize:18, fontFamily:'Helvetica-Bold'},
				left: 10,
				top: 5,
				width: 310,
				color:'#000'
				
			});

			
			row0.add(calendar);
			row1.add(overview);	
			
			

			
			var lblDescription = StyledLabel.createLabel({	
				height:Ti.UI.SIZE,
				width: width * .95,
				top: width * .02,
				wordWrap:true,
				touchEnabled: true,
				html:'<font face="helvetica">' + selectedRow._mydesc + '</font>'
			});
			
			row2.add(lblDescription);
			
			
			
			
			//if (detailWindow.link) {
				var linkButton = Titanium.UI.createButton({
					backgroundImage: '/images/detail/moreinfo.png',
					left: 10,
					bottom: 10,
					width: 100,
					top: 10,
					height: 33,
					added: 0		
					});
					
					//this event listener will open the link in safari
				linkButton.addEventListener('click',function(e){
						Ti.Platform.openURL(selectedRow._link);
					});
					
					row3.add(linkButton);
			
			
			
			infoTable.setData([row0, row1, row2, row3]);	
			
			detailWindow.add(infoTable);
			
			
					
			 navGroup.openWindow(detailWindow);
		});
		
		var headings=[];
		var eventList=[];
		var currentColumn;
		var currentRowNum;
		var oldRowNum = 2;
		var currentValues = [];
		
		
		xhr.onload = function(){
			
			var xml = this.responseXML;
			var channel = xml.documentElement.getElementsByTagName("channel");
			var feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;
			
			var xmlList = xml.documentElement.getElementsByTagName("item");
			
			//Create the table
			if(typeof(xmlList) !== 'undefined'  && xmlList.length >0){
							
					    for (var i = 0; i< xmlList.length; i++){
					    	
					    	var fullTitle = xmlList.item(i).getElementsByTagName("title").item(0).text;
							
							var reTYD = /(\d{1,2}\/\d{1,2}\/\d{4})/i;
							var noDateTitle = (fullTitle.replace(reTYD, "")).trim();
					    	var pubDate = xmlList.item(i).getElementsByTagName("pubDate").item(0).text;
					    	
					    	
							var row = Ti.UI.createTableViewRow({
								hasChild: true,
								backgroundImage: '/images/backgrounds/tableBack.png',
								_mytitle: noDateTitle,
								_mydesc:xmlList.item(i).getElementsByTagName("description").item(0).text,
								_date: pubDate,								
								_link: xmlList.item(i).getElementsByTagName("link").item(0).text

							});
							
							Ti.API.info(xmlList.item(i).getElementsByTagName("link").item(0).text);

							
							var pubDateFormat = moment(pubDate).format('LLLL');
							
							
							
							var titleLabel = Ti.UI.createLabel ({
								text: pubDateFormat,
								font: {fontSize:14,fontFamily:'HelveticaNeue-Light' },
								left: 10,
								top: 5,
								width: width * .9,
								color: '#000'
							});
							row.add(titleLabel);
							
							var descriptionLabel = Ti.UI.createLabel({
								text:noDateTitle,
								font: {fontSize:14,fontFamily:'HelveticaNeue-Bold' },
								left: 10, 
								top: 25, 
								width: width * .9
							});
					
							
							if (descriptionLabel.text == ''){
								descriptionLabel.text = 'No description is available.';
							}
							
							row.add(descriptionLabel);
							
						
							
							
							data.push(row);
						}
			
			
			
			}
			
			
			theItemsTable.data = data;
		};	  
			
			
		
		
		xhr.onerror = function(){
			Ti.API.error(this.status + '-' + this.statusText);
		};
		
		
		
		
		xhr.send();

		return theItemsTable;

     }
        
        
        
        return self;
    }

module.exports = News;