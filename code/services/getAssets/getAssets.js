var DEVICE_COLUMNS_TO_RETURN = ["name", "asset_type", "map_name", "created_date", "last_active_date", "last_location_update", "x_pos", "y_pos", "z_pos"];
var SYSTEM_CONFIG_OPTIONS_TO_FETCH = ["inactivity_time_in_minutes"];


/**
 * Fetch all assets (devices) that have both an asset_type and map_name set. Also checks inactivity time for asset, and sets an is_active flag accordingly.
 * 
 * @param {string} asset_type - An optional asset_type to fetch specifically. If not provided, any device that has a non-null asset_type will be returned
 * 
 */
function getAssets(req, resp){
    ClearBlade.init({request: req});
    
    getSystemConfiguration(SYSTEM_CONFIG_OPTIONS_TO_FETCH, function (systemConfig) {
        if (systemConfig) {
            var cbDevices = ClearBlade.Device();
            
            var assetTypeQuery = ClearBlade.Query();
            
            assetTypeQuery.columns(DEVICE_COLUMNS_TO_RETURN);
            
            //do not return assets that have no asset_type or map_name set
            assetTypeQuery.notEqualTo("asset_type", null);
            assetTypeQuery.notEqualTo("map_name", null);
            
            if (req.params.asset_type && req.params.asset_type !== "") {
                assetTypeQuery.equalTo("asset_type", req.params.asset_type);
            }
            
            cbDevices.fetch(assetTypeQuery, function(err, data) {
                if (err) {
                    resp.error("Failed to get assets: " + JSON.stringify(data));
                } else {
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