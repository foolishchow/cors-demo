import { defineComponent, h } from '../vue/vue.esm-browser.js';

const TableBlock = defineComponent({
  name: 'TableBlock',
  props: {
    title: String,
    /**
     * @type {import('../vue/vue.esm-browser.js').Prop<Record<string,string>>}
     */
    headers: Object,
  },
  data() {
    return {};
  },
  /**
   * @this {TableBlock}
   */
  render() {
    /** @type {any} */
    const headers = this.headers || {};
    const items = Object.keys(headers).map((key) => {
      return h(
        'tr',
        {
          class: 'header',
          key,
        },
        [h('td', key), h('td', headers[key])]
      );
    });
    /** @type {any} */
    let headerTable =
      items.length == 0
        ? undefined
        : h('table', { class: 'headers' }, [h('tbody', items)]);
    let headerTitle = this.title
      ? h('p', { class: 'table-title' }, [this.title])
      : undefined;
    return h(
      'div',
      {
        class: 'table-wrapper',
      },
      [headerTitle, headerTable]
    );
  },
});

/**
 *
 * @param {Record<string,string>} headers
 */
function table(headers) {
  return h(TableBlock, { headers });
}

export { TableBlock, table };
