(function () {
    Nash.ui.createWasteInfoWindow= function (settings) {
       
		//showIndicator();
        var wasteinfo = Titanium.UI.createWindow({
            id: 'waste info',
            title: 'Additional Recycling and Waste Information',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#168844',
            width: '100%',
            height: '100%',
            fullscreen: false
        });
        

        
        
        if (!Nash.isAndroid()) {
                var leftButton = Ti.UI.createButton({
                    backgroundImage: 'images/buttons/back_main.png',
                    width: 58,
            		height: 20
                });
                leftButton.addEventListener('click', function () {
                    Nash.navGroup.close(wasteinfo, {
                        animated: true
                    });
                });
                wasteinfo.leftNavButton = leftButton;
            }
        /*{title:'Bike Share Program',backgroundImage:'/images/backgrounds/tableBack.png',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				selectedBackgroundImage:'/images/tableview/on_2.png', leftImage: '/images/tableviews/borrow.png', hasChild: true}*/
       
      wasteinfo.orientationModes = [Ti.UI.PORTRAIT];

                return wasteinfo;
        
    };

})();