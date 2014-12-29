function createInfoContainerView(mRow, settings){
			
			///CREATE INFORMATION POPUP
			
			var infoMenu = Ti.UI.createView ({
				width: width,
				height: height * .7,
				opacity: .9,
				backgroundColor: '#333333' 
			});
			
			var informationContainer = Ti.UI.createView({
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
			//ActiveTi.API.info(thePhotoLink);
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
				backgroundColor: '#F27536',
				title: '',
				backgroundImage:'',
				width: width * .35,
				height: width * .10,
				borderRadius: 5,
				borderColor: '#EF5F22',
				borderWidth: 1,
				top: height *.34,
				right: width * .09
			});
			
			var infoView = Ti.UI.createView({
				backgroundColor: 'transparent',
				width: moreInfo.width,
				height: moreInfo.height
			});
			
			var moreIcon = Ti.UI.createImageView({
				image: '/images/buttons/moreInfoIcon.png',
				height: moreInfo.height *.818,
				width: moreInfo.height,
				right: 3
			});
			
			var infoLabel = Ti.UI.createLabel({
				text: 'More Info',
				color: '#ffffff',
				left: 5,
				font:{fontSize:'15sp', fontFamily:'HelveticaNeue-Bold'},
			});
			
			infoView.add(infoLabel, moreIcon);
			moreInfo.add(infoView);
			
					
			if (Ti.Platform.osname == 'ipad'){
			moreInfo.right = width * .03;
			moreInfo.top = height * .05;
			moreInfo.height = width * .05;
			moreInfo.width = width * .175;
			infoView.width = moreInfo.width;
			infoView.height = moreInfo.height;
			moreIcon.width = moreInfo.height;
			moreIcon.height = moreInfo.height *.818;
			infoLabel.font = {fontSize:'20sp', fontFamily:'HelveticaNeue-Bold'};
			}
			
			moreInfo.addEventListener('click', function(){
					Titanium.Platform.openURL(mRow[settings.webField]);
				});
			informationContainer.add(moreInfo);
		}		
					
			var tableview_info = Titanium.UI.createTableView({
        		top: height * .41,
       		 	width: width * .97,
       		 	height: height *.29,
        		backgroundColor:'transparent',
        		separatorColor:'transparent'
       			 });
	
			informationContainer.add(tableview_info);
			
			//*********************************************
			//Build the ammenities icon display
			var row1 = Ti.UI.createTableViewRow();
				row1.backgroundColor = 'transparent';
				row1.height = 'auto';

			
			var activityCheck = mRow.activities; 
			if(activityCheck.length > 0) {
				var ammenities = Titanium.UI.createLabel({
					text:'Amenities:',
					color:'#fff',
					font:{fontSize:14,fontFamily:'Helvetica-Bold' },
					top:'5',
					left:10,
					});
				
				row1.add(ammenities);
				var parkAmenities = mRow.activities;
				var spacer = 5;
				var topspacer = 23;
				for (var x =0; x<parkAmenities.length; x++){
					
					
					if (x > 0) {
						spacer = spacer + 35;
					}
					
					if (x == 9) {
						topspacer = 48;
						spacer = 5;
					}
					
					
					var photo2 = Ti.UI.createImageView({
					image: '/images/park_icons/'+ parkAmenities[x] + '.png',
					width: 25,
					height: 25,
					top: topspacer,
					borderWidth: 0,
					//borderColor: '#000',
					left: spacer
					//backgroundColor: '#000'
					});
					
					
					row1.add(photo2);
				}
				
				tableview_info.appendRow(row1);
			}
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
		return informationContainer;	

}

module.exports = createInfoContainerView;	
	