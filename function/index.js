const { handler } = require("../core/handler");

exports.handler = async (context, req) => {
    try {
        context.res = await handler(req, context)
    } catch (err) {
        context.res = {
            body: err,
            headers: {
                'content-type': "application/json"
            }
        }
    }

};
