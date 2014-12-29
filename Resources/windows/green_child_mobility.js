function gcmW (settings, navGroup) {
       
		//showIndicator();
        var mobility = Titanium.UI.createWindow({
            id: 'transit',
            title: 'Transit',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#168844',
            width: '100%',
            height: '100%',
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });
        
        var mta = Ti.UI.createView({
        	backgroundImage: '/images/logos/mta.png',
        	width: 220,
        	height: 135, 
        	top: 5
        });
        
        
        var moreInfo = Ti.UI.createButton({
        	backgroundImage: '/images/detail/moreinfo.png',
        	bottom: 15, 
        	width: 105, 
        	height: 33
        });
        
        var transitInfo = Ti.UI.createWebView({
        	url: '/pages/transit.html',
        	backgroundColor: 'transparent',
        	top: 135,
        	width: '100%',
        	height: '100%',
        	touchEnabled: false
        });
        
        mobility.add(mta, transitInfo, moreInfo);
       
       
       moreInfo.addEventListener('click', function(e){
		Ti.App.fireEvent('openURL', {url:'http://www.nashvillemta.org/'});
		});
		 
        

        
        
        if (Ti.Platform.osname !== 'android') {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                    navGroup.closeWindow(mobility);
                });
                mobility.leftNavButton = leftButton;
            }
        /*{title:'Bike Share Program',backgroundImage:'/images/backgrounds/tableBack.png',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/borrow.png', hasChild: true}*/
       
       mobility.orientationModes = [Ti.UI.PORTRAIT];

                return mobility;
        
 }
 module.exports = gcmW;   
