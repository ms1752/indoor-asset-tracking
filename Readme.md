
# ipm package: indoor-asset-tracking

## Overview

A Generic Indoor Asset Tracking system for viewing asset locations on a ma using x and y positions.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

_Add any setup instructions, such as an API Key_

## API

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

_Describe assets_

### Code Services

### Code Libraries

### Portals

### Collections

### ...

## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
