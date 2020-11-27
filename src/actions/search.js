const urlEncoded = require('express').urlencoded({ extended: true });
const { PassThrough } = require('stream');
const jsonParser = require('express').json();
const formurlencoded = require('form-urlencoded').default;

const transformObject = (searchField, searchKey, object, tokens) => {
    delete object[searchKey]
    if (!tokens) {
        return object;
    }
    let tokenData = {};
    if (!tokens[searchField]) {
        console.log('could not retrieve tokens')
    }
    tokenData[searchKey] = tokens[searchField]
    return { ...object, ...tokenData };
};

module.exports = function (client, params, req, res, next) {
    let contentType = 'application/x-www-form-urlencoded';
    jsonParser(req, res, (err) => {
      
        urlEncoded(req, res, async (err) => {
            if (err) return next(err);
            if (Object.keys(req.body).length === 0) contentType = 'application/json';
            
            async function executePolicy() {
                let tokens;
                const query = `select skyflow_id from ${params.search.tableName} where ${params.search.searchField}='${req.body[params.search.searchKey]}';`
                await client.query(query)
                    .then(async res => {
                        if (res && res.records && res.records.length > 0 && res.records[0].fields) {
                            await client.getRecord(params.search.tableName, res.records[0].fields['skyflow_id'], params.search.dlp)
                                .then(tokenData => {
                                    tokens = tokenData.fields
                                })
                        }
                        else {
                            console.error('no matching records found')
                            tokens = null;
                        }
                    })
                return tokens;
            }
            const tokens = await executePolicy();

            const serializeFn = contentType === 'application/json' ? JSON.stringify : formurlencoded;

            let bodyData = serializeFn(transformObject(params.search.searchField, params.search.searchKey, req.body, tokens));
            req.headers['content-length'] = Buffer.byteLength(bodyData);
            req.headers['content-type'] = contentType;

            req.egContext.requestStream = new PassThrough();
            req.egContext.requestStream.write(bodyData);

            next();
        });
    });
}