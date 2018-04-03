/**
 * Update an assets location and last_location_update value when a new location message is received for the device.
 * Also checks if an alert should be sent based on if the asset left or entered a designated section on the map.
 * 
 * @param {Object} location_message - A new location object via MQTT
 * 
 */

function updateDeviceLocation(req, resp){
    ClearBlade.init({request:req});
    var messaging = ClearBlade.Messaging();
    var message = JSON.parse(req.params.body);
    ClearBlade.getDeviceByName(message.asset_name, function (err, data) {
        if (err) {
            resp.error("failed to fetch device: " + JSON.stringify(data));
        } else {
            //now get sections
            var deviceData = data;
            var sectionsQuery = ClearBlade.Query({collectionName: "sections"});
            sectionsQuery.equalTo("map_name", deviceData.map_name);
            sectionsQuery.fetch(function (err, data) {
                if (err) {
                    resp.error("failed to fetch sections: " + JSON.stringify(data));
                } else {
                    //now check all sections to see if there is a new one, or none at all
                    var newSection = "none";
                    for (var x = 0; x < data.DATA.length; x++) {
                        log("about to parse section cords");
                        var sectionCords = JSON.parse(data.DATA[x].coordinates);
                        if (pointInsidePolygon(message.x_pos, message.y_pos, sectionCords)) {
                            newSection = data.DATA[x].section_name;
                            break;
                        }
                    }
                    var alertTopic = "alerts/" + deviceData.map_name + "/" + deviceData.name;
                    //alert as needed based on new section
                    if (newSection === "none" && deviceData.last_seen_location !== "none") {
                        // left last_seen_location alert
                        messaging.publish(alertTopic, "Asset " + deviceData.name + " left section " + deviceData.last_seen_location + ".");
                    } else if (newSection !== "none" && deviceData.last_seen_location === "none") {
                        // entered new section alert
                        messaging.publish(alertTopic, "Asset " + deviceData.name + " entered section " + newSection + ".");
                    } else if (newSection !== "none" && deviceData.last_seen_location !== "none" && newSection !== deviceData.last_seen_location) {
                        // left last_seen_location and entered new section alerts
                        messaging.publish(alertTopic, "Asset " + deviceData.name + " left section " + deviceData.last_seen_location + ".");
                        messaging.publish(alertTopic, "Asset " + deviceData.name + " entered section " + newSection + ".");
                    }
                    //update device with new x/y/timestamp/section
                    var deviceUpdateObject = {
                        x_pos: message.x_pos,
                        y_pos: message.y_pos,
                        last_location_update: message.timestamp,
                        last_seen_location: newSection
                    };
                    ClearBlade.updateDevice(message.asset_name, deviceUpdateObject, true, function (err, data) {
                        if (err) {
                            resp.error("failed to update device: " + JSON.stringify(data));
                        } else {
                            resp.success("Device successfully updated");
                        }
                    });
                }
            });
            
        }
    });
}