(function() {

	

	var db = Ti.Database.open('nashville1.1');
	db.remove();
	
	var db = Ti.Database.open('nashville1.2');
	db.remove();
	
	var db = Ti.Database.open('nashville1.3');
	db.remove();
	
	var db = Ti.Database.open('nashville1.4');
	db.remove();
		
	var db = Ti.Database.install('nashville.db', 'nashville1.5');
	db.close;
	db = null;
	
	// open URLs in the native browser, not a webview
	Ti.App.addEventListener('openURL', function(e){
	  	Ti.API.info('openURL event fired');
	  	Ti.Platform.openURL(e.url);
	});
	
	//Create the activity indicator and add an app event listener so that it can be hidden by the webview
	var AI = require('/windows/activity_indicator');
	AI.addActivityIndicator();	

	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	

	
//open initial window
	
	var createMasterWindow = require('/ui/MasterWindow');
	home = new createMasterWindow();

	home.open();
})();


