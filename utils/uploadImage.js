const cloudinary = require('../config/cloudinary');

const uploadImage = (req, res, next) => {
  try {
      // Check if file is uploaded
      if (!req.files || !req.files.image) {
        return next();
      }

      const options = { width: 1000, height: 1000, crop: 'thumb' };

      // Upload image to Cloudinary
      cloudinary.uploader.upload(req.files.image.tempFilePath, options, (error, result) => {
          if (error) {
              console.error('Error uploading image to Cloudinary:', error);
              return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
          }

          // Once the image is uploaded successfully, set the imageURL property in the request body
          req.body.imageUrl = result.secure_url;

          // Call next() to proceed to the next middleware/route handler
          next();
      });
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = uploadImage;

