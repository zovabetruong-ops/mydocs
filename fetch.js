import https from 'https';
import fs from 'fs';

https.get('https://doc.penguinsaichat.dpdns.org/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('page.html', data);
    console.log('Done');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
