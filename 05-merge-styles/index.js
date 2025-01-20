const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) return console.error(error.message);
  let styleArray = [];
  let numberProcessed = 0;
  files = files.filter((item) => {
    return path.extname(item.name) === ".css";
  });
  files.forEach((item) => {
    if (path.extname(item.name) === '.css') {
      fs.readFile(path.resolve(__dirname, 'styles', item.name), (error, data) => {
        if (error) return console.error(error.message);
        styleArray = [...styleArray, data.toString()];
        numberProcessed += 1;
        if (numberProcessed === files.length) {
          fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), styleArray.join(''), (error) => {
            if (error) return console.error(error.message);
          })
        }
      });
    }
  });
});