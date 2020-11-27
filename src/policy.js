const connect = require('skyflow-node').connect
const fs = require('fs');
const store = require('./actions/store');
const search = require('./actions/search');

module.exports = function (params){
    const client = connect(params.search.workspaceUrl, params.search.vaultId, JSON.parse(fs.readFileSync(params.search.serviceAccountFile)))

    return (req, res, next) => {
      
      if (params.store) {
        store(params,req,res,next)
      }
      if (params.search) {
        search(client,params,req,res,next)
      }
      else {
        next();
      }


    }
  }