import { table } from './components/table.js';
import { requestBlock, simpleBlock } from './components/request.js';
import { h } from './vue/vue.esm-browser.js';
import {
  Bold,
  Line,
  Pre,
  P,
  Red,
  Tag,
  TagBlue,
  TagOrange,
} from './components/markdown.js';

const SimpleRequestFailed = function () {
  return requestBlock(
    {
      showPreflight: false,
      title: '简单请求 - 跨域',
      method: 'get',
      path: '/simple-request',
    },
    P('这是一个简单 ', TagBlue('GET'), '请求,没有带任何的额外 ', Tag('head')),
    P(
      `不会触发`,
      TagOrange('Preflight'),
      `，但是我们在返回时，没有在`,
      Tag('responseHeader'),
      `里设置`
    ),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000 | *',
    }),
    P(
      `这个头,所以会判定为跨域，但是其实我们看后台日志，其实这个请求是后台执行完了的`
    )
  );
};

const SimpleRequest = () => {
  return requestBlock(
    {
      title: '简单请求 - 成功',
      method: 'get',
      showPreflight: false,
      path: '/simple-request-with-origin-head',
    },
    P(
      `修改下上面的接口，我们在`,
      Tag('responseHeader'),
      '添加如下返回头,就不会判定为跨域'
    ),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000',
    })
  );
};

const SimpleRequestWithCustomHeader = () => {
  return requestBlock(
    {
      title: '简单请求METHOD - 添加了非标准值的contentType',
      path: '/simple-request-unstandard-content-type',
      headers: {
        'content-type': 'application/json',
      },
    },
    Line(),
    Pre(`这是一个简单请求,但是contentType不是`),
    Tag(`application/x-www-form-urlencoded`),
    Tag(`multipart/form-data`),
    Tag(`text/plain`),
    Pre([`这三个值之一，所以其实是一个`, Red(Bold(`复杂请求`))]),
    Pre([
      `会走`,
      Bold(` Preflight `),
      `,这时候我们在后台就要单独维护这个接口的Options请求了`,
    ]),
    Line(),
    Pre([`我们在后台`, Bold(`Options`), `接口中设置了如下返回头`]),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000 | *',
    }),
    Pre(`预检就通过了`),
    Line(),
    Pre(`之后的请求也就可以了`),
    Line(),

    Line(),
    Pre([
      Bold(Red(`但是`)),
      `当我们点击`,
      Bold(`Preflight`),
      `的时候，还是跨域，这是为什么呢`,
    ]),
    Pre([
      Bold(Red(`原因`)),
      `因为我们的`,
      Tag('OPTIONS'),
      `接口中没有返回`,
      Tag(`Access-Control-Request-Methods`),
      `这个头`,
    ]),
    Line(),
    Pre(`如果我们返回了如下的头`),
    table({
      'Access-Control-Request-Methods': 'GET,POST,OPTIONS',
    }),
    Pre(`我们就可以发OPTION请求了`)
  );
};

export function simpleRequest() {
  return simpleBlock(
    {
      title: '简单请求 - 不触发预检',
    },
    SimpleRequestFailed(),
    SimpleRequest()
  );
}
