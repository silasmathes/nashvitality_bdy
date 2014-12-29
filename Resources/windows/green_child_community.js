function Community(settings, navGroup) {
        var self = Titanium.UI.createWindow({
            id: 'communityEngagement',
            title: 'Community Engagement',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#168844',
            navBarHidden: false,
            orientationModes: [Ti.UI.PORTRAIT],
            fullscreen: false,
            translucent: false,
            statusBarStyle: Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK
        });

	var data = [];
    
   
        var back = Ti.UI.createButton({
            backgroundImage: 'images/buttons/back_main.png',
            width: 58,
            height: 20
            });
                
         back.addEventListener('click', function () {
                    navGroup.closeWindow(self);
            });
                
         self.leftNavButton = back;        
            


    
    var data = [
	
		{title:'Nashville Energy Works',color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' }, backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Nashville Energy Works', logo: '/images/logos/nashvilleEnergyWorks.png', html:'/pages/energyWorks.html', url: 'http://www.nashvilleenergyworks.org/' },
		
		{title:"Mayor's Workplace Challenge",color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' }, backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Nashville Energy Works', logo: '/images/logos/workplaceChallenge.png', html:'/pages/workplaceChallenge.html', url: 'http://www.mayorsworkplacechallenge.com/'},
	
		{title:'Socket',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' }, backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Socket', logo: '/images/logos/socket.png', html:'/pages/socket.html', url: 'http://socket.nashville.gov/' },

	];
	

		
		
    var tableview = Titanium.UI.createTableView({
        data:data,
        top:0,
        height:'auto',
        width:width,
        rowHeight: 64,
        backgroundColor:'transparent',
        separatorColor:'#fff'
        });
        
        
   
	

        
	self.add(tableview);

	if (Ti.Platform.osname == 'ipad')
	{
		tableview.width = width;
	}
	
	
	
	
	tableview.addEventListener('click', function(e)
{ 		
		var windowTitle = e.rowData.windowTitle;
		var logo = e.rowData.logo;
		var html = e.rowData.html;
		var url = e.rowData.url;
		var moreInfo = require('/windows/moreInfo');

	 if (e.rowData.title == 'Nashville Energy Works') {
	 	navGroup.openWindow(new moreInfo(navGroup, windowTitle,logo,html,url));
		 
	}
	
	else if (e.rowData.title == "Mayor's Workplace Challenge") {
		navGroup.openWindow(new moreInfo(navGroup, windowTitle,logo,html,url));	
		
	}
	
	else if (e.rowData.title == 'Socket') {
		navGroup.openWindow(new moreInfo(navGroup, windowTitle,logo,html,url));		
	}
	
		
});



        return self;
        
    
    };

module.exports = Community;



