function htmlWindow(navGroup, windowTitle, html, bar) {

		
        var self = Titanium.UI.createWindow({
            id: windowTitle,
            title: windowTitle,
            backgroundImage: '/images/backgrounds/background.png',
            barColor: bar,
            translucent: false,
            width: '100%',
            height: '100%',
            fullscreen: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK,
            orientationModes: [Ti.UI.PORTRAIT]
        });
        

        var webview = Ti.UI.createWebView({
            url: html,
            width: '100%',
            height: '100%'
        });
        self.add(webview);
        
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

module.exports = htmlWindow;
