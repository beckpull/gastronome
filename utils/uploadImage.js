const cloudinary = require('../config/cloudinary');

const uploadImage = (req, res, next) => {
  try {
      // Check if file is uploaded
      if (!req.files || !req.files.image) {
        return next();
      }

      // Upload image to Cloudinary
      cloudinary.uploader.upload(req.files.image.tempFilePath, (error, result) => {
          if (error) {
              console.error('Error uploading image to Cloudinary:', error);
              return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
          }

          // Once the image is uploaded successfully, set the imageURL property in the request body
          req.body.imageURL = result.secure_url;

          // Call next() to proceed to the next middleware/route handler
          next();
      });
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = uploadImage;

// Example POST route using this middleware:

// // Import the uploadImage middleware function
// const uploadImage = require('.../../utils/uploadImage');

// // Route to handle recipe creation with image upload
// router.post('/recipes', uploadImage, async (req, res) => {
//     try {
//         // Create a new recipe using the data in the request body
//         const newRecipe = await Recipe.create(req.body);

//         // Send a success response with the created recipe data
//         res.status(201).json(newRecipe);
//     } catch (error) {
//         console.error('Error creating recipe:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Route to handle image upload
// router.post('/upload-image', withAuth, uploadImage, (req, res) => {
//     // Image uploaded successfully, respond with image URL
//     res.json({ imageUrl: req.body.imageURL });
//   });
  
//   // Route to handle recipe creation with image URL
//   router.post('/recipes', async (req, res) => {
//     try {
//       // Create a new recipe using the data in the request body
//       const { recipe_name, imageUrl, ingredients, instructions, has_meat } = req.body;
//       const newRecipe = await Recipe.create({ recipe_name, imageURL, ingredients, instructions, has_meat });
      
//       // Send a success response with the created recipe data
//     //   res.status(201).json(newRecipe);
//       res.redirect('/');
//     } catch (error) {
//       console.error('Error creating recipe:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
// In your frontend UI, design the form in such a way that the user is prompted to upload an image first.
// Handle the image upload using JavaScript on the client side. You can use a file input element to allow the user to select an image file, and then use JavaScript to handle the file selection and upload it to the server.
// Once the image is uploaded to the server, or if the user chooses not to upload an image, you can then display the rest of the form fields for the recipe details.
// After the user fills out the recipe details and submits the form, send the data (including the image URL if an image was uploaded) to your backend route for processing.
// In your backend route for creating a new recipe (/recipes), you can use the uploadImage middleware function to handle the image upload. If an image is uploaded, it will be processed and uploaded to Cloudinary, and the URL of the uploaded image will be attached to the request body. Then, you can proceed to create the new recipe using the recipe details provided in the request body.
// When the user sends a POST request to the /recipes endpoint, the request first goes through the withAuth middleware function will be executed first to ensure that the user is authenticated before proceeding with the request. If the user is authenticated, the control will then be passed to the uploadImage middleware function to handle the image upload process. This function checks if an image file has been uploaded with the request. If an image is found, it proceeds to upload the image to Cloudinary. Once the image is uploaded and imageURL is set in the request body, the control will finally be passed to the route handler function to create the recipe. If no image is found, it will exit the middleware fucntion and proceed like normal.
// Once the image is successfully uploaded (or if there was no image to upload), the control is passed to the route handler function, where the rest of the recipe creation process takes place. Therefore, the image upload process must be completed before the recipe creation process can proceed.