module.exports = req => ({
    body: req.body,
    environment: {
        accountName: process.env.BLOB_STORAGE_ACCOUNT_NAME,
        accountKey: process.env.STORAGE_ACCOUNT_ACCESS_KEY,
        containerName: process.env.BLOB_STORAGE_CONTAINER_NAME,
        allowedFileExtensions: process.env.ALLOWED_FILE_EXTENSIONS,
        metadata: getRequiredMetadata(process.env.METADATA),
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE),
        sasGetExpires: parseInt(process.env.SAS_GET_EXPIRES),
        sasPostExpires: parseInt(process.env.SAS_POST_EXPIRES),
        needGetURL: process.env.NEED_GET_URL
    }
});


const getRequiredMetadata = args => args.replace(/\s/g, '').split(',');