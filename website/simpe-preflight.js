import { table } from './components/table.js';
import { requestBlock, simpleBlock } from './components/request.js';
import {
  Bold,
  Line,
  Pre,
  P,
  Red,
  Tag,
  TagPink,
  TagBlue,
  TagOrange,
  TagGreen,
} from './components/tag.js';
import { h } from './vue/vue.esm-browser.js';

const SimpleRequestWithStandardContentType = () => {
  return requestBlock(
    {
      title: '简单请求METHOD - 标准的contentType',
      path: '/simple-request-standard-content-type',
      showPreflight: false,
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
    Line(),
    P(
      TagBlue('Content-Type'),
      `是 `,
      Tag(`application/x-www-form-urlencoded`),
      Tag(`multipart/form-data`),
      Tag(`text/plain`),
      `之一`
    ),
    P(`这是一个简单方法请求,不会触发  `, TagOrange(`Preflight`)),

    P(`我们在   `, Tag('responseHeader'), '添加如下返回头,就不会判定为跨域'),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000',
    })
  );
};

const SimpleRequestWithUnStandardContentType = () => {
  return requestBlock(
    {
      title: '简单请求METHOD - 非标准的contentType',
      path: '/simple-request-standard-content-type',
      showPreflight: false,
      headers: {
        'content-type': 'application/json',
      },
    },
    Line(),
    P(
      '我们把   ',
      TagBlue('Content-Type'),
      `改为 `,
      Tag(`application/json`),
      `就会触发  `,
      TagOrange(`Preflight`)
    ),

    P(
      `虽然我们在   `,
      Tag('OPTIONS'),
      `请求的   `,
      Tag('ResponseHeader'),
      '添加如下返回头'
    ),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000',
    }),
    P('而且   ', Tag('OPTIONS'), `请求也返回了   `, TagGreen('200')),
    P(`但我们还是请求失败了`),
    h(
      'pre',
      { class: 'error' },
      `Access to fetch at 'http://localhost:3000/simple-request-standard-content-type'
from origin 'http://localhost:8000' has been blocked by CORS policy:
Request header field content-type is not allowed by Access-Control-Allow-Headers
in preflight response.`
    ),
    P(
      '因为   ',
      Tag('OPTIONS'),
      '的   ',
      Tag('ResponseHeader'),
      '没有返回如下返回头'
    ),
    table({
      'Access-Control-Allow-Headers': 'content-type',
    }),
    Line()
  );
};

const SimpleRequestWithCustomContentType = () => {
  return requestBlock(
    {
      title: '简单请求METHOD - 非标准的contentType',
      path: '/simple-request-custom-content-type',
      headers: {
        'content-type': 'application/json',
      },
    },
    Line(),

    P(
      '在   ',
      Tag('OPTIONS'),
      '的   ',
      Tag('ResponseHeader'),
      '返回如下头,接口就可以请求了'
    ),
    table({
      'Access-Control-Allow-Origin': 'http://localhost:8000',
      'Access-Control-Allow-Headers': 'content-type',
    }),
    h('div', { style: 'color:red' }, ['注意：']),
    P(
      '如果我们把  ',
      TagBlue('GET'),
      Tag('/simple-request-custom-content-type'),
      '返回头中的  ',
      Tag('Access-Control-Allow-Origin'),
      '去掉的话,你会发现，又跨域了'
    )
  );
};

const SimpleRequestWithCustomMethod = () => {
  return simpleBlock(
    {
      title: '指定可以跨域的方法',
    },
    [
      P(
        '在   ',
        Tag('OPTIONS'),
        '的   ',
        Tag('ResponseHeader'),
        '返回如下返回头,接口就可以请求了'
      ),
      table({
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      }),
      Line(),
      requestBlock({
        title: '指定可以跨域的方法',
        path: '/simple-request-custom-method',
        showPreflight: false,
        method: 'get',
        headers: {
          'content-type': 'application/json',
        },
      }),
      requestBlock({
        title: '指定可以跨域的方法',
        path: '/simple-request-custom-method',
        showPreflight: false,
        method: 'options',
        headers: {
          'content-type': 'application/json',
        },
      }),
      requestBlock({
        title: '指定可以跨域的方法',
        path: '/simple-request-custom-method',
        showPreflight: false,
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      }),
    ]
  );
};
export function simpleRequestPreflight() {
  return simpleBlock(
    {
      title: '触发预检',
    },
    SimpleRequestWithStandardContentType(),
    SimpleRequestWithUnStandardContentType(),
    SimpleRequestWithCustomContentType(),

    P(
      '上面这个接口多了一个  ',
      TagBlue('Preflight'),
      '按钮,模拟发送',
      Tag('OPTIONS'),
      `请求`
    ),
    P(`点击  `, TagBlue('Preflight'), `的时候，还是跨域，这是为什么呢 ?`),
    P(
      `因为我们的`,
      Tag('OPTIONS'),
      `接口中没有返回  `,
      Tag(`Access-Control-Request-Methods`),
      `这个头,默认就只有简单请求类型可以跨域`
    ),

    SimpleRequestWithCustomMethod()
  );
}
