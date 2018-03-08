/**
 * Creates demo location data for each device within the system. Called via a timer in the ClearBlade platform.
 * 
 */

function createDemoData(req, resp){
    ClearBlade.init({request: req});
    
    var messaging = ClearBlade.Messaging();
    
    //get map data (we need to know x-y position limits)
    var mapCollection = ClearBlade.Collection({collectionName: "map_display_config"});
    
    mapCollection.fetch(function (err, data) {
        //make helper object to store x/y limits
        if (err) {
            resp.error("failed to fetch map collection");
        } else {
            var mapData = {};
            for (var x = 0; x < data.DATA.length; x++) {
                mapData[data.DATA[x].map_name] = {
                    x: data.DATA[x].map_width,
                    y: data.DATA[x].map_height
                };
            }
            //get all devices
            ClearBlade.getAllDevicesForSystem(function (err, data) {
                if (err) {
                    resp.error("failed to get all devices for system");
                } else {
                    for (var x = 0; x < data.length; x++) {
                        if ((data[x].asset_type && data[x].asset_type !== "") && (data[x].map_name && data[x].map_name !== "")) {
                            var newPositionObj = {
                                x_pos: Math.random() * (mapData[data[x].map_name].x - 0),
                                y_pos: Math.random() * (mapData[data[x].map_name].y - 0),
                                timestamp: new Date().toISOString(),
                                asset_name: data[x].name
                            };
                            messaging.publish("asset/position/" + newPositionObj.asset_name, JSON.stringify(newPositionObj));
                        }
                    }
                    resp.success("done");
                }
            });
        }
    });
    
}