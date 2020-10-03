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
      });

      res.end(html);
    } else if (/(.*)\.js/g.test(req.url)) {
      const script = fs.readFileSync('./script.js');
      // 打开 chrome devtool network connection ID
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        // tcp 长连接
        // keep-alive 并发连接，复用tcp连接 http 1.1 版本，并发会有限制
        // close 每次请求都创建一个新连接，完成之后就关闭
        // Connection: 'close',
      });

      res.end(script);
    }
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
