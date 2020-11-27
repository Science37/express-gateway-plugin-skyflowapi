#Documentation 

Actions that we can perform with the request payload are

* [Search Records](#search-records)

##Search Records

Search the records in the vault to match with a field in the request payload.

###Params


|  Param   | Description | Default value| Required | Type
:---: | :---: | :---: | :---: | :---|
**searchField**| Column name in the skyflow vault | - | yes | string
**searchKey**| Field name in the request payload | - | yes | string
**dlp** | policy enforcement on how you want to have the data at your service | default dlp level of PDT| no | Enum {TOKEN, PLAIN_TEXT, DEFAULT}
**tableName**|  Table name in skyflow vault | - | yes | string
**vault id**| Vault id of skyflow vault| - | yes | string
**workspaceUrl** | Skyflow workspace URL| - | yes | string
**serviceAccountFile** | Path to service account json file| - | yes | string

###Example

```
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