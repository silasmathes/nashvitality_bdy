function summaryWindow(navGroup,elapsedTimeObj, workouttype){
 Ti.API.info(JSON.stringify(elapsedTimeObj));
 Ti.API.info(workouttype);	
 var workoutLogged = false;

 var finalFeetTraveled = Math.round(elapsedTimeObj.distanceTraveled * 5280, 0);
 var finalWorkoutTime = elapsedTimeObj.totalSecondsElapsed;
 var finalActivityType = workouttype;

var dateSeconds = new Date();
dateSeconds.setTime(finalWorkoutTime *1000); 
	
 var height = Ti.Platform.displayCaps.platformHeight;
 var width = Ti.Platform.displayCaps.platformWidth;
 	var self = Titanium.UI.createWindow({
            id: 'walk100',
            title: 'Record a Workout',
            backgroundColor: '#ffffff',
            barColor: '#F07534',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
	
	var backButton = Ti.UI.createButton({
   			backgroundImage: 'images/buttons/back_main.png',
   			width: 58,
            height: 20
   		});

		self.setLeftNavButton(backButton);
		
	backButton.addEventListener("click", function(){			
         if(!workoutLogged){
            var dialog1 = Ti.UI.createAlertDialog({
								    cancel: 1,
								    buttonNames: ['Confirm', 'Cancel'],
								    message: "You haven't logged your workout yet.  Are you sure you want to leave this window?",
								    title: 'Leave Workout Summary?'
								  });
								  dialog1.addEventListener('click', function(e){
								    if (e.index === e.source.cancel){
								      Ti.API.info('The cancel button was clicked');
								      //do nothing and return to workout
								    }
								    else {
		 								navGroup.closeWindow(self);
								    }
								    
								  });
					dialog1.show();
		 } else {				
         	workoutLogged = false;  //reset the variable
         	navGroup.closeWindow(self);
         }	
       });
        
	var summaryLabel = Ti.UI.createLabel({
		text: 'Workout Summary',
		color: '#000000',
		font:{fontSize:28, fontFamily:'HelveticaNeue-Light'},
		top: height * .01
	});
	
	
	var typeView = Ti.UI.createView({
		backgroundColor:'transparent',
		height: height * .2,
		width: width,
		top: 0
	});
	
	typeView.add(summaryLabel);
	
	
	
	var timeView = Ti.UI.createView({
		backgroundColor:'transparent',
		borderColor:'#E8E8E8',
		borderWidth: 1,
		height: height * .15,
		width: width,
		top: height * .15
	});
	
	var timeValueLabel = Ti.UI.createLabel({
		font: { fontSize:50, fontFamily:'HelveticaNeue-Light'},
		  text: elapsedTimeObj.timeValueString,
		  color: '#000000',
		  top: 0,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE			
	});
	

	timeView.add(timeValueLabel);
	
		 var timePicker = Ti.UI.createPicker({
		  color: '#000000',
		  type: Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER,
		  
		  //font: { fontSize:50, fontFamily:'HelveticaNeue-Light'},
		  //value: elapsedTimeObj.timeValueString.substring(0,2),
		  //useSpinner: true,
		  top: height * .3,
		  //selectionIndicator: true
		  //left: height*.08,
		  //width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			//keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
			visible: false
		
		});
		timePicker.selectionIndicator = true;
		
		
	    var timeLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light'  },
		  text: 'TOTAL TIME',
		  bottom: 1,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	


	timeView.add(timeLabel);
	
	//timeView.add(picker);
	//timeView.add(timePicker);
	//timeView.add(timeValueLabel);
	
	var distanceView = Ti.UI.createView({
		backgroundColor:'transparent',
		height: height * .15,
		width: width,
		top: height * .3
	});
	
	var done = Ti.UI.createButton({
    	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
    	title : 'Enter'
	});
	var cancel = Ti.UI.createButton({
    	systemButton : Ti.UI.iPhone.SystemButton.CANCEL
	});

	var flexSpace = Ti.UI.createButton({
    	systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});


		var distanceValueTextArea = Ti.UI.createTextArea({
			editable: false,
			color: '#000000',
			font: { fontSize:50, fontFamily:'HelveticaNeue-Light' },
			value: elapsedTimeObj.distanceTraveled.toFixed(3),
			top: -3,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
			keyboardToolbar : [cancel, flexSpace, done]
		});

	 done.addEventListener('click', function(e) {
       distanceValueTextArea.blur();
     });
		
		var distanceLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light'  },
		  text: 'TOTAL MILES',
		  bottom: 1,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	
	distanceValueTextArea.addEventListener('blur', function(e){
		 if(Number(distanceValueTextArea.value) == 0 || isNaN(Number(distanceValueTextArea.value))) {
		 	distanceValueTextArea.setSelection(0, distanceValueTextArea.value.length);
		 	
		 	//distanceValueTextArea.focus();
		 } else {
			 recalculateTime();
		}
	});
	
	
	distanceView.add(distanceValueTextArea);
	distanceView.add(distanceLabel);
	
	var paceView = Ti.UI.createView({
		backgroundColor:'transparent',
		borderColor:'#E8E8E8',
		borderWidth: 1,
		height: height * .1,
		width: width,
		top: height * .45
	});
	
	
	
	
		var paceLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light' },
		  text: 'AVERAGE PACE',
		  left: width * 0.05,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	    
	    var paceValueLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:30, fontFamily:'HelveticaNeue-Light' },
		  left: width * .42,
		  text: elapsedTimeObj.averagePace + ' min/mi',
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	
	paceView.add(paceValueLabel);
	paceView.add(paceLabel);
	
	
	self.add(typeView, timeView, distanceView, paceView);
	
	//self.add(timePicker);
	var editButton = Titanium.UI.createButton({
	    title: 'Edit Data',
	   	font:{fontSize:18,fontFamily:'HelveticaNeue-Light'},
		color: '#ffffff',
		backgroundColor: '#FF3333',
		backgroundImage:'',
		width: width * .58,
		height: width * .13,
		top: height * .60
		});	
		
	self.add(editButton);
	
	editButton.addEventListener('click', handleEdits);
	
	
	var LogButton = Titanium.UI.createButton({
	    title: 'Log Your Workout',
	   	font:{fontSize:18,fontFamily:'HelveticaNeue-Light'},
		color: '#ffffff',
		backgroundColor: '#99CC33',
		backgroundImage:'',
		width: width * .58,
		height: width * .13,
		top: height * .71
		});	
		
	self.add(LogButton);
	
	
	LogButton.addEventListener('click', function(e){
		workoutLogged = true;
		editButton.removeEventListener('click', handleEdits);
		if (LogButton.title === "Log Your Workout"){
		
				LogButton.title = 'Workout Submitted';
				
				var web = Ti.UI.createWebView({
					url: 'https://nashvitality.fivi.com/activity/new/?activity='+ finalActivityType +'&feet=' + finalFeetTraveled + '&seconds=' + finalWorkoutTime
				
				});
				
				var webWindow = Titanium.UI.createWindow({
		            id: 'walk100',
		            title: 'Fivi NashVitality',
		            backgroundColor: '#ffffff',
		            barColor: '#F07534',
		            width: '100%',
		            height: '100%',
		            fullscreen: false,
		            translucent: false,
		            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
		        });
		        
		        var backButton2 = Ti.UI.createButton({
		   			backgroundImage: 'images/buttons/back_main.png',
		   			width: 58,
		            height: 20
		   		});
		
				webWindow.setLeftNavButton(backButton2);
				
				backButton2.addEventListener("click", function(){			
		          
		          var dialog2 = Ti.UI.createAlertDialog({
								    cancel: 1,
								    buttonNames: ['Confirm', 'Cancel'],
								    message: 'Are you sure you want to leave this website?',
								    title: 'Leave Website?'
								  });
								  dialog2.addEventListener('click', function(e){
								    if (e.index === e.source.cancel){
								      Ti.API.info('The cancel button was clicked');
								      //do nothing and return to workout
								    }
								    else {
		 								navGroup.closeWindow(webWindow);
								    }
								    
								  });
					dialog2.show();	
		          
		         
		          
		         
		        });
		        
		        webWindow.add(web);
		        
		        navGroup.openWindow(webWindow);
       }
       
       else {
       	//navGroup.openWindow(mainWindow);
       	//alert('Workout has been Submitted');
       }
	});
	
	var info = Ti.UI.createButton({
		backgroundImage: '/images/buttons/info.png',
		height: width * .15,
		width: width * .15,
		bottom: height * .03,
		left: height * .03		
	});

	self.add(info);
	
	info.addEventListener('click', function(){ 
		var htmlWindow = require('/windows/htmlWindow');
		var windowTitle = 'Workout Tracker';
		var html = '/pages/fivi.html';
		var bar = '#F07534';
		navGroup.openWindow(new htmlWindow(navGroup, windowTitle, html, bar));
   	});
	
	var walkButton = Ti.UI.createButton({
		image: '/images/buttons/blue_off.png',
		height: height * .08,
		width: height * .08,
		left: height *.03,
		top: height*.07
	});
	
	var runButton = Ti.UI.createButton({
		image: '/images/buttons/blue_off.png',
		height: height * .08,
		width: height * .08,
		left: height *.3,
		top: height*.07
	});

	var walkLabel = Ti.UI.createLabel({
		text: 'Walk',
		color: '#000000',
		font:{fontSize:24, fontFamily:'HelveticaNeue-Light'},
		left: height * .13,
		top: height*.09
	});
	
	
	
	var runLabel = Ti.UI.createLabel({
		text: 'Run',
		color: '#000000',
		font:{fontSize:24, fontFamily:'HelveticaNeue-Light'},
		left: height * .4,
		top: height*.09
	});
	
	typeView.add(walkButton);
	typeView.add(walkLabel);
	typeView.add(runButton);
	typeView.add(runLabel);


 	if (Ti.Platform.osname == 'ipad'){
		 	timeLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	paceLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	paceValueLabel.font = {fontSize:50, fontFamily:'HelveticaNeue-Light'};
		 	editButton.font = {fontSize:26, fontFamily:'HelveticaNeue-Light'};
		 	LogButton.font = {fontSize:26, fontFamily:'HelveticaNeue-Light'};
		 	walkLabel.font = {fontSize:36, fontFamily:'HelveticaNeue-Light'};
		 	runLabel.font = {fontSize:36, fontFamily:'HelveticaNeue-Light'};
		 	distanceLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	}	
 
 timePicker.addEventListener('change',function(e)
	{
				
		//Ti.API.info(e.value.toLocaleString());
		Ti.API.info(e);
		tps = e.countDownDuration/1000;
		finalWorkoutTime = tps;
		var hours = parseInt(tps/3600, 10) % 24;
		var minutes = parseInt(tps/60, 10) % 60;
		var seconds = tps % 60;
	//var totalWorkoutSeconds = parseInt(Math.abs(endTime-workoutStartTime)/1000, 10);
		var newTimeString = pad(hours,2) + ":" + pad(minutes,2) + ":" + pad(seconds,2); 
		timeValueLabel.text = newTimeString;
		recalculateTime(); 
		//Ti.API.info("row index: "+e.rowIndex+", column index: "+e.columnIndex);
		//Ti.API.info("row value: "+e);
	});
 
	
	
	self.add(timePicker);
	var timePickerVisible = false;

	function handleEdits(){
		//distanceView.remove(distanceValueTextArea);
		//distanceView.add(distanceTextArea);
		distanceValueTextArea.setEditable(true);
		distanceValueTextArea.color = '#ff0000';	    
		timeValueLabel.color = '#ff0000';
		runButton.addEventListener('click', function(e){
				workouttype == "running";
				runButton.image = '/images/buttons/blue_on.png';
				walkButton.image = '/images/buttons/blue_off.png';
		});
		runLabel.color = '#ff0000';
		
		walkButton.addEventListener('click', function(e){
				workouttype == "walking";
				runButton.image = '/images/buttons/blue_off.png';
				walkButton.image = '/images/buttons/blue_on.png';
		});	
		walkLabel.color = '#ff0000';
		
		
		
		timeValueLabel.addEventListener('click', function(e){
			if (timePickerVisible === false) {
				timePicker.show();
				timePickerVisible = true;
			} else {
				timePicker.hide();
				timePickerVisible = false;
			}
			
		});
		
		
		editButton.removeEventListener('click', handleEdits);
	}
	
	
	function recalculateTime(){
		finalFeetTraveled = Math.round(Number(distanceValueTextArea.value) * 5280, 0);
 		//finalWorkoutTime = Number(timeHRSValueLabel.value) * 3600 + Number(timeMINSValueLabel.value)*60 + Number(timeSECSValueLabel.value);
 		Ti.API.info(finalFeetTraveled);
 		Ti.API.info(finalWorkoutTime);
 		var newPaceValue = (finalWorkoutTime/60) / (finalFeetTraveled/5280);
 		
 		paceValueLabel.text =  newPaceValue.toFixed(1) + ' min/mi';
 		
 		//var finalActivityType = workouttype;
	}
	
	function pad(num, size) {
	    		var s = "000000000" + num;
	    		return s.substr(s.length-size);
			}
	
	if (workouttype == "running"){
		runButton.image = '/images/buttons/blue_on.png';
	}
	else {
		walkButton.image = '/images/buttons/blue_on.png';
	}

               
               return self;
        
    }
module.exports = summaryWindow;