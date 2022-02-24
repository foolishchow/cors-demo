import { sendRequest } from '../common/index.js';
import { defineComponent, h } from '../vue/vue.esm-browser.js';
import { TableBlock } from './table.js';
import { TagBlue } from './markdown.js';

const RequestBlock = defineComponent({
  name: 'RequestBlock',
  props: {
    title: String,
    showPreflight: {
      type: Boolean,
      default: true,
    },
    path: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'get',
    },
    description: String,
    headers: Object,
  },
  data() {
    return {
      /**@type {string|null} */
      result: null,
      /**@type {Error|null} */
      error: null,
    };
  },
  /**
   * @this {RequestBlock}
   */
  render() {
    /** @type {any} */
    let headerTable = this.headers
      ? h(TableBlock, { headers: this.headers })
      : undefined;

    /** @type {any} */
    let error = undefined;
    if (this.error) {
      error = h(
        'pre',
        { class: 'error' },
        this.error.stack || this.error.message
      );
    }
    /** @type {any} */
    let result = undefined;
    if (this.result) {
      result = h('pre', { class: 'result' }, this.result);
    }

    /** @type {import('../vue/vue.esm-browser').VNode[]} */
    let buttons = [
      h('button', { class: 'btn-send', onClick: this.request }, '请求'),
    ];
    if (this.showPreflight) {
      buttons.push(
        h(
          'button',
          { class: 'btn-send preflight', onClick: this.Preflight },
          'Preflight'
        )
      );
    }
    buttons.push(
      h('button', { class: 'btn-send clear', onClick: this.clear }, '清除')
    );

    return h(
      'div',
      {
        class: 'request-wrapper',
      },
      [
        h('h5', { class: 'title' }, this.title),
        h('p', { class: 'path' }, [
          TagBlue(this.method.toUpperCase()),
          h('span', { class: 'path-name' }, this.path),
          ...buttons,
        ]),
        headerTable,
        h(this.$slots.default),
        error,
        result,
      ]
    );
  },
  methods: {
    clear() {
      this.result = null;
      this.error = null;
    },
    async request() {
      this.doRequest(this.method);
    },
    Preflight() {
      this.doRequest('options');
    },
    /**
     *
     * @param {string} method
     */
    async doRequest(method) {
      try {
        const res = await sendRequest(
          this.path,
          this.headers,
          method || this.method
        );
        this.result = await res.text();
        this.error = null;
      } catch (err) {
        // @ts-ignore
        this.error = err;
        this.result = null;
      }
    },
  },
});

/**
 * @typedef Options
 * @property {string} title
 * @property {string} path
 * @property {string=} method
 * @property {string=} description
 * @property {any=} headers
 * @property {Boolean=} showPreflight
 *
 * @param {Options} option
 * @param {any[]} contents
 */
function requestBlock(option, ...contents) {
  // @ts-ignore
  return h(RequestBlock, option, contents);
}

const SimpleBlock = defineComponent({
  name: 'SimpleBlock',
  props: {
    title: String,
  },
  data() {
    return {};
  },
  /**
   * @this {SimpleBlock}
   */
  render() {
    /** @type {any} */

    return h(
      'div',
      {
        class: 'simple-block',
      },
      [
        h('h4', { class: 'simple-block-title' }, this.title),
        h(this.$slots.default),
      ]
    );
  },
  methods: {},
});

/**
 * @typedef SimpleBlockOptions
 * @property {string} title
 *
 * @param {SimpleBlockOptions} option
 * @param {any[]} contents
 */
function simpleBlock(option, ...contents) {
  // @ts-ignore
  return h(SimpleBlock, option, contents);
}
export { RequestBlock, requestBlock, SimpleBlock, simpleBlock };
