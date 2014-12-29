var Nash = {
	android: {
		menu: {}	
	},
	datetime: {},
    ui: {},
    __isLargeScreen: undefined,
    __isAndroid: undefined,
    navGroup: undefined
};

(function() {
	Nash.extend = function(obj) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < args.length; i++) {
	    	var source = args[i];
	      	for (var prop in source) {
	        	if (source[prop] !== void 0) obj[prop] = source[prop];
	      	}
	    }
	    return obj;
	};
	
	
	Nash.isLargeScreen = function() {
		if (Nash.__isLargeScreen === undefined) {
			Nash.__isLargeScreen = (Ti.Platform.displayCaps.platformWidth >= 600);
		}
		return Nash.__isLargeScreen;
	};	
	
	Nash.isAndroid = function() {
		if (Nash.__isAndroid === undefined) {
			Nash.__isAndroid = (Ti.Platform.osname == 'android');
		}
		return Nash.__isAndroid;
	}
	
	Nash.cleanSpecialChars = function(str) {
  		if (str == null) {
    		return '';
  		}
  		if (typeof str === 'string') {
    		return  str
      			.replace(/&quot;/g,'"')
      			.replace(/\&amp\;/g,"&")
      			.replace(/&lt;/g,"<")
      			.replace(/&gt;/g,">")
      			.replace(/&#039;/g, "'");
  		}
  		return '';
	};
	
	Nash.android.menu = {
		data: [],
		init: function(params) {
			var activity = params.win.activity; 
	        activity.onCreateOptionsMenu = function (e) {
	          	var optionsmenu = e.menu;
	          	for (k = 0; k < params.buttons.length; k++) {
	            	Nash.android.menu.data[k] = optionsmenu.add({
	              		title: params.buttons[k].title
	            	});
	            	Nash.android.menu.data[k].addEventListener("click", params.buttons[k].clickevent);
	          	}
	        };
		}
	};
})();