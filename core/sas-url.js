const uuid = require('uuid');
const { permissions } = require('./blobPermissions');

/**
 * Generates a SAS PUT URL or SAS GET URL.
 *
 * The URL can be used to upload a file to an azure blob container.
 * The URL contains temporary credentials embedded as part of the URL.
 *
 * See also:
 * https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview
 */
exports.generateSASURL = async (containerClient, blobName, contentType, environment, isGetBlob) => {
    // TODO: how can we find this from the form?
    const securityLevel = 'IKKESENSITIV';
    const owner = 'LIVSFORSIKRING-SKADE';

    const { sasPostExpires, sasGetExpires, metadata } = environment;
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const urlOptions = {
        permissions: isGetBlob ? permissions.Read : permissions.Write,
        expiresOn: isGetBlob ? getExpiryDate(sasGetExpires) : getExpiryDate(sasPostExpires),
        contentType: contentType
    };
    const sasUrl = await blobClient.generateSasUrl(urlOptions);
    const fields = {
        'Content-Type': contentType,
        'x-ms-meta-securitylevel': securityLevel,
        'x-ms-meta-owner': owner
    };
    // for (const name of metadata) {
    //     fields['x-ms-meta-' + name] = '';
    // }

    return isGetBlob ? sasUrl : { url: sasUrl, fields };
};

/**
 * Generates a unique blob name for a file that will be uploaded.
 */
exports.generateUniqueBlobName = fileExtension => {
    const random = uuid.v4();
    return `${random}.${fileExtension}`;
};

const getExpiryDate = expiryTime => new Date(new Date().getTime() + expiryTime * 1000);
