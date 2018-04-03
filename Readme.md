
# ipm package: indoor-asset-tracking

## Overview

A Generic Indoor Asset Tracking system for viewing asset locations on a map using x and y positions. Also includes basic section management, and alerts.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

There is minimal setup required for this IPM package. Out of the box it includes an example map, asset types, and assets that will update their location on the map every 30 seconds.

To integrate this package with your x/y coordinate based location system, you simply need to follow the API structure below for the expected location MQTT messages. The system itself will handle creating the needed devices within the ClearBlade Platform for each asset.

Once new devices are added, you will need to visit the Asset Administration portal to create map configurations and asset types as necessary, as well as to assign these values to new devices.

## API

### Location

Asset Location MQTT Message structure:  

```javascript
{
	"asset_name": "my-asset",  
	"x_pos": 123.1,
	"y_pos": 812.5,
	"timestamp": "2018-02-20T17:04:34Z"
}
```

These messages should be published to invididual topics per asset, the asset name being the last path in the topic:
`asset/location/<asset name>`

### Alerts

If you have defined sections via the Asset Management portal, the system will provide alerts any time an asset enters and/or leaves a section. These alerts are provided via MQTT, and the topic structure is:

`alerts/<map_name>/<asset_name>`

## Functions

<dl>
<dt><a href="#getSystemConfiguration">getSystemConfiguration(configOptionsToGet, callback)</a></dt>
<dd><p>Fetch system wide configuration options from the system_configuration collection. Supports fetching all 
configuration options, as well as only a set of specific options</p>
</dd>
<dt><a href="#createDemoData">createDemoData()</a></dt>
<dd><p>Creates demo location data for each device within the system. Called via a timer in the ClearBlade platform.</p>
</dd>
<dt><a href="#getAssets">getAssets(asset_type)</a></dt>
<dd><p>Fetch all assets (devices) that have both an asset_type and map_name set. Also checks inactivity time for asset, and sets an is_active flag accordingly.</p>
</dd>
<dt><a href="#getNewAssets">getNewAssets()</a></dt>
<dd><p>Fetch all new assets (devices) that have either asset_type or map_name values as null. Also checks inactivity time for asset, and sets an is_active flag accordingly.</p>
</dd>
<dt><a href="#updateDeviceLocation">updateDeviceLocation(location_message)</a></dt>
<dd><p>Update an assets location and last_location_update value when a new location message is received for the device</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#getSystemConfigurationCallback">getSystemConfigurationCallback</a> : <code>function</code></dt>
<dd><p>Callback type for fetching system configuration</p>
</dd>
</dl>

<a name="getSystemConfiguration"></a>

## getSystemConfiguration(configOptionsToGet, callback)
Fetch system wide configuration options from the system_configuration collection. Supports fetching all 
configuration options, as well as only a set of specific options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| configOptionsToGet | <code>Array.&lt;string&gt;</code> | An array of configuration options to fetch from the system_configuration collection. Optional value, omitted all configuration options are returned |
| callback | [<code>getSystemConfigurationCallback</code>](#getSystemConfigurationCallback) | The callback that handles the response containing the requested system configuration values |

<a name="createDemoData"></a>

## createDemoData()
Creates demo location data for each device within the system. Called via a timer in the ClearBlade platform.

**Kind**: global function  
<a name="getAssets"></a>

## getAssets(asset_type)
Fetch all assets (devices) that have both an asset_type and map_name set. Also checks inactivity time for asset, and sets an is_active flag accordingly.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| asset_type | <code>string</code> | An optional asset_type to fetch specifically. If not provided, any device that has a non-null asset_type will be returned |

<a name="getNewAssets"></a>

## getNewAssets()
Fetch all new assets (devices) that have either asset_type or map_name values as null. Also checks inactivity time for asset, and sets an is_active flag accordingly.

**Kind**: global function  
<a name="updateDeviceLocation"></a>

## updateDeviceLocation(location_message)
Update an assets location and last_location_update value when a new location message is received for the device

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| location_message | <code>Object</code> | A new location object via MQTT |

<a name="getSystemConfigurationCallback"></a>

## getSystemConfigurationCallback : <code>function</code>
Callback type for fetching system configuration

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| systemConfiguration | <code>Object</code> | An object containing keys and values of system configuration objects. Will be undefined if there was an error fetching the system configuration. |



## Usage

### Code Services

| Name | Description |
| --- | --- |
| createDemoData | Creates demo data for any devices that already exist within the system. This allows you to get an idea of this systems functionality before integration with y our own x/y location system. It will send new data for all devices every 30 seconds. |
| getAssets | Fetches all assets (devices) that have been initialized within the system (meaning a `map_name` and `asset_type` has been set for the asset). Also will add an `is_active` field based off the last activity time of this asset. |
| getNewAssets | Fetches all uninitialized assets (devices) within the system (meaning either a `map_name` or `asset_type` has not been set for this asset). Also adds an `is_active` field. |
| updateDeviceLocation | Updates an asset with the latest cordinates.  |

### Code Libraries

| Name | Description |
| --- | --- |
| getSystemConfiguration | Helper function to fetch system configuration data stored in the system_configuration collection. |

### Portals

| Name | Description |
| --- | --- |
| Asset Administration | A portal for managing assets, map configurations, asset types, and sections. Allows you to set the map and asset type for new assets. As well as update existing assets configuration. Also able to create, update, and delete map configurations and asset types as needed. Section creation and deleting is also done through this portal, and allows you to draw any polygon based section over top the map, and the system will create alerts when any assets enter or leave any section. |
| Asset Tracking | This portal is for viewing assets on the map, as well as seeing any active assets details. Also contains a list of inactive devices that have not been seen recently. Any sections created for this map will also displayed over top the map.|

### Collections
| Name | Description |
| --- | --- |
| asset_types | Stores all needed data for each asset type, including it's name, display name, and a base64 string of the icon to use for this asset |
| map_display_config | Stores all map display data for each map, including the name, display name, a base64 string of the map itself, and the width and height of the original map. |
| system_configuration | Stores and system level configuration options needed by this package. An example is the time in minutes for a device to be considered inactive. |
| sections | Stores section configuration data, including coordinates for defining the section polygon, fill color to use, and the section name. |


## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
