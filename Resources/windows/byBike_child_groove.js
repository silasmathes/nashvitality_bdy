function grW (settings, navGroup, gpsInfo) {
    // Ti.API.info(settings.title);
	  //Ti.App.fireEvent('show_indicator', {title:'Loading Maps and Data ...'});   

	var _currentfilterDistance = 100000;
	Ti.API.info(settings);
	
	var x, y, lat, lon;
	var mapViewAdded = true;
	var tableViewAdded = false;

	//var maps = require('windows/map');
	var theMapURL = '/mapping/wm_local_bike_groove.html';
	//var theMapURL = 'http://users.leafletjs.com/';
	
	var mapView = Ti.UI.createWebView({
            url: theMapURL,
            backgroundColor: '#FFFFFF',
    		barColor: '#414444',
            top: 0,
            width: width,
            height: height*.8,
            fullscreen: false
       		 });
	
	if (Ti.Platform.osname == 'ipad'){
		mapView.height = height * .84;
	}

	
				
	var allBikeFields;
	
	//expose these UI elements to the rest of the function so that they can be removed if necessary.
     var informationContainer, addressContainer, shareContainer, toolbarParkInfo; 
  
    var myGeoJSON;

        var groove = Titanium.UI.createWindow({
            id: 'groove',
            title: settings.title,
            backgroundImage: '/images/backgrounds/background.png',
            barColor: settings.windowBarColor,
            width: '100%',
            height: '100%',
            fullscreen: false,
            userLocation : true,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
        groove.orientationModes = [Ti.UI.PORTRAIT];

	   //groove.add(mapView);
				
	var backButton = Ti.UI.createButton({
   			backgroundImage: 'images/buttons/back_main.png',
   			width: 58,
            height: 20
   	});
   	
   	
   	
	backButton.addEventListener("click", function(){			
		
			Ti.App.fireEvent('location.stop',{});

			groove.remove(mapView);
			mapView = null;
			
			Ti.API.info("groove window closed!");	
		
			navGroup.closeWindow(groove);
         
		});

	groove.setLeftNavButton(backButton);
	groove.add(mapView);
	
	
	
		var theLegendButton = Titanium.UI.createButton({
			title: 'Legend',
			borderRadius: 10,
			width:100,
			height:30,
			right: 10,
			bottom: height * .05,
			backgroundColor: '#ffffff'
		});
		
		var theLegendBackgroundView = Ti.UI.createView({
			height: height * .75,
			width: width,
			bottom: height * .1,
			backgroundColor: '#333333',
			opacity: 0.9						
			});
					
		var closeView = Ti.UI.createImageView({
			height: 40,
			width: 40,
			top: 5,
			right: 5,
			image: '/images/buttons/close.png'
		});
		
		var theLegend = Ti.UI.createImageView({
				image: settings.legendPath,
				height: 250,
				width: 300,
				borderColor: '#ffffff',				
				borderRadius: 5
		});
			
		if (Ti.Platform.osname == 'ipad'){
			theLegendButton.width = 200;
			theLegendButton.height = 60;
			theLegend.height = 500;
			theLegend.width = 600;
			theLegendBackgroundView.height = height * .84;
			theLegendBackgroundView.width = width;
		}
					
		theLegendBackgroundView.add(theLegend);
		theLegendBackgroundView.add(closeView);
					

	
	theLegendButton.addEventListener('click', function(e){
			Titanium.API.info('Legend Button was Clicked!');
			groove.add(theLegendBackgroundView);				
			closeView.addEventListener('click', function()
				{
					groove.remove(theLegendBackgroundView);
				});			
		});		
	mapView.add(theLegendButton);
	
	
			var rowSQL = settings.theSQL;
			Ti.API.info(rowSQL);
			var allBikeFields = [];
			var db = Ti.Database.open('nashville1.5'); 
			var rec = db.execute(rowSQL);
			var fieldCount = rec.fieldCount;
			for (var x=0; x< fieldCount; x++){
		
						theFieldName = rec.fieldName(x);
							allBikeFields[x] = rec.fieldName(x);
					}
			
		   var n = 0;
		   var theDataRows = [];
			while (rec.isValidRow()) {
					var grooveActivities = [];
					
		            theDataRows[n] = {};
					//Add all the fields from the select statement to the table, AND
					//check for values = 1 to store fieldname for groove ammenities icon lookup (icons have the same name as the ammentiy fields in the database)
					var allFieldsLength = allBikeFields.length;
					Ti.API.info("allFieldsLength" + allFieldsLength);
					for (var x =0; x<allFieldsLength; x++){
							var theFieldName = allBikeFields[x];
							if(theFieldName!='rowid'){
								var theValue = rec.fieldByName(theFieldName);
								theDataRows[n][theFieldName] = theValue;
						
							}				
		
		
						}
					
					n++;
					rec.next();
					
					
			}
			rec.close();
			db.close();
			
		
		
	/*	//remove any existing UI from previous clicks
		if (typeof toolbarParkInfo !== 'undefined') {
			   
				groove.remove(toolbarParkInfo);
				groove.remove(informationContainer);
				groove.remove(addressContainer);
				groove.remove(shareContainer);
			}*/
		

		
	
				

		 
	    var mRow = theDataRows[0]; //primary key 
		var theFeatureType = settings.featureType;
		
	
		
				
			toolbarParkInfo = Ti.UI.createView({
				width: width,
				height: height*.1,
				backgroundColor: '#CBCCCC',
				borderColor:'#A9ABB3',
				borderWidth: 2,
				bottom:0
				});
			
				
			var information = Ti.UI.createButton({
				title: 'Information',
				font:{fontSize:15,fontFamily:'Helvetica-Bold' },
				color: '#666666',
				height: height * .1,
				width: width /2,
				left: 0,
				bottom:0,
				backgroundImage: '/images/detail/button.png'
			});
			
			
			
			var share = Ti.UI.createButton({
				right: 0,
				color: '#666666',
				height: height * .1,
				width: width /2,
				bottom:0,
				backgroundImage: '/images/detail/button.png'
			});
			
			var fb_image = Ti.UI.createImageView({
				backgroundImage: '/images/buttons/fb.png',
				height: 40,
				width: 40
			});
			
			share.add(fb_image);
			
			var horizontalLine2 = Ti.UI.createView({
				right: width /2,
				width: 3,
				height: height * .1,
				backgroundColor: '#A9ABB3',
				bottom: 0
			});
			
			
			if (Ti.Platform.osname == 'ipad'){
				information.font = {fontSize:30,fontFamily:'Helvetica-Bold' };
				fb_image.height = 80;
				fb_image.width = 80;
			}
			
			toolbarParkInfo.add(information, share, horizontalLine2);
			
			
			
			//////CREATE INFORMATION POPUP
			var infoMenu = Ti.UI.createView ({
				width: width,
				height: height * .7,
				opacity: .9,
				backgroundColor: '#333333' 
			});
			
			informationContainer = Ti.UI.createView({
				width: width,
				height: height * .7,
				bottom: height * -.7,
				_down:true,
				backgroundColor: 'transparent'
			});
			
			informationContainer.add(infoMenu);
			
		
			
			var infoHeader = Ti.UI.createView({
				width: width,
				height: height * .07,
				top: 0,
				opacity:.9,
				backgroundColor: '#999999'
			});
			
			var infoHeaderLabel = Ti.UI.createLabel({
				text: 'Information',
				font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				color: '#ffffff',
				zIndex:1
			});
			
			infoHeader.add(infoHeaderLabel);
			infoMenu.add(infoHeader);
			
			var thePhotoLink = '';
			if(settings.photoField != null){
				thePhotoLink = mRow[settings.photoField];
				//alert(thePhotoLink);
			}
			else if(settings.defaultPhotoLink != null){
				thePhotoLink = settings.defaultPhotoLink;
			}
			Ti.API.info(thePhotoLink);
			if(thePhotoLink != '') {
				var photo = Ti.UI.createImageView({
					image: thePhotoLink,
						width: width * .47,
					height: width * .47,
					top: height * .11,
					borderWidth: 1,
					borderColor: '#000',
					left:10,
					backgroundColor: '#000'
				});
				
				informationContainer.add(photo);			
			}
		
		var tableview_contactHours = Titanium.UI.createTableView({
        		//data:data,
        		top: height * .11,
       		 	width: width * .48,
       		 	height: height * .25,
       		 	left: width * .52,
        		backgroundColor:'transparent',
        		separatorColor:'transparent'
       			 });
       			 
		var ch_rows = [];
		var hoursrow = Titanium.UI.createTableViewRow();
		var hourslabelrow = Titanium.UI.createTableViewRow();
		var emailrow = 	Titanium.UI.createTableViewRow();
		var phonerow = Titanium.UI.createTableViewRow();
		var contactlabelrow = 	Titanium.UI.createTableViewRow();
        theHoursOpenString = "";
        daysString = mRow[settings.openField];
        hoursString = mRow[settings.hoursField];
        
        			
		if(daysString != null){
			theHoursOpenString = daysString;
		}
		
		
		if (hoursString != null){
			theHoursOpenString = theHoursOpenString + ", " + hoursString; 
		}	
		 	
		
		if(theHoursOpenString != '') {	
			var hours = Ti.UI.createLabel({
				text: 'Open: ' ,
				font:{fontSize:14,fontFamily:'Helvetica-Bold' },
				//top: 50,
				left: 5,
				color: '#ffffff'
			});
			
			var daysData = Ti.UI.createLabel({
				text: theHoursOpenString,
				font:{fontSize: 12, fontFamily:'Helvetica-Regular'},
				left: 6,//top: 50, 
				//width: 140, 
				//left: 220,
				color: '#ffffff'
			});
			
			//informationContainer.add(hours, daysData);
			hourslabelrow.add(hours);
			ch_rows.push(hourslabelrow);
			hoursrow.add(daysData);
			ch_rows.push(hoursrow);			
		}	

			
			var contact = Ti.UI.createLabel({
				text: 'Contact: ' ,
				font:{fontSize:14,fontFamily:'Helvetica-Bold' },
				//top: 110,
				top: 8,
				left: 5,
				color: '#ffffff'
			});
			
			//var contactString = '' + mRow[settings.phoneField]  + mRow[settings.emailField];
		   
		   if( (mRow[settings.phoneField] != null) || (mRow[settings.emailField] != null)){
			contactlabelrow.add(contact);
			ch_rows.push(contactlabelrow);
		  }	
			var phoneNumber = mRow[settings.phoneField];
			if(phoneNumber !== null){
				//var phoneNumber = e.rowData[settings.phoneField];
			    //contactString = contactString + phoneNumber;
				var phoneData = Ti.UI.createLabel({
					text:mRow[settings.phoneField],
					font:{fontSize: 12, fontFamily:'Helvetica-Regular'},
					//top: 110, 
					//width: 140, 
					left: 6,
					color: '#58ACFA'
				});
			    
			    if (Ti.Platform.osname != 'ipad'){
			    phoneData.addEventListener('click', function(){
					  var alertDialog = Titanium.UI.createAlertDialog({
			                title: phoneNumber,
			                message: 'Dial this number?',
			                buttonNames: ['OK','Cancel']
			                });
			            alertDialog.addEventListener('click',function(e){
			             phoneNumberParsed = phoneNumber.replace(/[^0-9]/g, '');
			             //ActiveTi.API.info(phoneNumberParsed);
			             if (e.index==0) {
			               Ti.Platform.openURL('tel:' +phoneNumberParsed);   
			             }
            			});
            		alertDialog.show();    
				});}
			    
			    phonerow.add(phoneData);
			    ch_rows.push(phonerow);
				//informationContainer.add(phoneData);
			}
			
			if(mRow[settings.emailField] != null){
				
				var emailData = Ti.UI.createLabel({
					text:mRow[settings.emailField],
					font:{fontSize: 12, fontFamily:'Helvetica-Regular'},
					left: 6,
					//top: 125, 
					//width: 140, 
					//left: 170,
					color: '#58ACFA'
				});
			  
			  
			  
			  	emailData.addEventListener('click', function(){
			  		var theSubjectString = "Inquiry Regarding " + mRow[settings.theHeaderField];
			  		var emailDialog = Titanium.UI.createEmailDialog();
					emailDialog.subject = theSubjectString;
					emailDialog.toRecipients = [mRow[settings.emailField]];
					emailDialog.messageBody = "";
					emailDialog.open();
			  	
				});
				
				emailrow.add(emailData);
				ch_rows.push(emailrow);
			 }

		  
		tableview_contactHours.setData(ch_rows); 
		informationContainer.add(tableview_contactHours);
		
		if(mRow[settings.webField] != null){
			var moreInfo = Ti.UI.createButton({
				top: height * .34,
				backgroundImage:'/images/detail/moreinfo.png',
				width: 100,
				height: 33,
				right: width * .09
			});
			
			if (Ti.Platform.osname == 'ipad'){
			moreInfo.top = height * .11;
			moreInfo.right = width * .03;
			moreInfo.top = height * .05;
			}
			
			moreInfo.addEventListener('click', function(){
					Titanium.Platform.openURL(mRow[settings.webField]);
				});
			informationContainer.add(moreInfo);
		}		
					
			var tableview_info = Titanium.UI.createTableView({
        		//data:data,
        		top: height * .41,
       		 	width: width * .97,
       		 	height: height *.31,
        		backgroundColor:'transparent',
        		separatorColor:'transparent'
       			 });
	
			informationContainer.add(tableview_info);
			
			//*********************************************
			//Build the ammenities icon display
			var row1 = Ti.UI.createTableViewRow();
				row1.backgroundColor = 'transparent';
				row1.height = 'auto';

			
	
			var row2 = Ti.UI.createTableViewRow();
				row2.backgroundColor = 'transparent';
				row2.height = 'auto';	
				//row2.width = '320';	
					
			var overviewLabel = Titanium.UI.createLabel({
				text:'Overview',
				color:'#ffffff',
				font:{fontSize:14,fontFamily:'Helvetica-Bold' },
				top:'5',
				left:10,
				});
			
			
			var theTypeText = "";
			var theSummaryText = "";
			var theDescriptionText = "";
			
			if(mRow[settings.typeField] != null) {theTypeText = "Type: " + mRow[settings.typeField] + "\n";}
			if(mRow[settings.summaryField] != null){theSummaryText = "Summary: " + mRow[settings.summaryField];}
			if(mRow[settings.descriptionField] !=null){theDescriptionText = mRow[settings.descriptionField]+ "\n\n";}
			 var overviewText = theTypeText + theDescriptionText+ theSummaryText;
			
			if (overviewText != ""){	
				var overviewData = Ti.UI.createLabel({
					text: overviewText,
					color:'#ffffff',
					font:{fontSize:12,fontFamily:'Helvetica' },
					top:25,
					left:10,
					height:'auto'
					});
	
				row2.add(overviewLabel, overviewData);
				tableview_info.appendRow(row2);
			}
			
			if (Ti.Platform.osname == 'ipad'){
			infoMenu.height = height *.4;
			informationContainer.height = height * .4;
			infoHeader.height = height * .035;
			photo.width = width * .38;
			photo.height = width * .38;
			photo.top = height * .07;
			tableview_contactHours.left = width * .4;
			tableview_contactHours.width = width * .4;
			tableview_contactHours.top = height * .05;
			tableview_info.top = height * .18;
			tableview_info.left = width * .4;
			tableview_info.width = width * .58;
			}
			
			information.addEventListener('click', function(e){
    		if (informationContainer._down !== true) {
   			 	informationContainer.animate({bottom:height * -.7,duration:500});
        		informationContainer._down = true;
        		information.backgroundColor = null;
   			 	
  			  } else {
      			        		
        		       		
        		//hide the share container
        		shareContainer.setBottom(height * -.65);
        		shareContainer._down = true;
        		share.backgroundColor = null;
      			
      			
        		informationContainer.animate({bottom: height * .1,duration:500});
       			informationContainer._down = false;
       			information.backgroundColor = '#fff';
   			 }
				});	
		
			
			var CreateShareContainer = require('/windows/gc_share_view'); 
			shareContainer = new CreateShareContainer();
			groove.add(shareContainer);

			share.addEventListener('click', function(e){
    		
   			 if (shareContainer._down !== true) {
   			 	shareContainer.animate({bottom:height * -.65,duration:500});
        		shareContainer._down = true;
        		share.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
      			      			//hide the information container
        		informationContainer.setBottom(height * -.7);
        		informationContainer._down = true;
        		information.backgroundColor = null;
        		
        		      			
      			
        		shareContainer.animate({bottom: height * .1,duration:500});
       			shareContainer._down = false;
       			share.backgroundColor = '#ffffff';
   			 }
				});	
		
		
		
		
			/*
			
			
			
			var shareMenu = Ti.UI.createView ({
				width: 320,
				height: 365,
				//bottom:-338,
				opacity: .9,
				//_down:true,
				backgroundColor: '#333333' 
				//animate: true
			});
			
			shareContainer = Ti.UI.createView({
				width: 320,
				height: 365,
				bottom: -365,
				_down:true,
				backgroundColor: 'transparent'
			});
			
			
			
			var shareHeader = Ti.UI.createView({
				width: 320,
				height: 32,
				top: 0,
				opacity:.9,
				backgroundColor: '#999999'
			});
			
			var shareHeaderLabel = Ti.UI.createLabel({
				text: 'Facebook',
				font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				color: '#ffffff',
				zIndex:1
			});
			
			
			shareContainer.add(shareMenu);
			shareMenu.add(shareHeader);
			shareHeader.add(shareHeaderLabel);
			
			var selectedImage = null;
			
			var imageThumbnail = Ti.UI.createImageView({
				width: 100,
				height: 120,
				left: 20,
				top: 148,
				backgroundColor: '#000',
				borderSize: 10,
				borderColor: '#fff'
			});
			
			var buttonSelectImage = Ti.UI.createButton({
				backgroundImage: '/images/buttons/selectPhoto.png',
				width: 139, 
				height: 33, 
				top: 197,
				left: 140,
				
			});
			
			var takePicture = Ti.UI.createButton({
				backgroundImage: '/images/buttons/camera.png',
				width: 52, 
				height: 26, 
				top: 273,
				left: 44
			});
			
			selectedImage = null;
			
			
			var statusTxt = Ti.UI.createTextArea ({
				width: 280,
				height: 45, 
				left: 20, 
				top: 40,
				borderRadius: 5,
				value: 'Facebook Status...',
				font: {fontSize: 12, fontFamily:'Helvetica-Regular'},
				borderStyle: 2,
				backgroundColor: '#fff'
			});
			
			statusTxt._hintText = statusTxt.value;
			
			statusTxt.addEventListener ('focus', function(e){
				if(e.source.value == e.source._hintText){
					e.source.value = " ";
				}
			});
			
			statusTxt.addEventListener('blur', function(e){
				if(e.source.value==" "){
					e.source.value = e.source._hintText;
				}
			});
			
			var txtMessage = Ti.UI.createTextArea({
				width: 160,
				height: 40,
				left: 140, 
				top: 148,
				borderRadius: 5,
				value: 'Photo Caption...',
				font: {fontSize: 12, fontFamily:'Helvetica-Regular'},
				borderStyle: 2,
				backgroundColor: '#fff',
				
			});
			
			txtMessage._hintText = txtMessage.value;
			
			txtMessage.addEventListener ('focus', function(e){
				if(e.source.value == e.source._hintText){
					e.source.value = " ";
				}
			});
			
			txtMessage.addEventListener('blur', function(e){
				if(e.source.value==" "){
					e.source.value = e.source._hintText;
				}
			});
			
			var photoshare = Ti.UI.createButton({
				top:235,
				left: 140,
				backgroundImage:'/images/buttons/fbPhoto.png',
				width: 139,
				height: 33
				//right: 10
			});
			
			var status = Ti.UI.createButton({
				top:90,
				//left: 139,
				backgroundImage:'/images/buttons/fbStatus.png',
				width: 165,
				height: 33
				//right: 10
			});
			
			
			
			
			
		buttonSelectImage.addEventListener('click', function(e) {
				Ti.Media.openPhotoGallery({
					success: function (event)
					{
						selectedImage = event.media;
						Ti.API.debug ('Our type was: ' +event.mediaType);
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
						{
							imageThumbnail.image = selectedImage;
						}
					},
						cancel:function ()
						{
							
						}
				});
			});
		
			takePicture.addEventListener('click', function(e) {
				Titanium.Media.showCamera({
            success:function(event)
            {
                var image = event.media; 
				
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
				{
					// set image view
                    var imgView = Titanium.UI.createImageView({
                       top: 0,
                       left: 0,
                       width: 286,
                       height: 335,
                       image: image
                    });
                    
                    scrollingView.addView(imgView);			
                }
             },
            cancel:function()
            {
                //getting image from camera was cancelled
            },
            error:function(error)
            {
                // create alert
                var a = Titanium.UI.createAlertDialog({title:'Camera'});
 
                // set message
                if (error.code == Titanium.Media.NO_CAMERA)
                {
                    a.setMessage('Device does not have image recording capabilities');
                }
                else
                {
                    a.setMessage('Unexpected error: ' + error.code);
                }
 
                // show alert
                a.show();
            },
            allowImageEditing:true,
            saveToPhotoGallery:true
				});
			});
	
	function postStatusToFacebook() {   
	//if the user is not logged in, do so, else post to wall 
	if(Titanium.Facebook.loggedIn == false) {
		Titanium.Facebook.appid = '446493515394207';
		Titanium.Facebook.permissions = ['publish_stream'];
		
		// Permissions your app needs
		Titanium.Facebook.addEventListener('login', function(e) {
			if(e.success) {
				alert('You are now logged in!');
			} else if(e.error) {
				alert('Error: ' + e.error);
			} else if(e.cancelled) {
				alert('You cancelled the login');
			}
		});
		
		//call the facebook authorize method to login
		Titanium.Facebook.authorize();
	} 
	else {
		
		text = statusTxt.value
		// Now post the photo after you've confirmed that we have an access token
		var data = {
			message : text,
			
		};
		
		Titanium.Facebook.requestWithGraphPath('me/feed', data, "POST", function(e) {
			 if (e.success) {
				 alert( "Success! Your status has been updated.");
				 Ti.API.info("Success! The status you posted has the new ID: " + e.result);				    	
			 } 
			 else {
				 alert('Your status could not be posted to Facebook at this time. Try again later.');
				 Ti.API.error(e.error);
			 }
		});
	} //end if else loggedIn
}
		
				
	function postImageToFacebook() {   
	//if the user is not logged in, do so, else post to wall 
	if(Titanium.Facebook.loggedIn == false) {
		Titanium.Facebook.appid = '446493515394207';
		Titanium.Facebook.permissions = ['publish_stream'];
		
		// Permissions your app needs
		Titanium.Facebook.addEventListener('login', function(e) {
			if(e.success) {
				alert('You are now logged in!');
			} else if(e.error) {
				alert('Error: ' + e.error);
			} else if(e.cancelled) {
				alert('You cancelled the login');
			}
		});
		
		//call the facebook authorize method to login
		Titanium.Facebook.authorize();
	} 
	else {
		
		text = txtMessage.value
		// Now post the photo after you've confirmed that we have an access token
		var data = {
			caption : text,
			picture : selectedImage
		};
		
		Titanium.Facebook.requestWithGraphPath('me/photos', data, "POST", function(e) {
			 if (e.success) {
				 alert( "Success! Your image has been posted to your Facebook wall.");
				 Ti.API.info("Success! The image you posted has the new ID: " + e.result);				    	
			 } 
			 else {
				 alert('Your image could not be posted to Facebook at this time. Try again later.');
				 Ti.API.error(e.error);
			 }
		});
	} //end if else loggedIn
}
			
			
			
	photoshare.addEventListener('click', function(e) {
		if(selectedImage != null) {
   			 postImageToFacebook();
 		} else {
   			postImageToFacebook();
			 }
		});
		
	status.addEventListener('click', function(e) {
		if(selectedImage != null) {
   			 postStatusToFacebook();
 		} else {
   			postStatusToFacebook();
			 }
		});
			
			shareContainer.add(shareMenu, imageThumbnail, buttonSelectImage, takePicture, statusTxt, txtMessage, photoshare, status);			
			share.addEventListener('click', function(e){
    		
   			 if (shareContainer._down !== true) {
   			 	shareContainer.animate({bottom:-365,duration:500});
        		shareContainer._down = true;
        		share.backgroundColor = null;
   			 	
  			  } else {
      			//alert('stuff');
      			      			//hide the information container
        		informationContainer.setBottom(-338);
        		informationContainer._down = true;
        		information.backgroundColor = null;
        		
        		       		
        		     			
      			
        		shareContainer.animate({bottom:50,duration:500});
       			shareContainer._down = false;
       			share.backgroundColor = '#ffffff';
   			 }
				});	
			*/
		
				
			groove.add(toolbarParkInfo);
			//groove.title = mRow[settings.theHeaderField];
			groove.add(informationContainer);
			
			mapView.show();
			
			
			

	
	
		

	

		

			
    return groove;
}  //end create grooveWind

module.exports = grW;
