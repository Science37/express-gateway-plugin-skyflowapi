const urlEncoded = require('express').urlencoded({ extended: true });
const { PassThrough } = require('stream');
const jsonParser = require('express').json();
const formurlencoded = require('form-urlencoded').default;


const transformObject = (transformSpecs, object, skyflowId) => {
    transformSpecs.forEach(field => {
        delete object[field]
    })
    return { ...object, skyflowId };
};

module.exports = function (params, req, res, next) {
    let contentType = 'application/x-www-form-urlencoded';
    jsonParser(req, res, (err) => {
        if (err) return next(err);
        if (Object.keys(req.body).length !== 0) contentType = 'application/json';

        urlEncoded(req, res, async (err) => {
             let fields = {}
            params.records.tokenize.forEach(field => {
                fields[field] = req.body[field]
            })
            async function executePolicy() {
                let skyflowId;
                await client.insertRecords('persons', [{ fields }])
                    .then(res => {
                        if (res.records) skyflowId = res.records[0].skyflow_id;
                        else skyflowId = "error";
                    })
                return skyflowId;

            }

            const skyflowId = await executePolicy();
            const serializeFn = contentType === 'application/json' ? JSON.stringify : formurlencoded;

            const bodyData = serializeFn(transformObject(params.records.tokenize, req.body, skyflowId));
            req.headers['content-length'] = Buffer.byteLength(bodyData);
            req.headers['content-type'] = contentType;

            req.egContext.requestStream = new PassThrough();
            req.egContext.requestStream.write(bodyData);

        });
    });
}