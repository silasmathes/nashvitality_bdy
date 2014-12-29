function Walk100(navGroup){

        var self = Titanium.UI.createWindow({
            id: 'walk100',
            title: 'Walk 100 Miles',
            backgroundColor: '#ffffff',
            barColor: '#F07534',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK,
            orientationModes: [Ti.UI.PORTRAIT]
        });

            
       var logo = Ti.UI.createImageView({
				image: '/images/logos/walkWithNashville.jpg',
				width: width * .4, 
				height: width * .5355,
				top: height * .02, 
			});     
        
        
        
        var moreInfo = Ti.UI.createButton({
			backgroundColor: '#F27536',
			title: '',
			backgroundImage:'',
			width: width * .40,
			height: width * .10,
			borderRadius: 5,
			borderColor: '#EF5F22',
			borderWidth: 1,
			top: height * .36,
			left: width * .55
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
			right: 6
		});
		
		var infoLabel = Ti.UI.createLabel({
			text: 'More Info',
			color: '#ffffff',
			left: 7,
			font:{fontSize:'15sp', fontFamily:'HelveticaNeue-Bold'},
		});
		
		infoView.add(infoLabel, moreIcon);
		moreInfo.add(infoView);
		
		var walks = Ti.UI.createButton({
			backgroundColor: '#F27536',
			title: 'Scheduled Walks',
			font:{fontSize:'15sp', fontFamily:'HelveticaNeue-Bold'},
			backgroundImage:'',
			width: width * .40,
			height: width * .10,
			borderRadius: 5,
			borderColor: '#EF5F22',
			borderWidth: 1,
			top: height * .36,
			right: width * .55
		});
		
		
        
        if (Ti.Platform.osname == 'ipad'){
		moreInfo.top = height * .41;
		moreInfo.width = width * .2;
		moreInfo.height = height * .05;
		infoLabel.font = {fontSize:'17sp', fontFamily:'HelveticaNeue-Bold'};
		infoView.height = moreInfo.height;
		infoView.width = moreInfo.width;
		moreIcon.height = moreInfo.height *.818;
		moreIcon.width = moreInfo.height;
		walks.top = height * .41;
		walks.width = width *.2;
		walks.height = height * .05;
		walks.font = {fontSize:'17sp', fontFamily:'HelveticaNeue-Bold'};
		}
        
        moreInfo.addEventListener('click', function(e){
		Ti.App.fireEvent('openURL', {url:'http://www.walk100miles.com/'});
		});
        
        
        walks.addEventListener('click', function(e){
        var walksTable = require('/windows/walks');
        navGroup.openWindow(new walksTable(navGroup));
		});
		
		
        self.add(logo, moreInfo, walks);
        
        var webview = Ti.UI.createWebView({
        	top: height * .45,
        	width: width,
        	height: 'auto',
        	url: '/pages/walk100.html',
        	backgroundColor:'transparent'
        });
        
        if (Ti.Platform.osname == 'ipad'){
        	webview.width = width;
        }
        self.add(webview);
        
		var backButton = Ti.UI.createButton({
   			backgroundImage: 'images/buttons/back_main.png',
   			width: 58,
            height: 20
   		});

		self.setLeftNavButton(backButton);
		
		backButton.addEventListener("click", function(){			
         	navGroup.closeWindow(self);
         });
       
      

                return self;
        
    }
module.exports = Walk100;