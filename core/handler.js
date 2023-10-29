const service = require('./service.js');
const logPrefix = '[function-handler]';
const getBlobArgs = require('./environment.js');

exports.handler = async (req, context) => {
    const serviceArgs = getBlobArgs(req);
    context.log(serviceArgs)
    return await service.sasUrl(serviceArgs);
};
