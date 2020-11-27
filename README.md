# express-gateway-plugin-skyflow


## Introduction

This plugin for [Express Gateway](https://express-gateway.io) makes it easy to quickly integrate with skyflow vault apis. Plugin  policies when used in express gateway pipelines performs the actions on the request payload to the inbound routes. 

## Installation

Add express-gateway-plugin-skyflowapi to your dependencies

```bash
    "express-gateway-plugin-skyflow-api": "git+ssh://github.com/skyflowtech/express-gateway-plugin-skyflowapi.git"
```

## Quick start

1. Create a vault in skyflow studio and create a service account for the vault. Download the service account credentials.

2. Add the plugin to the system config file
```yml
plugins:
  skyflow-api: {}
```


3. Add the configuration keys to [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

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

##Documentation

You can find the complete documentation in [docs](/Docs.md)