function createAddressContainerView(mRow, settings, latlon){
			
			var lat=mRow[settings.latitudeField];
			var lon=mRow[settings.longitudeField];
			
			//////CREATE ADDRESS POPUP
			var addressMenu = Ti.UI.createView ({
				width: width,
				height: height * .36,
				opacity: .9,
				backgroundColor: '#333333' 
			});
			
			addressContainer = Ti.UI.createView({
				width: width,
				height: height * .36,
				bottom: height * -.36,
				_down:true,
				backgroundColor: 'transparent'
			});
			
			
			
			var addressHeader = Ti.UI.createView({
				width: width,
				height: height * .07,
				top: 0,
				opacity:.9,
				backgroundColor: '999999'
			});
			
			
			
			var addressHeaderLabel = Ti.UI.createLabel({
				text: 'Address',
				font:{fontSize:18,fontFamily:'Helvetica-Bold'},
				color: '#ffffff',
				zIndex:1
			});
			
			addressHeader.add(addressHeaderLabel);
			addressMenu.add(addressHeader);
			addressContainer.add(addressMenu);
			var directionTop = height * .14;
			if (mRow[settings.addressField]) {
				var addressText =mRow[settings.addressField];
		  
		  			if (mRow[settings.cityField]) {
						addressText =addressText + '\n'+ mRow[settings.cityField];
					}
		  
				var addressData = Titanium.UI.createLabel({
					text: addressText,
					color:'#ffffff',
					font:{fontSize:14,fontFamily:'Helvetica-Bold'},
					textAlign: 'center',
					top: height * .11
					});
					
				 addressContainer.add(addressData);
				 directionTop = height * .25;
				 
				 if (Ti.Platform.osname == 'ipad'){
				 	addressData.top = height * 0.05;
				 	directionTop = height * .125;
				 }
		 }
			
			var directions = Ti.UI.createButton({
				top: directionTop,
				backgroundImage:'/images/detail/directions.png',
				width: 140,
				height: 33,
			});
			
			if (Ti.Platform.osname == 'ipad'){
				addressMenu.width = width * .32;
				addressMenu.height = height * .18;
				addressContainer.width = width * .32;
				addressContainer.height = height * .18;
				addressHeader.width = width * .32;
				addressHeader.height = height * .035;
				var directionTop = height * .03;
				
				
			}
			
			directions.addEventListener('click', function(e){
				if (Ti.Platform.version >= '6.0') {
       			Ti.App.fireEvent('openURL', {url:'https://maps.apple.com/maps?daddr='+lat+','+lon+'&saddr=' + latlon.latitude + ',' + latlon.longitude});
    			} 
				else {
       			Ti.App.fireEvent('openURL', {url:'https://maps.google.com/maps?daddr='+lat+','+lon+'&saddr=' + latlon.latitude + ',' + latlon.longitude});
   				 }
			});
			
			
			
			addressContainer.add(directions);
			
			addressHeader.add(addressHeaderLabel);
			



   		return addressContainer;    

		

}

module.exports = createAddressContainerView;	
	