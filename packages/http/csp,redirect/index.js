const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const PORT = 8000;

http
  .createServer((req, res) => {
    console.log('req url:', req.url);
    if (req.url === '/') {
      // 301 永久重定向 (需谨慎)
      // 302 临时重定向
      res.writeHead(302, {
        Location: '/iron',
      });
      res.end('');
    }

    if (req.url === '/iron') {
      const html = fs.readFileSync('./index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html',
        // 资源编码 gzip
        'Content-Encoding': 'gzip',
        // 资源安全策略 CSP
        // default-src  全局限制
        // connect-src/img-src/font-src/style-src/script-src/iframe-src

        // http: https: 表示只能通过http或https加载
        // 'self' 表示只能加载同域下资源，不能应用外链
        // http://xxx.xxx 限制资源指定域名
        'Content-Security-Policy': "default-src 'self';report-uri /report",
      });

      res.end(zlib.gzipSync(html));
    }
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
