function Walks(navGroup){
	
        
        
        var self = Titanium.UI.createWindow({
            id: 'walks',
            title: 'Scheduled Walks',
           	backgroundColor: '#ffffff',
            barColor: '#F07534',
            backgroundColor:'#ffffff',
			orientationModes: [Ti.UI.PORTRAIT],
			translucent: false,
	   	 	statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
	   	});
                        
		var back = Ti.UI.createButton({
				backgroundImage: '/images/buttons/back_main.png',
				height: 20,
				width: 58
			});
	
		self.setLeftNavButton(back);
			
		back.addEventListener('click', function(){
				navGroup.closeWindow(self);
			});        
		
		walksTable = createNewsTable('https://nashvitality.appspot.com/nashvitality/default/walkfeed.json');
		self.add(walksTable);		
		
		
	    

	
	function createNewsTable(url){	

		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', url);
		var data = [];

		var walksTable = Ti.UI.createTableView({
			height: 'auto', 
			width: width,
			top:0,
			left:0,
			rowHeight: 64
		});
		
		walksTable.setSeparatorInsets({left:0, right:0});
		
		
		/*if (Ti.Platform.osname == 'ipad')  
			{  
    		theNewsTable.width = width;
    		theNewsTable.top = 60;
			};*/
			
	walksTable.addEventListener('click', function(e){
			var selectedRow = e.rowData; //row index clicked
			
			
			var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Go to Apple Maps', 'Cancel'],
		    message: 'Would you like directions to the starting location for the walk?',
		    //title: 'Di?'
		 	});
		  	
		  	
		  	dialog.addEventListener('click', function(e){
		  	Ti.API.info(e.index);
		    if (e.index === e.source.cancel){  //cancel (do nothing)
		      	Ti.API.info('The cancel button was clicked');
		    }
		    
		    else if (e.index === 0) { 
		    	if (Ti.Platform.version >= '6.0') {
       			Ti.App.fireEvent('openURL', {url:'https://maps.apple.com/maps?daddr='+selectedRow._lat+','+selectedRow._lon});
    			} 
				else {
       			Ti.App.fireEvent('openURL', {url:'https://maps.google.com/maps?daddr='+selectedRow._lat+','+selectedRow._lon});
   				}	
		    }
		   
		  
		  	});
			
			dialog.show(); 

		});
		
		var headings=[];
		var eventList=[];
		var currentColumn;
		var currentRowNum;
		var oldRowNum = 2;
		var currentValues = [];
		
		
		xhr.onload = function(){
			
			var walksList = JSON.parse(this.responseText);
			
			//Create the table for events
			if(typeof(walksList.walk100) !== 'undefined'  && walksList.walk100 !== null){
				
						
						
						Ti.API.info("This is the eventlist: ");		
						Ti.API.info("This is one record from the eventlist: ");
						Ti.API.info("This is one field from one record of the eventlist: ");
				   		
				   		
						var walksByDate = walksList.walk100;
						walksByDate.sortBy(function(){return [this.f_date, this.f_time];});
						
				
			
					    for (var i = 0; i< walksByDate.length; i++){
					    	
							
							
					    	
							var formattedDate = walksByDate[i].f_date + " " + walksByDate[i].f_time;

							var moment = require('/libs/moment.min');
							var date = moment(formattedDate).format('LLLL');
							//formattedDate = Date.parse(formattedDate);
							
							
							var row = Ti.UI.createTableViewRow({
								hasChild: true,
								backgroundImage: '/images/backgrounds/tableBack.png',
								_mytitle: walksByDate[i].f_location,
								_date: walksByDate[i].f_date,
								_formattedDate: formattedDate,
								_time:walksByDate[i].f_time,
								_lat: walksByDate[i].f_lat,
								_lon: walksByDate[i].f_lon
								
							});
							
							var dateLabel = Ti.UI.createLabel ({
								text: date,
								font: {fontSize:14,fontFamily:'HelveticaNeue-Light' },
								left: 10,
								top: 5,
								//height: 20,
								width: width * .85,
								color: '#000'
							});
							row.add(dateLabel);
							
							var locationLabel = Ti.UI.createLabel({
								text: walksByDate[i].f_location,
								font: {fontSize:14,fontFamily:'HelveticaNeue-Bold' },
								left: 10, 
								top: 25, 
								//height: 40,
								width: 275
							});
					
											
							
							row.add(locationLabel);
							
							
							
							
							//var 
							data.push(row);
						}
			
			
			
			}
			
			
			walksTable.data = data;
		};
			
			//Ti.API.info(eventList);
			
		
		
		xhr.onerror = function(){
			Ti.API.error(this.status + '-' + this.statusText);
		};
		
		
		
		
		xhr.send();

		return walksTable;

     }
     
     (function(){
		  if (typeof Object.defineProperty === 'function'){
		    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
		  }
		  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
		
		  function sb(f){
		    for (var i=this.length;i;){
		      var o = this[--i];
		      this[i] = [].concat(f.call(o,o,i),o);
		    }
		    this.sort(function(a,b){
		      for (var i=0,len=a.length;i<len;++i){
		        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
		      }
		      return 0;
		    });
		    for (var i=this.length;i;){
		      this[--i]=this[i][this[i].length-1];
		    }
		    return this;
		  }
	})();
        
        
        
        return self;
    }

module.exports = Walks;