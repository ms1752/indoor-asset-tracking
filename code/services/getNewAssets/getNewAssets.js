var DEVICE_COLUMNS_TO_RETURN = ["name", "created_date", "last_active_date", "last_location_update", "x_pos", "y_pos", "z_pos"];
var SYSTEM_CONFIG_OPTIONS_TO_FETCH = ["inactivity_time_in_minutes"];

/**
 * Fetch all new assets (devices) that have either asset_type or map_name values as null. Also checks inactivity time for asset, and sets an is_active flag accordingly.
 * 
 */
function getNewAssets(req, resp){
    ClearBlade.init({request: req});
    
    getSystemConfiguration(SYSTEM_CONFIG_OPTIONS_TO_FETCH, function(systemConfig) {
        if (systemConfig) {
            var cbDevices = ClearBlade.Device();
    
            var assetTypeQuery = ClearBlade.Query();
            assetTypeQuery.equalTo("asset_type", null);
            
            var mapNameQuery = ClearBlade.Query();
            mapNameQuery.equalTo("map_name", null);
            
            var finalQuery = assetTypeQuery.or(mapNameQuery);
            finalQuery.columns(DEVICE_COLUMNS_TO_RETURN);
            
            cbDevices.fetch(finalQuery, function(err, data) {
                if (err) {
                    resp.error("Failed to get assets: " + JSON.stringify(data));
                } else {
                    //add an is_active column to the devices based on inactivity_time_in_minute and last_location_update
                    for (var x = 0; x < data.length; x++) {
                        var lastActiveTime = new Date(data[x].last_location_update);
                        var minActiveTime = new Date();
                        minActiveTime.setMinutes(minActiveTime.getMinutes() - systemConfig.inactivity_time_in_minutes);
                        if (minActiveTime > lastActiveTime) {
                            data[x].is_active = false;
                        } else {
                            data[x].is_active = true;
                        }
                    }
                    resp.success(data);
                }
            });
        } else {
            resp.error("Failed to get System Configuration Data.");
        }
    });
}