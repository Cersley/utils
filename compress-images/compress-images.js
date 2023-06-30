/**
 * Compress images by 'compressImages' gulp task
 */
const fsPromises = require('fs/promises');
const path = require('path');

const compressImage = require('./compress-file');

/* eslint-disable */

async function walk(dir, fileList = []) {
  const files = await fsPromises.readdir(dir);
  for (const file of files) {
    const stat = await fsPromises.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = await walk(path.join(dir, file), fileList);
    } else fileList.push(path.join(dir, file));
  }
  return fileList;
}

walk('./src/img/').then((paths) => {
  const promises = paths.map(path => compressImage(path))
  return Promise.all(promises)
    .catch(error => {
      console.error('--> [ERROR] compress-images.js:', error);
      process.exit(0);
    });
});

/* eslint-enable */
