const http = require('http');
const fs = require('fs');

const PORT = 8000;

http
  .createServer((req, res) => {
    console.log('req url:', req.headers.host + req.url);
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html',
        // Link: '</cat.jpeg>;as=image;rel=preload',
      });

      res.end(html);
    }

    if (req.url === '/test') {
      res.writeHead(200, {
        'Cache-Control': 'max-age=200',
        // 根据请求头字段进行缓存，一般用来给客户端指定缓存副本
        Vary: 'Accept-Encoding,User-Agent',
      });

      res.end('hello');
    }
    if (req.url === '/cat.jpeg') {
      const image = fs.readFileSync('./cat.jpeg');
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
      });
      res.end(image);
    }
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
