const http = require('http');
const fs = require('fs');

const PORT = 8000;

http
  .createServer((req, res) => {
    console.log('req url:', req.url);
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html',
        // cookie
        // max-age 有效时间，默认是会话期有效，该属性更容易计算
        // expires 过期时间
        // domain 设置域名（cookie共享）
        'Set-Cookie': ['name=iron;max-age=2', 'test=123'],
      });

      res.end(html);
    }
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
