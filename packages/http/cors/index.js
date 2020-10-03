const http = require('http');

const PORT = 8000;

http
  .createServer((req, res) => {
    console.log('req url:', req.url);

    // serve cors/index.html (http://localhost:5000)

    // cors 默认允许的方法 get/head/post
    // 允许的content-type text/plain, multipart/form-data, application/x-www-form-urlencode
    // 不允许自定义请求头

    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      // 设置允许的请求头
      'Access-Control-Allow-Headers': 'Token',
      // 设置允许的请求方法
      'Access-Control-Allow-Methods': 'PUT,DELETE,POST',
      // 设置预请求最长时间 (秒)
      'Access-Control-Allow-Max-Age': 1000,
    });
    res.end('hello world!');
  })
  .listen(PORT);

console.log(`server start at http://localhost:${PORT}`);
