height = Ti.Platform.displayCaps.platformHeight,
width = Ti.Platform.displayCaps.platformWidth;

var activityIndicator = Titanium.UI.createWindow({
	backgroundColor:'transparent',
    height:height,
    width:width,
    zIndex: 0
});


var activityIndicatorView = Titanium.UI.createView({
    height:height,
    width: width,
    backgroundImage: '/images/backgrounds/background.png',
        //borderRadius: 10,
        opacity: 0,
        zIndex: 0
    });
 
var fadeInAnimation = Ti.UI.createAnimation({
	opacity:0.8,
	duration:250
});
	
var fadeOutAnimation = Ti.UI.createAnimation({
	opacity:0,
	duration:250
});	
			
var actInd = Titanium.UI.createActivityIndicator({
    style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
    font:{fontSize:18,fontFamily:'Helvetica-Bold'},
	color: '#0C72BA',
	message: "Loading Data and Maps . . . ",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 0
    });
  
actInd.show();
activityIndicatorView.add(actInd);
activityIndicator.add(activityIndicatorView);
    

function hideIndicator() {
  setTimeout(function(){
  	activityIndicatorView.animate(fadeOutAnimation, function(){
  		activityIndicator.close();
  	});
  	
  }, 750);	
}

function showIndicator(e) {
	actInd.message = e.message;
	activityIndicator.open();
	activityIndicatorView.animate(fadeInAnimation);			
}
	    

exports.addActivityIndicator = function() {
	Ti.App.addEventListener('hide_indicator', hideIndicator);
	Ti.App.addEventListener('show_indicator', showIndicator);
	Ti.API.info("ADDED activity indicator app event listeners");
};

exports.removeActivityIndicator = function () {
	Ti.App.removeEventListener('hide_indicator', hideIndicator);
	Ti.App.removeEventListener('show_indicator', showIndicator);
	Ti.API.info("removed activity indicator app event listeners");
};
