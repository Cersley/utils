const fse = require('fs-extra');

/*
  Q: Why Sharp package used?
  A: https://sharp.pixelplumbing.com/performance

  Note: we can use any other tool
 */
const sharp = require('sharp'); // https://sharp.pixelplumbing.com/

const sourceImagesDirPath = 'src/img/';
const minifiedImagesDirPath = 'src/assets/minifiedImages/';
/**
 * Function: Update existing file to new compressed file
 *
 * TODO: add support for ico files (look at 'to-ico' package)
 */
const compressFile = (filename) => new Promise((resolve, reject) => {
  // Read upcoming file
  fse.readFile(filename, (readFileError, sourceData) => {
    if (readFileError) throw readFileError;
    // create a dir is not exists
    fse.ensureDirSync(minifiedImagesDirPath);
    // replace path src/img/**/<image_name> -> src/assets/minifiedImages/**/<image_name>
    const pathToMinifiedImage = filename.replace(sourceImagesDirPath, minifiedImagesDirPath);

    /**
     * Legacy thing
     *
     * FIXME:
     * If it possible - remove .cur files from ./src/img folder
     * when marketplace will be removed from Charts app
     */
    if (pathToMinifiedImage.includes('.svg')) {
      console.warn('--> [WARN][SVG] compress-file.js compressFile: unsupported file moved without compressing:', filename);
      fse.outputFileSync(pathToMinifiedImage, sourceData);
      return resolve(pathToMinifiedImage);
    }
    if (pathToMinifiedImage.includes('.cur')) {
      console.warn('--> [WARN] compress-file.js compressFile: unsupported file moved without compressing:', filename);
      fse.outputFileSync(pathToMinifiedImage, sourceData);
      return resolve(pathToMinifiedImage);
    }

    // If file buffer data is present convert it into new compressed file
    sharp(sourceData).toBuffer(pathToMinifiedImage, (error, data, info) => {
      if (error) {
        if (error.message === 'GIF output requires libvips with support for ImageMagick') {
          console.warn('--> [WARN] compress-file.js compressFile `.toFile`: compressing skipped for GIF file:', filename);
          // TODO: need to configure GIF files compressing additionally
          fse.outputFileSync(pathToMinifiedImage, sourceData);
          return resolve(pathToMinifiedImage);
        }

        if (error.message === 'Input buffer contains unsupported image format') {
          console.warn('--> [WARN] compress-file.js compressFile `.toFile`: compressing skipped for unsupported image format:', filename); // eslint-disable-line max-len
          fse.outputFileSync(pathToMinifiedImage, sourceData);
          return resolve(pathToMinifiedImage);
        }

        console.error('--> [ERROR] compress-file.js compressFile `.toFile`:', error, `of: ${filename}`);
        return reject(error);
      }

      fse.outputFileSync(pathToMinifiedImage, data);
      console.log('--> compress-file.js compressFile info:', info);
      return resolve(pathToMinifiedImage);
    });
  });
});

module.exports = compressFile;
