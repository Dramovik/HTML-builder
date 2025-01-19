const fs = require('fs');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true}, (error) => {
  if (error) return console.error(error.message);
  fs.readdir(
    path.resolve(__dirname, 'files'),
    { withFileTypes: false },
    (error, files) => {
      if (error) return console.error(error.message);
      files.forEach((item) => {
        fs.copyFile(path.resolve(__dirname, 'files', item),
          path.resolve(__dirname, 'files-copy', item), (error) => {
            if (error) return console.error(error.message);
          });
      });
    }
  );
  console.log('Copy folder successful');
});