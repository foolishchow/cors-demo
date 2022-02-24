// @ts-check
import { createApp, defineComponent, h } from './vue/vue.esm-browser.js';
import { simpleRequest } from './simple.js';
import { simpleRequestPreflight } from './simpe-preflight.js';
import { Article } from './components/markdown.js';

const App = defineComponent({
  name: 'app',
  /**
   * @this {App}
   */
  render() {
    return Article(simpleRequest(), simpleRequestPreflight());
  },
});

createApp({
  render() {
    return h(App);
  },
}).mount('#app');
