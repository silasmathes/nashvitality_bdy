/**
 * This file is part of Warner Mobile.
 *
*/
 ///********************IMPORTANT, MAP IS INITIALLY HIDDEN SO THAT IT CAN BE OPENED IN THE BACKGROUND

exports.createMapWindow = (function (url) {
	//Nash.ui.createMapWindow= function (optionalExtent, url) {

      var mapWindow = Titanium.UI.createWindow({
            id: 'mapWindow',            
            backgroundColor: '#FFFFFF',
    		barColor: '#414444',
    		top: 0,
    		width: '320',
    		height: '367',
    		fullscreen: false
            
        });
        mapWindow.orientationModes = [Ti.UI.PORTRAIT];


		var webview;

		mapWindow.addEventListener('open', function() {
			
			if (webview !== undefined) {
				alert("webview already present");
				return;
			}
			
		  webview = Ti.UI.createWebView({
            url: url,
            backgroundColor: '#FFFFFF',
    		barColor: '#414444',
            top: 0,
            width: '320',
            height: '367',
            fullscreen: false
       		 });
			mapWindow.add(webview);
			var actInd;
			var greyView;
			
			webview.addEventListener('beforeload',function(e){
                 actInd = Titanium.UI.createActivityIndicator({
					color: '#000',
  					font: {fontFamily:'Helvetica', fontSize:18},               
               style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,              
                message: "Loading Map",
                height:'auto',
                width:'auto'
                //backgroundColor: '#fff'
                });
                
                greyView = Titanium.UI.createView({
                	height:50,
                	width: 150,
                	backgroundColor: '#ffffff',
                	borderRadius: 10,
                	opacity: 0.9
                });
                
                webview.add(greyView);
               webview.add(actInd);

                greyView.show();
                actInd.show();
               //webview.hide();
            });
            webview.addEventListener('load',function(e){ 
            	actInd.hide();
            	greyView.hide();
            	 
            	  Ti.API.debug("url = "+webview.url);
				Ti.API.debug("event url = "+e.url);
				Ti.App.fireEvent("webmapready", {});
				//Ti.API.debug("fired webmapready event");
				//webview.show();
            });
        
			
			
			
		});
       
        

        
	
			mapWindow.addEventListener('close',function(ce)
			{
					//alert("mapWindow closing");
					Ti.App.fireEvent('location.stop', {});
					//mapWindow.remove(webview);
					//webview = null;					
				
			});
			
	
        return mapWindow;
  
    
  
});