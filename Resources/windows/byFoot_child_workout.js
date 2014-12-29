function WorkOut(navGroup){
    var previouslyFinished = false;
 	var self = Titanium.UI.createWindow({
            id: 'walk100',
            title: 'Workout Category',
            backgroundImage: '/images/backgrounds/background.png',
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
         navGroup.closeWindow(self);
        });
        
	var walkView = Ti.UI.createView({
		backgroundColor:'transparent',
		height: height * .1,
		width: width,
		top: height * .15
	});
	
	var runView = Ti.UI.createView({
		backgroundColor:'transparent',
		height: height * .1,
		width: width,
		top: height * .25
	});
	
	self.add(walkView, runView);
	
	var walkButton = Ti.UI.createImageView({
		image: '/images/buttons/blue_off.png',
		height: height * .08,
		width: height * .08,
		left: width *.22
	});
	
	var runButton = Ti.UI.createImageView({
		image: '/images/buttons/blue_off.png',
		height: height * .08,
		width: height * .08,
		left: width *.22
	});

	var walkLabel = Ti.UI.createLabel({
		text: 'Walk',
		color: '#000000',
		font:{fontSize:36, fontFamily:'HelveticaNeue-Light'},
		left: width * .42
	});
	
	
	
	var runLabel = Ti.UI.createLabel({
		text: 'Run',
		color: '#000000',
		font:{fontSize:36, fontFamily:'HelveticaNeue-Light'},
		left: width * .42
	});
	
	var select = Ti.UI.createLabel({
		text: 'Choose Your Workout',
		color: '#000000',
		font:{fontSize:22},
		top: height * .05
	});
	
	self.add(select);
	walkView.add(walkButton, walkLabel);
	runView.add(runButton, runLabel);
	
	var start = Ti.UI.createButton({
		backgroundColor: '#F27536',
		title: '',
		backgroundImage:'',
		width: width * .75,
		height: height * .17,
		top: height*.4
	});
	
	var startView = Ti.UI.createView({
		backgroundColor: 'transparent',
		width: start.width,
		height: start.height
	});
	
	var startLabel = Ti.UI.createLabel({
		text: 'START \n WORKOUT',
		color: '#ffffff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font:{fontSize:'30sp', fontFamily:'HelveticaNeue-Light'},
	});
	
	startView.add(startLabel);
	start.add(startView);
	self.add(start);
	
	var info = Ti.UI.createButton({
		backgroundImage: '/images/buttons/info.png',
		height: width * .15,
		width: width * .15,
		bottom: height * .03,
		left: height * .03		
	});
	
	info.addEventListener('click', function(){ 
		var htmlWindow = require('/windows/htmlWindow');
		var windowTitle = 'Workout Tracker';
		var html = '/pages/fivi.html';
		var bar = '#F07534';
		navGroup.openWindow(new htmlWindow(navGroup, windowTitle, html, bar));
   	});
   	

	self.add(info);
	
	
	 if (Ti.Platform.osname == 'ipad'){
	 	walkLabel.left = width * .35;
	 	runLabel.left = width * .35;
	 	select.font = {fontSize:35};
	 	startLabel.font = {fontSize:'40sp', fontFamily:'HelveticaNeue-Light'};
	 	}
	
	var workouttype = "";
	
	walkButton.addEventListener('click', function(){ 
		walkButton.image = '/images/buttons/blue_on.png';
		workouttype = "walking";
		runButton.image = '/images/buttons/blue_off.png';
   	});
   	
	runButton.addEventListener('click', function(){ 
		runButton.image = '/images/buttons/blue_on.png';
		workouttype = "running";
		walkButton.image = '/images/buttons/blue_off.png';
   	});  
   	
   	start.addEventListener('click', function(){ 
   		

   		if (workouttype !== ''){
		//var startButtonClicked = false;
		var pauseResumeButtonClicked = false;
		var finishButtonClicked = false;
		var myInterval;
		var elapsedSeconds = 0;
		var distanceTraveled = 0;
		var distanceTimeModule = require('windows/locationTime');
		
		var service;
 

        var work = Titanium.UI.createWindow({
            id: 'walk100',
            title: 'Log My Workout',
            backgroundColor: '#ffffff',
            barColor: '#F07534',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });


		var workHiderView = Titanium.UI.createView({
			width: '100%',
			height: '100%',
			//height: Ti.UI.FILL,
			backgroundColor: 'white'
		});

		work.addEventListener("focus", function(e){
			Ti.API.info("Workout Timer Window Opened");
			Ti.API.info(JSON.stringify(e));
			if(previouslyFinished){  //skip this window if finish has already been pressed.
				previouslyFinished = false;
				navGroup.closeWindow(work, {animated:false});
				work.remove(workHiderView);
			}
		});


		var info = Ti.UI.createButton({
			backgroundImage: '/images/buttons/info.png',
			height: width * .15,
			width: width * .15,
			bottom: height * .03,
			left: height * .03		
		});
		
		info.addEventListener('click', function(){ 
			var htmlWindow = require('/windows/htmlWindow');
			var windowTitle = 'Workout Tracker';
			var html = '/pages/fivi.html';
			var bar = '#F07534';
			navGroup.openWindow(new htmlWindow(navGroup, windowTitle, html, bar));
	   	});
	   	
		work.add(info);
		
		var distanceValueLabel = Ti.UI.createLabel({
			color: '#000000',
			font: { fontSize:104, fontFamily:'HelveticaNeue-Light' },
			text: '0.000',
			top: 0,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
		
		var distanceLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light'  },
		  text: 'TOTAL DISTANCE',
		  bottom: 1,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
		
	    
	    distanceView = Ti.UI.createView({
	    	backgroundColor: '#ffffff',
	    	width: width,
	    	height: height * .25,
	    	top:0
	    });
	    
	    distanceView.add(distanceLabel, distanceValueLabel);
	    work.add(distanceView);
	    
	    var timeValueLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:80, fontFamily:'HelveticaNeue-Light'},
		  text: '00:00:00',
		  top: 0,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	    
	    var timeLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light'  },
		  text: 'TOTAL TIME',
		  bottom: 1,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	    
	    
	    	    
	    timeView = Ti.UI.createView({
	    	backgroundColor: '#F6F7F8',
	    	width: width,
	    	height: height * .20,
	    	top: height * .28
	    });
	    
	    
	    timeView.add(timeLabel, timeValueLabel);
	    work.add(timeView);
	    
	    
	    var currentPaceLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:12, fontFamily:'HelveticaNeue-Light' },
		  text: 'CURRENT PACE',
		  left: width * 0.05,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	    
	    var paceValueLabel = Ti.UI.createLabel({
		  color: '#000000',
		  font: { fontSize:30, fontFamily:'HelveticaNeue-Light' },
		  left: width * .42,
		  text: '0.00 min/mi',
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
	    
	    
	    var paceView = Ti.UI.createView({
	    	backgroundColor: '#E6E6E6',
	    	width: width,
	    	height: height * .10,
	    	top: height * .48
	    });
	    
	    
	    paceView.add(currentPaceLabel, paceValueLabel);

		work.add(paceView);
	        
	    var startButton = Titanium.UI.createButton({
	   		title: 'Start',
	   		top: 330,
	   		width: 100,
	   		height: 25
		});
		
		//startButtonClicked = true;
	   	myInterval=setInterval(function(){myTimer();},1000);
	   	var d = new Date();
	   	distanceTimeModule.setStartTime(d);
		
	        
	    
	    var pauseResumeButton = Titanium.UI.createButton({
	    	title: 'Pause',
	   		font:{fontSize:18,fontFamily:'HelveticaNeue-Light'},
			color: '#ffffff',
			backgroundColor: '#000000',
			backgroundImage:'',
			width: width * .45,
			height: width * .13,
			top: height * .62
			});
		
		pauseResumeButton.addEventListener('click',function(e)
		{
	   		Titanium.API.info("You clicked the Pause Resume button");
	   		var d = new Date();
	   		if (pauseResumeButton.title == 'Pause') {  //user clicked pause, so pause the timer
	   				pauseResumeButton.title = 'Resume';
	   				clearInterval(myInterval);
	   			    distanceTimeModule.pauseTime(d);
	   	
	   		 	
	   		} 
	   		
	   		else if (pauseResumeButton.title == 'Resume'){ //user clicked resume, so restart the timer
	   			pauseResumeButton.title = 'Pause';  
	   			myInterval=setInterval(function(){myTimer();}, 1000);
	            elapsedSeconds = distanceTimeModule.resumeTime(d);
	   		}		
		});
	    
	    
	    var finishButton = Titanium.UI.createButton({
	    	title: 'Finish',
	   		font:{fontSize:18,fontFamily:'HelveticaNeue-Light'},
			color: '#ffffff',
			backgroundColor: '#FF3333',
			backgroundImage:'',
			width: width * .45,
			height: width * .13,
			top: height * .73
			});


		 if (Ti.Platform.osname == 'ipad'){
		 	distanceLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	distanceValueLabel.font = {fontSize:204, fontFamily:'HelveticaNeue-Light'};
		 	timeValueLabel.font = {fontSize:150, fontFamily:'HelveticaNeue-Light'};
		 	timeLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	pauseResumeButton.font = {fontSize:26, fontFamily:'HelveticaNeue-Light'};
		 	finishButton.font = {fontSize:26, fontFamily:'HelveticaNeue-Light'};
		 	currentPaceLabel.font = {fontSize:17, fontFamily:'HelveticaNeue-Light'};
		 	paceValueLabel.font = {fontSize:40, fontFamily:'HelveticaNeue-Light'};
		 	}

		
		finishButton.addEventListener('click',function(e)
		{
	   	   if (finishButton.title == 'Finish') {
	   	 	
	   		dialog.show();
	   	   }
	   		
		});
	    
		
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Log Workout', 'Keep Recording', 'Reset Workout'],
		    message: 'Would you like to log your workout to the web?',
		    title: 'Log Workout?'
		 });
		  dialog.addEventListener('click', function(e){
		  	Ti.API.info(e.index);
		    if (e.index === e.source.cancel){  //cancel (do nothing)
		      	Ti.API.info('The cancel button was clicked');
		    }
		    else if (e.index === 0) { 
		    	
		    	 //pause the workout and log the data
		    	work.add(workHiderView);
		    	previouslyFinished = true;
		    	var d = new Date();
		     	
		     	pauseResumeButton.title = 'Resume';
	   			
	   			distanceTimeModule.pauseTime(d);
		     	
	   			elapsedTimeObj = distanceTimeModule.calcTimeDistanceElapsed(d);
	   		 	//alert(elapsedTimeObj);
	   		 	Ti.API.info(JSON.stringify(elapsedTimeObj));	
		    	Ti.API.info('Logging Total Time As: ' + elapsedSeconds);
		    	clearInterval(myInterval);
		    	resetTimer();
		    	var summaryWindow = require('/windows/byFoot_child_workout_summary');
				navGroup.openWindow(new summaryWindow(navGroup, elapsedTimeObj, workouttype));
		    }
		    else if (e.index === 2) {  //reset everything
				
								clearInterval(myInterval);
		    					resetTimer();
						    	navGroup.closeWindow(work);
		    }
		    	
		  });
		
			
			
			function resetTimer() {
				Ti.API.info("Resetting Timer.  Total Seconds = " +elapsedSeconds);
		    	elapsedSeconds = 0;
		    	distanceTraveled = 0;
		    	clearInterval(myInterval);
		    	distanceValueLabel.text = "0.000",
		    	paceValueLabel.text = "0.00 min/mi",
		    	timeValueLabel.text = "00:00:00";
		    	pauseResumeButton.title = 'Pause';
		    	//startButton.title = "Start";
		    	//finishButton.title = "Finish";
		    	//startButtonClicked = false;
		    	distanceTimeModule.resetTime();
		    	
			}
			
			//TIMER CODE     
			//var myVar=setInterval(function(){myTimer();},1000);
			
			
			
			function myTimer()
			{
				elapsedSeconds = elapsedSeconds + 1;
				var hours = parseInt(elapsedSeconds/3600, 10) % 24;
				var minutes = parseInt(elapsedSeconds/60, 10) % 60;
				var seconds = elapsedSeconds % 60;
				//var d=new Date();
				//var t=d.toLocaleTimeString();
				if (elapsedSeconds % 2 === 0) {
					distanceValueLabel.text = distanceTimeModule.getdistanceTraveled().toFixed(3);
					paceValueLabel.text = distanceTimeModule.getSpeed().toFixed(2) + " min/mi";
					var calculatedTime = distanceTimeModule.gettotalSecondsElapsed();
					if (calculatedTime > elapsedSeconds) {
						elapsedSeconds = calculatedTime;
					}
				}
				
				 
				timeValueLabel.text=pad(hours,2)+":"+ pad(minutes,2) + ":" + pad(seconds,2);
			}
	     
	     	function pad(num, size) {
	    		var s = "000000000" + num;
	    		return s.substr(s.length-size);
			}
	        
	       	//work.add(startButton);
	        
	        work.add(pauseResumeButton);
	        
	        work.add(finishButton);
	      
	        
			var backButtonTimer = Ti.UI.createButton({
	   			//title: "Back",
	   			backgroundImage: 'images/buttons/back_main.png',
	   			width: 58,
	            height: 20
	   		});
	
			work.setLeftNavButton(backButtonTimer);
			
			backButtonTimer.addEventListener("click", function(){
						var dialog2 = Ti.UI.createAlertDialog({
						    cancel: 1,
						    buttonNames: ['Confirm', 'Cancel'],
						    message: 'Are you sure you want to reset your workout and exit?',
						    title: 'Reset Workout and Exit?'
						  });
						  dialog2.addEventListener('click', function(e){
						    if (e.index === e.source.cancel){
						      Ti.API.info('The cancel button was clicked');
						      //do nothing and return to workout
						    }
						    else {
						    	clearInterval(myInterval);
		    					resetTimer();
						    	navGroup.closeWindow(work);
						    }
						    
						  });
						  dialog2.show();	
	         	
	         });
	       
	      work.orientationModes = [Ti.UI.PORTRAIT];
	
	                navGroup.openWindow(work);
		}
		
		else {
			
			var workoutalert = Titanium.UI.createAlertDialog({
    			title:'Choose Your Workout Type',
   				message:'Please select the type of workout before proceeding.'
			});
			workoutalert.show();

		}
   	});   	
	


               
               return self;
        
    }
module.exports = WorkOut;