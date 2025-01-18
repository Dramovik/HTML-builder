const fs = require('fs');
const path = require('path');

const arrFileInfo = [];

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) return console.error(error.message);
  files.forEach((item) => {
    if (item.isFile()) {
      // console.log(item);
      // console.log(path.extname(item.name))
      // console.log(path.basename(item.name))
      fs.stat(path.resolve(__dirname, 'secret-folder', item.name), (error, stats) => {
        if (error) return console.error(error.message);
        let arrData = [];
        arrData.push(item.name.split('.')[0]);
        arrData.push(path.extname(item.name));
        arrData.push(stats.size);
        console.log(arrData.join(' - '));
      });
    }
  });
})