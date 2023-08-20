/**
 * the following defines the MIME type of various file extensions.
 * it does not define which file extensions are allowed.
 */
const mimeTypeOfFileExtension = {
    bmp: 'image/bmp',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    rtf: 'application/rtf',
    tif: 'image/tif',
    txt: 'text/plain',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

/**
 * Returns the file extension of a filename.
 *
 * @param filename A filename (example: "test.gif")
 * @return String The file extension of the file (example: "gif")
 */
const getFileExtension = filename => {
    const index = filename.lastIndexOf('.');
    if (index < 0) {
        return '';
    }
    return filename.substring(index + 1).toLowerCase();
};

/**
 * Returns the MIME type normally associated with a file extension.
 *
 * @param fileExtension A file extension, such as "gif"
 * @return String The MIME type of the file extension, such as "image/gif". If the file extension is unknown, false is returned.
 */
const getMimeType = fileExtension => {
    const key = fileExtension.toLowerCase();
    if (mimeTypeOfFileExtension.hasOwnProperty(key)) {
        return mimeTypeOfFileExtension[key];
    } else {
        return false;
    }
};

exports.getFileExtension = getFileExtension;
exports.getMimeType = getMimeType;
