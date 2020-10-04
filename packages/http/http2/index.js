const http2 = require('http2');
const fs = require('fs');

const PORT = 8000;

// http2 会复用tcp连接，且不会有受请求数量的限制，不同域下不会复用
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
});
server.on('error', err => console.error(err));

server.on('stream', (stream, headers) => {
  console.log('req url:', headers[':path']);
  const path = headers[':path'];
  if (path === '/') {
    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 200,
    });
    const html = fs.readFileSync('./index.html');
    stream.end(html);
  } else if (/(.*)\.js/.test(path)) {
    stream.respond({
      'content-type': 'text/javascript; charset=utf-8',
      ':status': 200,
      'Cache-Control': 'max-age=200',
    });
    const script = fs.readFileSync('./script.js');
    stream.end(script);
  }
});

server.listen(PORT);

console.log(`server start at https://localhost:${PORT}`);
