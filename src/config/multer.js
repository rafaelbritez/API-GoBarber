// All configurations in the part to the  file of upload
import multer from 'multer'; // Import library multer
import crypto from 'crypto'; // This library is of the node
import { extname, resolve } from 'path'; // Imported only two functions =>extname is for verify the extension that's file AND resolve => Walk a path within my app

export default {
  // in our case we will store the images inside our application file
  storage: multer.diskStorage({
    // how multer will save our image files // many storages that's has multer  //what are the most variable types of fertilizers that can be stored, so we can store the entire file within a Content Delivery Network, which are online servers made for storing physical files.

    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // all file are all of the data that they're used to make upload
      // filename will manage the names of the images so that there are not the same names and names with different characters
      crypto.randomBytes(16, (err, res) => {
        //  Crypto is a node's default library for random characters. Function randomBytes 1 parameter number of bytes I want to randomize, 2 parameter will be a callback that gets an error or res in its function
        if (err) return cb(err); // if it is an error, return a callback error

        return cb(null, res.toString('hex') + extname(file.originalname)); // returns a callback with first null parameter(because in the first parameter it always receives the error), second parameter a hexadecimal string + file extension (png.jpg etc ..)
      });
    },
  }),
};
