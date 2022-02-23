// @ts-check
import { createApp, defineComponent, h } from './vue/vue.esm-browser.js';
import { simpleRequest } from './simple.js';
import { simpleRequestPreflight } from './simpe-preflight.js';

const App = defineComponent({
  name: 'app',
  data() {
    return {
      appName: 'aaaa',
    };
  },
  /**
   * @this {App}
   */
  render() {
    return h('div', [simpleRequest(), simpleRequestPreflight()]);
  },
});

createApp({
  render() {
    return h(App);
  },
}).mount('#app');
