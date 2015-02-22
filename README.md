#**NashVitality iOS Github README File** 
#####**February 18, 2015**

###**Getting Started**

Install Titanium Studio from Appcelerator using the instructions here:
http://docs.appcelerator.com/titanium/3.0/#!/guide/Quick_Start 

Install the following modules using the directions from Appcelerator here:
http://docs.appcelerator.com/titanium/3.0/#!/guide/Using_a_Module

1.  Ti.Styled Label (provides html/css style labeling syntax)
GitHub project:  https://github.com/appcelerator-modules/ti.styledlabel
Direct link to module zip file for installation: https://github.com/appcelerator-modules/ti.styledlabel/releases/download/ios-1.6.1/ti.styledlabel-iphone-1.6.1.zip

2.  benCoding.BasicGeo
GitHub project (forked for 64 bit upgrade): https://github.com/yozef/benCoding.BasicGeo
Direct link to module zip file for installation: https://github.com/yozef/benCoding.BasicGeo/blob/master/IOS/basicGeo/dist/bencoding.basicgeo-iphone-0.89.zip

3.  Titanium Facebook Module, pre-installed.  Activated in modules entry in tiapp.xml setup file.
Documentation: http://docs.appcelerator.com/titanium/3.0/#!/api/Modules.Facebook

As of February 2015, Version 1.5 of the NashVitality App is compatible with iPhones running IOS 7 and 8, and is built using the Titanium 3.4.0.GA SDK and Apple’s XCode 6.

###**Introduction**

The NashVitality Mobile App was initially commissioned by the Nashville/Davidson County Office of the Mayor to provide users with a comprehensive list of outdoor activities and green amenities within Davidson County (http://www.nashville.gov/nashvitality and http://www.nashville.gov/Mayors-Office/Priorities/Health/NashVitality.aspx ).  

The free app’s primary focus is on parks and hiking/biking trails and also includes opportunities for water recreation as well as locations of recycling centers, public art, B-Cycle locations, and information on selected outdoor-related health initiatives, such as the 2014 Walk 100 Miles campaign.  BDY Environmental (http://bdy-inc.com/ ) originally wrote the source code and published the app for iOS and Android using Appcelerator’s Titanium (http://www.appcelerator.com/developers/). 

Testing Write privileges.
The app’s name and some graphic elements arose from an earlier NashVitality initiative sponsored by the Metro Nashville Health Department.  Rob Williams Design created icons, most screen layouts, and marketing materials for the app (http://robwilliamsdesign.com/#/nashvitality-app/).


Data sources include hiking trails and park images from Metro Nashville Parks (http://www.nashville.gov/Parks-and-Recreation.aspx), boundaries and basemaps (http://www.nashville.gov/Planning-Department/Mapping-and-GIS.aspx ) from the Metro Nashville Planning Department, Walk Bike Nashville, and field data collected by BDY Environmental.   

The app was released as an open-source project in January 2015.

###**Dependencies/Tools**

In addition to the Titanium Appcelerator development environment and trails/points data, the app is dependent upon several tools and data sources:

1.  Most mapping data were edited using either ESRI’s ArcView (http://www.esri.com/software/arcgis/arcgis-for-desktop ) or Quantum GIS software (http://www2.qgis.org/en/site/).  QGIS was used to export trail and point data as geoJson (http://geojson.org/).  geoJson files were then imported into sqlite (http://www.sqlite.org/) and joined to existing descriptive data tables through views.  For table editing BDY used a combination of BASE (http://menial.co.uk/base/), Microsoft Excel, and text editors.

2.  To display maps, the app utilizes a webview running local html and the Leaflet Javascript mapping library (http://leafletjs.com/).  The local html also uses jQuery 1.8 (http://jquery.com/) for DOM manipulation and the esri-leaflet library (https://github.com/Esri/esri-leaflet) for displaying basemaps published by ArcGIS Server REST endpoints.

3.  The default basemap is provided by the Metro Nashville Planning ArcGIS Server tiled REST service published in the WGS84 Web Mercator Projection (“Google Maps Projection” EPSG 3857, http://spatialreference.org/ref/sr-org/6864/): http://maps.nashville.gov/MetGIS/rest/services/Basemaps/NashvilleBasemapMuted_MSD_WGS84/MapServer

4.  BDY created an offline tiled basemap for use in parks where cell-service/internet connections are spotty.  The offline basemap was generated using MapBox’s TileMill software (https://github.com/mapbox/tilemill).  MBTiles from Tilemill were converted to folders of tiled .png images suitable for use in Leaflet by running the python mbutil.py script (https://github.com/mapbox/mbutil).  Due to the size of the tiled map, images are limited to zoom level 15, approx. 1:18,000 scale.
BDY generated a second tiled image basemap for The Groove, a cycling map created by Walk/Bike Nashville.

5.  Moment.js (http://momentjs.com/), a javascript library for parsing dates is used for sorting newsfeeds and reformatting dates.

6.  The news and events feeds are consumed from the following Metro Nashville website sources:
http://www.nashville.gov/Feeds/NewsEventFeed.aspx?type=NEWS&catid=516
http://www.nashville.gov/Feeds/NewsEventFeed.aspx?type=EVENTS&catid=516


###**Structure**

`App.js` checks for old versions of the installed app sqlite database (e.g., `nashville1.x`) and deletes each previous database if installed.  `App.js` installs version 1.5 of the app database from the Resources folder into the application folder on the mobile device.   `App.js` then creates the Master Window for the app.

`/ui/MasterWindow.js` checks for internet connectivity and basemap availability, and then creates an ios Navigation Window, or navGroup, to keep track of all subsequent windows.  The MasterWindow displays icons for all of the main functionality of the app.  The icons have click events that generate or open each corresponding window.  For subsequent windows that contain maps, the click events first poll the device’s GPS (`/windows/geolocate.js`) to get a location on which to center the map and calculate distances.  The navGroup object is passed to each subsequent window opened. 

#####Project Folder Descriptions

-`Root`: contains `tiapp.xml` project settings file as well as `Resources` folder

-`/Resources`
Contains all project code folders along with `app.js` main/initial controller file, and the app’s `Nashville.db` sqlite file.


-`/Resources/common`
Contains `globals.js` file, mostly used for facebook id

-`/Resources/cs`
Contains deprecated/or Android files

-`/Resources/images`
Contains application image directories

-`/Resources/iphone`
Contains ios app icons and splash screen

-`/Resources/libs`
Contains moment.js javascript library


-`/Resources/mapping`
Contains all html files and libraries used for leaflet based local webview maps.

-`/Resources/pages`
Contains static html pages and css used for webviews (typically about screens, user guides, and more info pages).

-`/Resources/ui`
Contains the `MasterWindow.js` file used to generate the main selection window and navigation controller for the app.

-`/Resources/utility`
Contains deprecated navigation controller code, and code for checking internet connection and whether Metro Nashville ArcGIS Server REST endpoint is available for the basemap.

-`/Resources/windows`
Storage location for most windows and tools in the app.

From the initial Master Window, additional Windows (other than simple information screens with webviews) are opened with the   following pattern:

>`byFoot.js`  --provides a list of maps/activities by foot via a configuration object with image locations, fonts, sql for queries, and map options.  Calls `Generic_Child.js` or a separate window for information display. 

>>`Generic_Child.js` --parses the selected activity and generates a tableview and map/webview for all locations/trails.  Calls the map webview code found in `/Resources/mapping/map.html`. Also uses `/Resources/windows/gc_address_view.js`, `gc_information_view.js`, and `gc_share_view.js` to display additional information about a trail or location.

>OR
  
>>`byFoot_child_....js`--creates a webview or other informational screen.


