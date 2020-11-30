# express-gateway-plugin-skyflowapi


## Introduction

The Skyflow plugin for [Express Gateway](https://express-gateway.io) helps you to quickly integrate with Skyflow Vault APIs. You can use the plugin policies within Express Gateway Pipelines to perform the actions on the request payload to the inbound routes. 

## Installation

Add the below dependencies to your package.json file.

```bash
    "express-gateway-plugin-skyflow-api": "git+ssh://github.com/skyflowtech/express-gateway-plugin-skyflowapi.git",
    "skyflow-node": "1.0.1-beta.6"

```

## Example
A sample gateway with Skyflow API policy is available in the examples folder. Create a Vault in Skyflow and replace the parameters listed in the [gateway.config.yml file](/examples/config/gateway.config.yml).Create a service account and replace credentials.json with it.

## Quick start

1. Create a Vault in Skyflow Studio.  

2. Create a Service Account for the vault. Download the Service Account credentials.

3. Add the plugin to the system config file as follows:
```yml
plugins:
  skyflow-api: {}
```


4. Add the configuration keys to the [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

```yaml
policies:
  - skyflow-api:
      - action:
          search: 
            searchField : <field in the skyflow vault> #Ex primary_email
            searchKey : <field in the request body> #key in your request body
            dlp: <dlp filter level you want to query the data.> #Currently accepts Plain_Text,TOKEN
            tableName: customers
            workspaceUrl: <your skyflow workspace url> 
            vaultId: <vault id>
            serviceAccountFile: <path to service account file>
```

## Documentation

You can find the complete documentation in the [Documentation](/Docs.md) page.