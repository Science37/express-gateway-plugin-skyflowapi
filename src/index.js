
const plugin = {
  version: '1.0.0',
  policies: ['skyflow-api'],
  init: function (pluginContext) {
    pluginContext.registerPolicy({
      name: 'skyflow-api',
      schema: {
        $id: 'http://express-gateway.io/schemas/policies/eg-skyflow.json',
        type: 'object',

        workspaceUrl: {
          title: 'workspace URL',
          description: 'your skyflow workspace URL',
          type: 'string',
          required: true
        },
        vaultId: {
          title: 'vaultId',
          description: 'skyflow vaultId',
          type: 'string',
          required: true
        },
        serviceAccountFile: {
          type: 'string',
          description: 'Service Account credentials json',
          examples: ['./path/to/cert.pem'],
          title: 'service Account credentials'
        },
        definitions: {
          records: {
            type: 'object',

            properties: {
              tokenize: {
                type: ['array'],
                items: {
                  type: 'string',

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
                    type: 'string',
                  },
                  searchKey: {
                    type: 'string',
                    default: ''
                  },
                  fields: {
                    type: ['array'],
                    items: {
                      type: 'string',
                    }
                  }
                }
              },
              tableName: {
                type: 'string',
                default: ''
              }

            },
            anyOf: [{ required: ['tokenize'] }, { required: ['search'] }]
          }
        },
        properties: {
          records: { $ref: '#/definitions/records' },
        },

        anyOf: [{ required: ['records'] }]


      },
      policy: require('./policy.js'),
    });
  }
}

module.exports = plugin;
