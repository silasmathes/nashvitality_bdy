
function moreInfo(navGroup, windowTitle, logo,html,url) {


		self = Ti.UI.createWindow({
			id: windowTitle,
			title: windowTitle,
			backgroundColor: '#ffffff',
			barColor: '#168844',
			width: '100%',
			height: '100%',
			fullscreen: false,
			translucent: false,
			statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK,
			orientationModes: [Ti.UI.PORTRAIT]
			});
		
		var logo = Ti.UI.createImageView({
			image:logo,
			width: width,
			top: 2,
			height: height * .3
		});
		
		var webView = Ti.UI.createWebView({
        	top: height * .3,
        	width: width,
        	bottom: height * .08,
        	url: html,
        	backgroundColor:'transparent'
        });

		if (Ti.Platform.osname == 'ipad') {
			webView.width = 768;
			webView.height = 914;
		}
			
       
	    var moreInfo = Ti.UI.createButton({
			backgroundColor: '#F27536',
			title: '',
			backgroundImage:'',
			width: width * .35,
			height: width * .10,
			borderRadius: 5,
			borderColor: '#EF5F22',
			borderWidth: 1,
			bottom: 5
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
			//textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: 5,
			font:{fontSize:'15sp', fontFamily:'HelveticaNeue-Bold'},
		});
		
		infoView.add(infoLabel, moreIcon);
		moreInfo.add(infoView);
        
        if (Ti.Platform.osname == 'ipad'){
			//moreInfo.right = width * .03;
			moreInfo.height = width * .05;
			moreInfo.width = width * .175;
			infoView.width = moreInfo.width;
			infoView.height = moreInfo.height;
			moreIcon.width = moreInfo.height;
			moreIcon.height = moreInfo.height *.818;
			infoLabel.font = {fontSize:'20sp', fontFamily:'HelveticaNeue-Bold'};
			}
        
        moreInfo.addEventListener('click', function(e){
			Ti.App.fireEvent('openURL', {url:url});
		});		
		
		self.add(webView, moreInfo, logo);
		
	
		var back = Ti.UI.createButton({
            backgroundImage: 'images/buttons/back_main.png',
            width: 58,
           	height: 20
            });
                
           back.addEventListener('click', function () {
       			navGroup.closeWindow(self);
           });
        
        self.leftNavButton = back;
    
		
		


 return self;
        
}
module.exports = moreInfo;