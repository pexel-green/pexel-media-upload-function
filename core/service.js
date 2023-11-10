const { validateInput } = require('./validation.js');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { generateUniqueBlobName, generateSASURL } = require('./sas-url.js');

/**
 * A Azure Function that returns a SAS URL,
 * to which the browser can upload a file to an Azure Blob Storage (via PUT).
 *
 * POST /{topVersion}/sasurl/
 *      Body: {filename: "something.gif"}
 *
 * The Function returns a JSON with information about how to upload the file.
 *
 * Explanation of how to upload to the sas signed URL:
 * https://advancedweb.hu/2019/07/02/post_signed_urls/
 */
exports.sasUrl = async (args) => {
    const { body, environment } = args;
    const { fileExtension, contentType, container_user } = validateInput(body, environment);

    const { accountName, accountKey, containerName } = environment;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(getStorageUrl(accountName), sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = generateUniqueBlobName(container_user, fileExtension);
    const putURL = await generateSASURL(containerClient, blobName, contentType, environment, false);
    console.log("putURL", { putURL })

    // generate response JSON
    const response = {
        body: {
            putURL,
            blobName
        },
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (environment.needGetURL === 'TRUE') {
        response.body.getURL = await generateSASURL(containerClient, blobName, contentType, environment, true);
    }
    return response;
};

const getStorageUrl = accountName => `https://${accountName}.blob.core.windows.net`;
