const fs = require('fs');
const path = require('path');

const pngPath = 'c:/xampp/htdocs/inworalanding/frontend/public/favicon.png';
const svgPath = 'c:/xampp/htdocs/inworalanding/frontend/public/favicon.svg';

const buf = fs.readFileSync(pngPath);
const b64 = buf.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512" />
</svg>
`;

fs.writeFileSync(svgPath, svg);
console.log('Successfully wrote favicon.svg with base64 embedded mark');
