# express-gateway-plugin-skyflow

## Introduction

This plugin for [Express Gateway](https://express-gateway.io) makes it easy to quickly integrate with skyflow vault apis. The plugin acts as a interceptor to service end points and performs the actions against the records in the skyflow vault.

## Installation

Simply type from your shell environment:

```bash
eg plugin install express-gateway-plugin-skyflow
```

## Quick start

1. Make sure the plugin is listed in [system.config.yml file](https://www.express-gateway.io/docs/configuration/system.config.yml/).
This is done automatically for you if you used the command above.

2. Add the configuration keys to [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

```yaml
policies:
  - eg-skyflow:
      - action:
          records:
            search: 
              searchField : <field in the skyflow vault> #Ex primary_email
              searchKey : <field in the request body> #key in your request body
              dlp: <dlp filter level you want to query the data.> #Currently accepts Plain_Text,TOKEN
            tableName: customers
            workspaceUrl: <your skyflow workspace url> 
            vaultId: db45e7f329a311eb95d83690e181ca8b
            serviceAccountFile: './credentials.json'
```


