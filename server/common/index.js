// @ts-check
const http = require('http');
const libUrl = require('url');

/**
 * @typedef {import('./define').RequestListener} RequestListener
 *
 * @typedef {import('./define').Filter} Filter
 *
 * @typedef {'get'|'post'|'put'|'head'|'options'|'delete'|'patch'} HttpMethod
 *
 * @typedef RequestHandle
 * @property {HttpMethod} method
 * @property {string} path
 * @property {RequestListener} callback
 *
 *
 *
 * @typedef {Record<string,RequestHandle[]>} RgisteredHandle
 *
 *
 * @typedef {import('./define').Server} IServer
 */

/**
 * @implements {IServer}
 */
class Server {
  constructor() {
    /**
     * @type {Filter[]}
     */
    this.filters = [];
    /** @type {RgisteredHandle} */
    this.handles = {};
    /** @type {http.Server} */
    this.app = http.createServer(this.onRequest.bind(this));
  }

  /**
   *
   * @param {Filter} filter
   */
  filter(filter) {
    this.filters.push(filter);
  }
  /**
   *
   * @param {string} path
   * @param {HttpMethod} method
   * @param {RequestListener} callback
   */
  map(path, method, callback) {
    const handles = this.handles[path.toLowerCase()] || [];
    handles.push({
      path: path.toLowerCase(),
      method,
      callback,
    });
    this.handles[path] = handles;
  }

  /**
   * @param {string} path
   * @param {RequestListener} callback
   */
  options(path, callback) {
    this.map(path, 'options', callback);
  }
  /**
   * @param {string} path
   * @param {RequestListener} callback
   */
  get(path, callback) {
    this.map(path, 'get', callback);
  }

  /**
   * @param {string} path
   * @param {RequestListener} callback
   */
  post(path, callback) {
    this.map(path, 'post', callback);
  }

  /**
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  onRequest(req, res) {
    const url = libUrl.parse(req.url || '', true);
    const path = url.pathname || '';
    const method = req.method?.toLocaleLowerCase();
    let result = this.filters.some((filter) => filter(req, res, url));
    if (result) {
      return;
    }
    const handles = (this.handles[path] || []).filter(
      (handle) => handle.method == method
    );
    if (handles.length > 0) {
      handles[0].callback.call(this, req, res, url);
    } else {
      res.writeHead(404, {});
      res.end();
    }

    // this.logHeaders(req, res);
  }

  /**
   *
   * @param {number} port
   */
  listen(port) {
    this.app.listen(port, () => {
      console.info('server started at port >>> 3000 <<<');
    });
  }

  /**
   * @param {http.IncomingMessage} req
   */
  log(req) {
    console.info(
      `[${new Date().toDateString()} ${new Date().toTimeString()}] ${
        req.method
      } ${req.url}`
    );
  }

  /**
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  logHeaders(req, res) {
    console.info('');
    console.info('');
    console.info('↓↓↓↓↓ request header ↓↓↓↓↓');
    console.info(`${req.url} ${req.method}  http/${req.httpVersion}`);
    const requestHeaders = req.headers || {};
    Object.keys(requestHeaders).forEach((key) => {
      console.info(`${key}: ${requestHeaders[key]}`);
    });
    console.info('↑↑↑↑↑ request header ↑↑↑↑↑');
    console.info('');
    console.info('');
  }
}

module.exports = new Server();
