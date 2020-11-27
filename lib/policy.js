var connect = require('skyflow-node').connect;

var fs = require('fs');

var store = require('./actions/store');

var search = require('./actions/search');

module.exports = function (params) {
  var client = connect(params.search.workspaceUrl, params.search.vaultId, JSON.parse(fs.readFileSync(params.search.serviceAccountFile)));
  return function (req, res, next) {
    if (params.store) {
      store(params, req, res, next);
    }

    if (params.search) {
      search(client, params, req, res, next);
    } else {
      next();
    }
  };
};