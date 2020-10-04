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
    }
    if (req.url === '/cache.js') {
      function setHeades(statusCode) {
        res.writeHead(statusCode, {
          'Content-Type': 'text/javascript',
          // Cache-Control 的缓存策略（强缓存）
          // no-store 没有缓存，忽略缓存验证信息，每次都需要从服务器获取资源
          // no-cache 可以缓存，但是是否使用缓存则需要经过协商缓存来验证决定
          // public 表示资源可以被任何途径的缓存者缓存，包括中间代理，cdn等，
          // private 所有内容只有客户端可以缓存，Cache-Control的默认取值
          // max-age=<seconds> 表示资源能被缓存的最大时间
          // s-maxage=<seconds> 代理服务器缓存的最大时间
          'Cache-Control': 'max-age=1000000,no-cache',

          // Last-Modified 和 ETag 表示协商缓存，当缓存命中时会返回304
          // Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
          // eg：Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
          // 表示当前资源的最后修改时间，通常配合If-Modified-Since / If-Unmodified-Since 一起使用
          // If-Modified-Since 第二次请求时，请求头会携带上次Last-Modified值
          'Last-Modified': 'tiger',
          // ETag 表示当前资源在服务起的唯一标识符
          // 通常配合 If-Match /If-None-Match 第二次请求时，请求头会携带上次ETag值
          ETag: 'iron',
        });
      }

      // const lastModified = req.headers['if-modified-since'];
      // etag 比 last-modified 更精确，因为一般情况下后者为时间，只能精确到1秒
      const etag = req.headers['if-none-match'];
      console.log('etag', etag);
      if (etag === 'iron') {
        setHeades(304);
        res.end('');
      } else {
        const script = fs.readFileSync('./cache.js');
        setHeades(200);
        res.end(script);
      }
    }
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
