/**
 * Update an assets location and last_location_update value when a new location message is received for the device
 * 
 * @param {Object} location_message - A new location object via MQTT
 * 
 */

function updateDeviceLocation(req, resp){
    ClearBlade.init({request:req});
    var message = JSON.parse(req.params.body);
    var deviceUpdateObject = {
        x_pos: message.x_pos,
        y_pos: message.y_pos,
        last_location_update: message.timestamp
    };
    ClearBlade.updateDevice(message.asset_name, deviceUpdateObject, true, function (err, data) {
        if (err) {
            resp.error("failed to update device: " + JSON.stringify(data));
        } else {
            resp.success("Device successfully updated");
        }
    });
}