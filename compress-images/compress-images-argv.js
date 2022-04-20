/**
 * Script to compress image before commit
 * (uses with lint-stages and husky only)
 *
 * to add new image - create a file in ./src/img file
 * to update an image - just update it :)
 * on git precommit hook we will minify images by path ant put to ./src/assets/minifiedImages
 */
const { exec } = require('child_process');

const compressFile = require('./compress-file');

/**
 * Fetch images maps from args and compress all.
 * Compressing is asynchronous process.
 * So wait for all image to compress and return.
 *
 * About using process.argv
 * Find more. here: https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
 */
Promise.resolve(process.argv)
  .then((argvs) => argvs.slice(2))
  .then((argvs) => argvs.map(compressFile))
  .then((promises) => Promise.all(promises))
  .then((minifiedFilePathsArray) => {
    /**
     * ISSUE:
     * lint-staged doesn't add to staged new files automatically
     * Run `git add` for minified file to add this right after precommit hook
     *
     * If you are interested:
     * TODO:
     * Figure out the reason of this issue
     */
    minifiedFilePathsArray.forEach((pathToMinifiedImage) => {
      exec(`git add ${pathToMinifiedImage}`, (err) => {
        if (err) {
          console.error('--> [ERROR] compress-images-argv.js `git add`:', err);
          return Promise.reject(err);
        }

        return Promise.resolve();
      });
    });
  })
  .catch((e) => {
    console.error('--> [ERROR] compress-images-argv.js:', e);
    process.exit(1);
  });
