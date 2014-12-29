(function() {
	var iconHeight = 80;
	var iconWidth = 150;
	var imageSuffix = '';

	if (Nash.isLargeScreen()) {
		iconHeight = 160;
		iconWidth = 295;
		//imageSuffix = '@2x';
	} 
	
	
	
	Nash.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		
		list: [
			{
				image: '/images/buttons/byFoot.png',
				func: Nash.ui.createFootWindow 
				//func: Nash.ui.createAboutWindow,
				//refresh: true,	
			},
			
			{
				image: '/images/buttons/byBike.png',
				func: Nash.ui.createBikeWindow
				//func: createFB
				
			},		
				
			{
				image: '/images/buttons/parksGreenways.png',
				func: Nash.ui.createParksWindow
			},
			
			{
				image: '/images/buttons/water.png',
				func: Nash.ui.createWaterWindow
				//args: {url: 'Nash.ui.createHtmlWindow'
			},
			
			{
				image: '/images/buttons/green.png',
				func: Nash.ui.createGreenWindow 
				//refresh: true
			},
			
			{
				image: '/images/buttons/explore.png',
				func: Nash.ui.createExploreWindow 
				//args: {url: 'Nash.ui.createHtmlWindow'
			},
			
			{
				image: '/images/buttons/news.png',
				func: Nash.ui.createNewsWindow
				//refresh: true
			},

			{
				image: '/images/buttons/about.png',
				func: Nash.ui.createAboutWindow
				//args: {url: 'Nash.ui.createHtmlWindow'
			}		
		]
	};	
})();