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

var transformObject = function transformObject(transformSpecs, object, skyflowId) {
  transformSpecs.forEach(function (field) {
    delete object[field];
  });
  return _objectSpread(_objectSpread({}, object), {}, {
    skyflowId: skyflowId
  });
};

module.exports = function (params, req, res, next) {
  var contentType = 'application/x-www-form-urlencoded';
  jsonParser(req, res, function (err) {
    if (err) return next(err);
    if (Object.keys(req.body).length !== 0) contentType = 'application/json';
    urlEncoded(req, res, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(err) {
        var fields, executePolicy, _executePolicy, skyflowId, serializeFn, bodyData;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _executePolicy = function _executePolicy3() {
                  _executePolicy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                    var skyflowId;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return client.insertRecords('persons', [{
                              fields: fields
                            }]).then(function (res) {
                              if (res.records) skyflowId = res.records[0].skyflow_id;else skyflowId = "error";
                            });

                          case 2:
                            return _context.abrupt("return", skyflowId);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return _executePolicy.apply(this, arguments);
                };

                executePolicy = function _executePolicy2() {
                  return _executePolicy.apply(this, arguments);
                };

                fields = {};
                params.records.tokenize.forEach(function (field) {
                  fields[field] = req.body[field];
                });
                _context2.next = 6;
                return executePolicy();

              case 6:
                skyflowId = _context2.sent;
                serializeFn = contentType === 'application/json' ? JSON.stringify : formurlencoded;
                bodyData = serializeFn(transformObject(params.records.tokenize, req.body, skyflowId));
                req.headers['content-length'] = Buffer.byteLength(bodyData);
                req.headers['content-type'] = contentType;
                req.egContext.requestStream = new PassThrough();
                req.egContext.requestStream.write(bodyData);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};