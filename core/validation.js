const { getFileExtension, getMimeType } = require('./mime-type.js');

exports.validateInput = (body, environment) => {


    const filename = validateFilename(body);
    const { allowedFileExtensions } = environment;
    const fileExtension = validateFileExtension(filename, allowedFileExtensions);
    const contentType = validateContentType(fileExtension);

    return {
        fileExtension,
        contentType,
        container_user: body.container
    };
};

const validateFilename = body => {
    if (!body.filename) {
        throw new Error('A filename is required');
    }
    return body.filename;
};

const validateFileExtension = (filename, allowedFileExtensions) => {
    const fileExtension = getFileExtension(filename);
    if (!allowedFileExtensions.includes(fileExtension)) {
        throw new Error('The file type is not allowed');
    }
    return fileExtension;
};

const validateContentType = fileExtension => {
    const contentType = getMimeType(fileExtension);
    if (!contentType) {
        throw new Error('The file type is not allowed');
    }
    return contentType;
};
