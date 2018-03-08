var SYSTEM_CONFIG_COLLECTION_NAME = "system_configuration";

/**
 * Callback type for fetching system configuration
 * 
 * @callback getSystemConfigurationCallback
 * @param {Object} systemConfiguration - An object containing keys and values of system configuration objects. Will be undefined if there was an error fetching the system configuration.
 */


/**
 * Fetch system wide configuration options from the system_configuration collection. Supports fetching all 
 * configuration options, as well as only a set of specific options
 * 
 * @param {string[]} configOptionsToGet - An array of configuration options to fetch from the system_configuration collection. Optional value,
 * omitted all configuration options are returned
 * @param {getSystemConfigurationCallback} callback - The callback that handles the response containing the requested system configuration values
 */
function getSystemConfiguration(_configOptionsToGet, callback) {
    
    var configOptionsToGet;
    
    if (callback === undefined) {
        callback = _configOptionsToGet;
        configOptionsToGet = [];
    } else {
        configOptionsToGet = _configOptionsToGet;
    }
    
    var systemConfigCollection = ClearBlade.Collection({collectionName: SYSTEM_CONFIG_COLLECTION_NAME});
    
    systemConfigCollection.fetch(function (err, data) {
        if (err) {
            log("failed to fetch system config collection: " + JSON.stringify(data));
            callback();
        } else {
            var returnData = {};
            for (var x = 0; x < data.DATA.length; x++) {
                if (configOptionsToGet.length === 0 || configOptionsToGet.indexOf(data.DATA[x].config_name) > -1) {
                    returnData[data.DATA[x].config_name] = data.DATA[x].config_value;
                }
            }
            callback(returnData);
        }
    });
}
