const cloudinary = require('../config/cloudinary');

/**
 * Uploads a base64 data URL image to Cloudinary.
 * @param {string} base64Str - The base64 data string (e.g., data:image/png;base64,...)
 * @param {string} folder - Target folder path in Cloudinary
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
const uploadBase64Image = async (base64Str, folder = 'rk_trinity_lifts') => {
  if (!base64Str) return null;
  
  try {
    // If the string doesn't start with data:, assume it's just raw base64 and append type prefix
    let uploadStr = base64Str;
    if (!base64Str.startsWith('data:')) {
      uploadStr = `data:image/png;base64,${base64Str}`;
    }

    const uploadResponse = await cloudinary.uploader.upload(uploadStr, {
      folder: folder,
      resource_type: 'auto'
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failure:', error);
    throw new Error('Failed to upload image to cloud storage: ' + error.message);
  }
};

module.exports = {
  uploadBase64Image
};
