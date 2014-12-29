function createFacebookPhotoStatusView (){
	
	
	
			facebook = require('facebook');
			
			facebook.appid = "446493515394207";
			facebook.permissions = ['publish_stream', 'read_stream'];
			
		
	
	
			
	//returns shareContainer providing facebook functionality for posting status and 
			var shareMenu = Ti.UI.createView ({
				width: width,
				height: height * .65,
				opacity: .9,
				backgroundColor: '#333333' 
			});
			
			shareContainer = Ti.UI.createView({
				width: width,
				height: height * .65,
				bottom: height * -65,
				_down:true,
				backgroundColor: 'transparent'
			});
			
			var shareHeader = Ti.UI.createView({
				width: width,
				height: height * .07,
				top: 0,
				opacity:.9,
				backgroundColor: '#999999'
			});
			
			var shareHeaderLabel = Ti.UI.createLabel({
				text: 'Facebook',
				font:{fontSize:18,fontFamily:'HelveticaNeue-Bold' },
				color: '#ffffff',
				zIndex:1
			});
			
			
			shareContainer.add(shareMenu);
			shareMenu.add(shareHeader);
			shareHeader.add(shareHeaderLabel);
			
			var selectedImage = null;
			
			
			
			
			var status = Ti.UI.createButton({
				/*title: 'Share Your Status',
				color: '#ffffff',
				font: {fontFamily: 'HelveticaNeue-Bold', fontSize: '14sp'},*/
				top: height * .285,
				left: width *.28,
				backgroundImage:'/images/buttons/postStatus.png',
				width: 139,
				height: 33
			});
			
			
			var statusTxt = Ti.UI.createTextArea ({
				width: width * .94,
				height: height * .1, 
				top: height * .17,
				left: width * .03,
				borderRadius: 5,
				value: 'Facebook Status...',
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
			
			var photoshare = Ti.UI.createButton({
				top:height * .49,
				left: width * .28,
				backgroundImage:'/images/buttons/postImage.png',
				width: 139,
				height: 33
				//right: 10
			});
			
			var takePicture = Ti.UI.createButton({
				backgroundImage: '/images/buttons/camera.png',
				width: 70, 
				height: 33, 
				top: height * .39,
				left: width * .72
			});
			
			
			
			var photoMessage = Ti.UI.createTextArea({
				width: width * .63,
				height: height * .1,
				left: width * .02, 
				top: height * .37,
				borderRadius: 5,
				value: 'Photo Caption...',
				borderStyle: 2,
				backgroundColor: '#fff',
				
			});
			
			photoMessage._hintText = photoMessage.value;
			
			photoMessage.addEventListener ('focus', function(e){
				if(e.source.value == e.source._hintText){
					e.source.value = " ";
				}
			});
			
			photoMessage.addEventListener('blur', function(e){
				if(e.source.value==" "){
					e.source.value = e.source._hintText;
				}
			});
			
			var login = facebook.createLoginButton({
				top: height * .08
				});
			
			
			if (Ti.Platform.osname == 'ipad')  
			{  	
				login.top = height * .06;
				shareMenu.height = height * .4;
				shareContainer.height = height * .4;
				shareHeader.height = height * .035;
				statusTxt.top = height * .12;
				statusTxt.height = height *.08;
				statusTxt.width = width * .78;
				statusTxt.left = width * .11;
				status.left = width * .41;
				status.top = height * .22;
				photoMessage.top = height * .28;
				photoMessage.left = width * .11;
				photoMessage.height = height * .08;
				photoMessage.width = width * .39;
				takePicture.top = height * .31;
				takePicture.left = width * .56;
				photoshare.left = width * .71;
				photoshare.top = height * .31;
				login.top = height * .06;
			};
			
			
			
			
			var login = facebook.createLoginButton({
				top: height * .08
				});
				
			function showRequestResult(e) {
			var s = '';
			if (e.success) {
				s = "Status Updated";
				status.backgroundImage = '/images/buttons/postStatus.png';
				photoshare.backgroundImage = '/images/buttons/postImage.png';
				
				
			} else if (e.cancelled) {
			s = "CANCELLED";
			} else {
			s = "FAIL";
			if (e.error) {
				s = "Unknown Uploading Error";
			}
		}
		alert(s);
		}	
			
			login.style = facebook.BUTTON_STYLE_NORMAL;
			shareContainer.add(login);
			shareContainer.add(takePicture);
			shareContainer.add(statusTxt);
			shareContainer.add(photoMessage);
			shareContainer.add(photoshare);
			shareContainer.add(status);
			
			facebook.addEventListener('login', function(e) {
				
			});
			
			facebook.addEventListener('logout', function(e){
				Ti.API.info('logout event');
					
			});
			
			
		
			takePicture.addEventListener('click', function(e) {
				Titanium.Media.showCamera({
            		success:function(event){
                		var image = event.media; 
						if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
						{
							// set image view
		                    	
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
	

	
	photoshare.addEventListener('click', function(e) {
		Titanium.Media.openPhotoGallery({
			success:function(event)
			{	
				text = photoMessage.value;
 				photoshare.backgroundImage = '/images/buttons/uploadingImage.png';
				var data = {picture: event.media, caption: text};
				facebook.requestWithGraphPath('me/photos', data, "POST", showRequestResult);
			},
			cancel:function()
			{
			},
			error:function(error)
			{
			},
			allowEditing:true
		});
		});
		
	status.addEventListener('click', function(e) {
		var text = statusTxt.value;
		if(text === 'Facebook Status...') {
   			 Ti.UI.createAlertDialog({title:'Error', message:'Enter Status Update'}).show();
 		} else {
 			status.backgroundImage = '/images/buttons/postingStatus.png';
   			facebook.requestWithGraphPath('me/feed',{message:text}, "POST", showRequestResult);			 }
		});
			
			
			
	
	return shareContainer;

}

module.exports = createFacebookPhotoStatusView;			