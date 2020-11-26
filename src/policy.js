const connect = require('skyflow-node').connect
const fs = require('fs');
const store = require('./actions/store');
const search = require('./actions/search');

module.exports = function (params){
    const client = connect(params.records.workspaceUrl, params.records.vaultId, JSON.parse(fs.readFileSync(params.records.serviceAccountFile)))

    return (req, res, next) => {
      
      if (params.records && params.records.tokenize) {
        store(params,req,res,next)
      }
      if (params.records && params.records.search) {
        search(client,params,req,res,next)
        // next();

      }
      else {
        next();
      }


    }
  }