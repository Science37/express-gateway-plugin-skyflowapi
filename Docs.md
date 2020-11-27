# Documentation 

You can perform the following actions with the request payload:

* [Search Records](#search-records)

## Search Records

Search the records in the Vault that match with a field in the request payload.

### Params


|  Param   | Description | Default value| Required | Type
:---: | :---: | :---: | :---: | :---|
**searchField**| Column name in the Skyflow Vault | - | yes | string
**searchKey**| Field name in the request payload | - | yes | string
**dlp** | Policy enforcement for data display | The default DLP level of PDT| no | Enum {TOKEN, PLAIN_TEXT, DEFAULT}
**tableName**|  Table name in the Skyflow Vault | - | yes | string
**vault id**| Vault ID of the Skyflow Vault| - | yes | string
**workspaceUrl** | Skyflow Workspace URL| - | yes | string
**serviceAccountFile** | Path to the Service Account JSON file| - | yes | string

### Example

```
  - skyflow-api:
      - action:
          search: 
            searchField : <field in the Skyflow vault> #Ex primary_email
            searchKey : <field in the request body> #key in your request body
            dlp: <dlp filter level you want to query the data.> #Currently accepts Plain_Text,TOKEN
            tableName: customers
            workspaceUrl: <your Skyflow Workspace URL> 
            vaultId: <vault id>
            serviceAccountFile: <path to the service account file>
```