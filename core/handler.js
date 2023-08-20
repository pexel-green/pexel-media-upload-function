const service = require('./service.js');
const logPrefix = '[function-handler]';
const getBlobArgs = require('./environment.js');

exports.handler = async (req, context) => {
    // context.log(`${logPrefix} request`, JSON.stringify(req, null, 2));
    // context.log(`${logPrefix} context`, JSON.stringify(context, null, 2));
    context.log("AAAAAAAAAAAAAaa")
    const serviceArgs = getBlobArgs(req);
    context.log("BBBBBBBBBBBBBBBBBBBBB")

    context.log(serviceArgs)
    return await service.sasUrl(serviceArgs);
};
