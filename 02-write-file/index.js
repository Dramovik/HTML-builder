const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const fileName = 'text.txt';
const arr = [];

stdout.write("Hello. Write the text to be written to the file:\n");
stdin.on('data', (data) => {
  if (data.toString() === 'exit\r\n' || data.toString() === 'exit\n') {
    process.exit();
  }
  arr.push(data.toString());

  fs.writeFile(path.resolve(__dirname, fileName), arr.join(''), (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
});
process.on('exit', () => {
  stdout.write("Good bue!");
});
