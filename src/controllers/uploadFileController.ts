import { format } from 'util';
import { admin, bucket } from '..';

const downloadImage = async (req, res) => {
  console.log(req.query);
  const fileRef = admin.storage().bucket().file(req.query.url);
  const hash = await fileRef.download();
  res.contentType(fileRef.metadata.contentType);
  res.end(hash[0], 'binary');
};

const uploadImageToStorage = (file, newFileName) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }

    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `https://storage.googleapis.com/${bucket.name}/images/familyGroups/${fileUpload.name}`
      );
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};
export { uploadImageToStorage, downloadImage };
