// @ts-check
const server = require('./common');

const successResponse = { code: 0, message: '请求成功' };

server.filter((req, res, url) => {
  const method = req.method?.toLowerCase();
  console.info(`${req.url} ${method} ${req.headers.origin}`);
  // if (method == 'options') {
  //   res.writeHead(200, {
  //     'Content-Type': 'Application/json',
  //     'Access-Control-Allow-Origin': req.headers.origin, // 设置允许所有端口访问
  //     'Access-Control-Allow-Headers': '*',
  //   });
  //   res.end();
  //   return true;
  // }
  return false;
});

server.get('/simple-request', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*', // 设置允许所有端口访问
  });
  res.write(JSON.stringify(successResponse));
  res.end();
  console.info('request ended');
});

server.get('/simple-request-with-origin-head', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*', // 设置允许所有端口访问
  });

  res.write(JSON.stringify(successResponse));
  res.end();
  console.info('request ended');
});

server.get('/simple-request-standard-content-type', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    'Access-Control-Allow-Origin': req.headers.origin, // 设置允许所有端口访问
  });
  res.write(JSON.stringify(successResponse));
  res.end();
  console.info('request ended');
});

server.options(
  '/simple-request-standard-content-type',
  function (req, res, url) {
    this.log(req);
    res.writeHead(200, {
      // 设置允许所有端口访问
      'Access-Control-Allow-Origin': req.headers.origin,
    });
    res.end();
    console.info('request ended');
  }
);

server.options('/simple-request-custom-content-type', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    'Content-Type': 'Application/json',
    // 设置允许所有端口访问
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': 'content-type',
  });
  res.end();
  console.info('request ended');
});

server.get('/simple-request-custom-content-type', function (req, res, url) {
  res.writeHead(200, {
    // 设置允许所有端口访问
    'Access-Control-Allow-Origin': req.headers.origin,
  });
  this.log(req);
  res.write(JSON.stringify(successResponse));
  res.end();

  console.info('request ended');
});

server.options('/simple-request-custom-method', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    'Content-Type': 'Application/json',
    // 设置允许所有端口访问
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  });
  res.end();
  console.info('request ended');
});

server.get('/simple-request-custom-method', function (req, res, url) {
  this.log(req);
  res.writeHead(200, {
    // 设置允许所有端口访问
    'Access-Control-Allow-Origin': req.headers.origin,
  });
  res.write(JSON.stringify(successResponse));
  res.end();
  console.info('request ended');
});

server.listen(3000);

// console.info('server started at port : 3000');
