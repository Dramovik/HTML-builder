const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'template.html'), (error, data) => {
  if (error) return console.error(error.message);
  fs.readFile(path.resolve(__dirname, 'components', 'header.html'), (error, header) => {
    if (error) console.error(error.message);
    let tempHeader = header.toString().split('\n').map((item, index, arr) => {
      if (index === 0) {
        return `${item}`;
      } else if (index === arr.length - 1) {
        arr.pop();
      } else {
        return `    ${item}`;
      }
    }).join('\n');
    data = data.toString().split('{{header}}').join(tempHeader);
    fs.readFile(path.resolve(__dirname, 'components', 'articles.html'), (error, articles) => {
      if (error) console.error(error.message);
      let tempArticles = articles.toString().split('\n').map((item, index, arr) => {
        if (index === 0) {
          return `\r\n    ${item}`;
        } else if (index === arr.length - 1) {
          arr.pop();
        } else {
          return `    ${item}`;
        }
      }).join('\n');
      data = data.toString().split('{{articles}}').join(tempArticles);
      fs.readFile(path.resolve(__dirname, 'components', 'footer.html'), (error, footer) => {
        if (error) console.error(error.message);
        let tempFooter = footer.toString().split('\n').map((item, index, arr) => {
          if (index === 0) {
            return `\r\n    ${item}`;
          } else if (index === arr.length - 1) {
            arr.pop();
          } else {
            return `    ${item}`;
          }
        }).join('\n');
        data = data.toString().split('{{footer}}').join(tempFooter);
        fs.mkdir(path.resolve(__dirname, 'project-dist'), {recursive: true}, (error) => {
          if (error) console.error(error.message);
          fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), data, (error) => {
            if (error) console.error(error.message);
          });
        });
      });
    });
  });
});

let styleArr = [];
// console.log(path.resolve(__dirname, 'project-dist', '01-header.css'));
fs.readFile(path.resolve(__dirname, 'styles', '01-header.css'), (error, header) => {
  if (error) console.error(error.message);
  styleArr.push(header.toString());
  fs.readFile(path.resolve(__dirname, 'styles', '02-main.css'), (error, main) => {
    if (error) console.error(error.message);
    styleArr.push(main.toString());
    fs.readFile(path.resolve(__dirname, 'styles', '03-footer.css'), (error, footer) => {
      if (error) console.error(error.message);
      styleArr.push(footer.toString());
      fs.mkdir(path.resolve(__dirname, 'project-dist'), {recursive: true}, (error) => {
        if (error) console.error(error.message);
        fs.writeFile(path.resolve(__dirname, 'project-dist', 'style.css'), styleArr.join(''), (error) => {
          if (error) console.error(error.message);
        });
      });
    });
  });
});

function checkCopyDirectory(distCheck, distCopy) {
  fs.readdir(distCheck, { withFileTypes: true }, (error, files) => {
    if (error) return console.error(error.message);

    files.forEach((item) => {
      if (item.isFile()) {
        fs.copyFile(path.resolve(distCheck, item.name), path.resolve(distCopy, item.name), (error) => {
          if (error) console.error(error.message);
        });
      } else {
        fs.mkdir(path.resolve(distCopy, item.name), {recursive: true}, (error) => {
          if (error) console.error(error.message);
          checkCopyDirectory(path.resolve(distCheck, item.name), path.resolve(distCopy, item.name));
        });
      }
    });
  });
}

checkCopyDirectory(path.resolve(__dirname, 'assets'), path.resolve(__dirname, 'project-dist', 'assets'));