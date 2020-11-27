var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var urlEncoded = require('express').urlencoded({
  extended: true
});

var _require = require('stream'),
    PassThrough = _require.PassThrough;

var jsonParser = require('express').json();

var formurlencoded = require('form-urlencoded').default;

var transformObject = function transformObject(searchField, searchKey, object, tokens) {
  delete object[searchKey];

  if (!tokens) {
    return object;
  }

  var tokenData = {};

  if (!tokens[searchField]) {
    console.log('could not retrieve tokens');
  }

  tokenData[searchKey] = tokens[searchField];
  return _objectSpread(_objectSpread({}, object), tokenData);
};

module.exports = function (client, params, req, res, next) {
  var contentType = 'application/x-www-form-urlencoded';
  jsonParser(req, res, function (err) {
    urlEncoded(req, res, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(err) {
        var executePolicy, _executePolicy, tokens, serializeFn, bodyData;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _executePolicy = function _executePolicy3() {
                  _executePolicy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                    var tokens, query;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            query = "select skyflow_id from ".concat(params.search.tableName, " where ").concat(params.search.searchField, "='").concat(req.body[params.search.searchKey], "';");
                            _context2.next = 3;
                            return client.query(query).then( /*#__PURE__*/function () {
                              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        if (!(res && res.records && res.records.length > 0 && res.records[0].fields)) {
                                          _context.next = 5;
                                          break;
                                        }

                                        _context.next = 3;
                                        return client.getRecord(params.search.tableName, res.records[0].fields['skyflow_id'], params.search.dlp).then(function (tokenData) {
                                          tokens = tokenData.fields;
                                        });

                                      case 3:
                                        _context.next = 7;
                                        break;

                                      case 5:
                                        console.error('no matching records found');
                                        tokens = null;

                                      case 7:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              return function (_x2) {
                                return _ref2.apply(this, arguments);
                              };
                            }());

                          case 3:
                            return _context2.abrupt("return", tokens);

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _executePolicy.apply(this, arguments);
                };

                executePolicy = function _executePolicy2() {
                  return _executePolicy.apply(this, arguments);
                };

                if (!err) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", next(err));

              case 4:
                if (Object.keys(req.body).length === 0) contentType = 'application/json';
                _context3.next = 7;
                return executePolicy();

              case 7:
                tokens = _context3.sent;
                serializeFn = contentType === 'application/json' ? JSON.stringify : formurlencoded;
                bodyData = serializeFn(transformObject(params.search.searchField, params.search.searchKey, req.body, tokens));
                req.headers['content-length'] = Buffer.byteLength(bodyData);
                req.headers['content-type'] = contentType;
                req.egContext.requestStream = new PassThrough();
                req.egContext.requestStream.write(bodyData);
                next();

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};