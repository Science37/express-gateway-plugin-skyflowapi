var plugin = {
  version: '1.0.0',
  policies: ['skyflow-api'],
  init: function init(pluginContext) {
    pluginContext.registerPolicy({
      name: 'skyflow-api',
      schema: {
        $id: 'http://express-gateway.io/schemas/policies/skyflow-api.json',
        type: 'object',
        definitions: {
          store: {
            type: ['object'],
            properties: {
              tokenize: {
                type: ['string'],
                items: {
                  type: 'string'
                }
              },
              workspaceUrl: {
                title: 'workspace URL',
                description: 'your skyflow workspace URL',
                type: 'string',
                required: ['true']
              },
              vaultId: {
                title: 'vaultId',
                description: 'skyflow vaultId',
                type: 'string',
                required: ['true']
              },
              serviceAccountFile: {
                type: 'string',
                description: 'Service Account credentials json',
                examples: ['./path/to/cert.pem'],
                title: 'service Account credentials',
                required: ['true']
              },
              tableName: {
                type: 'string',
                default: '',
                required: ['true']
              }
            }
          },
          search: {
            type: 'object',
            properties: {
              dlp: {
                type: 'string',
                default: ''
              },
              searchField: {
                type: 'string'
              },
              searchKey: {
                type: 'string',
                default: ''
              },
              fields: {
                type: ['array'],
                items: {
                  type: 'string'
                }
              },
              workspaceUrl: {
                title: 'workspace URL',
                description: 'your skyflow workspace URL',
                type: 'string',
                required: ['true']
              },
              vaultId: {
                title: 'vaultId',
                description: 'skyflow vaultId',
                type: 'string',
                required: ['true']
              },
              serviceAccountFile: {
                type: 'string',
                description: 'Service Account credentials json',
                examples: ['./path/to/cert.pem'],
                title: 'service Account credentials',
                required: ['true']
              },
              tableName: {
                type: 'string',
                default: '',
                required: ['true']
              }
            }
          }
        },
        properties: {
          search: {
            $ref: '#/definitions/search'
          },
          store: {
            $ref: '#/definitions/store'
          }
        },
        anyOf: [{
          required: ['search']
        }]
      },
      policy: require('./policy.js')
    });
  },
  schema: {
    $id: 'http://express-gateway.io/schemas/plugins/skyflow-api.json'
  }
};
module.exports = plugin;