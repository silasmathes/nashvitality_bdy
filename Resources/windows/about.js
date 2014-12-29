function About(navGroup) {
        var self = Titanium.UI.createWindow({
            id: 'about',
            title: 'About',
            backgroundImage: '/images/backgrounds/background.png',
            barColor: '#363F93',
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
	
		{title:'About',color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },
				backgroundImage:'/images/backgrounds/tableBack.png',
				hasChild: true, windowTitle: 'About NashVitality', html:'/pages/about.html'},
		
		{title:'Users Guide',color:'#0C72BA', font: {fontSize:18,fontFamily:'Helvetica-Bold' },
				backgroundImage:'/images/backgrounds/tableBack.png',
				hasChild: true, windowTitle: 'Users Guide', html:'/pages/usersGuide.html'},
	
		{title:'Glossary',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Glossary', html:'/pages/glossary.html'},
	
		{title:'Terms & Conditions',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Terms & Conditions', html:'/pages/privacy.html'},
	
		{title:'Credits',color:'#0C72BA', font:{fontSize:18,fontFamily:'Helvetica-Bold' },
				backgroundImage:'/images/backgrounds/tableBack.png', hasChild: true, windowTitle: 'Credits', html:'/pages/credits.html'},
	
		
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
	var aboutChild = require ('/windows/htmlWindow');
	var windowTitle = e.rowData.windowTitle;
	var html = e.rowData.html;
	var bar = '#363F93';
	navGroup.openWindow(new aboutChild(navGroup, windowTitle, html, bar));
	
});




        return self;
        
    
    };

module.exports = About;



