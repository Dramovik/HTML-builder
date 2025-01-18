const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readableStream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8',
);

let data = '';

readableStream.on('data', (chunk) => {
  data += chunk;
});
readableStream.on('end', () => {
  stdout.write(data);
});
readableStream.on('error', (error) => {
  return console.error(error.message);
});