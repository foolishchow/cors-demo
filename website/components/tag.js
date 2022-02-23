import { h } from '../vue/vue.esm-browser.js';

/**
 * @param {string} type
 * @param {any[]} tag
 * @returns
 */
const tag = (type, ...tag) => {
  return h(
    'span',
    {
      class: `tag ${type}`,
    },
    tag
  );
};
/**
 *
 * @param {any[]} content
 * @returns
 */
const Tag = (...content) => {
  return tag('', ...content);
};
/**
 *
 * @param {any[]} content
 * @returns
 */
const TagPink = (...content) => {
  return tag('pink', ...content);
};

/**
 *
 * @param {any[]} content
 * @returns
 */
const TagOrange = (...content) => {
  return tag('orange', ...content);
};
/**
 *
 * @param {any[]} content
 * @returns
 */
const TagGreen = (...content) => {
  return tag('green', ...content);
};

/**
 *
 * @param {any[]} content
 * @returns
 */
const TagBlue = (...content) => {
  return tag('blue', ...content);
};
/**
 *
 * @param {any=} content
 * @returns
 */
const Pre = (content) => {
  return h('pre', [content || ``]);
};

/**
 *
 * @param {any[]} content
 * @returns
 */
const P = (...content) => {
  return h('p', [...content]);
};
const Line = () => {
  return h('div', { class: 'line' });
};
/**
 *
 * @param {any} content
 * @returns
 */
const PreRed = (content) => {
  return h('pre', { style: 'color:red' }, [content]);
};

/**
 *
 * @param {any} content
 * @returns
 */
const Span = (content) => {
  return h('span', [content]);
};

/**
 *
 * @param {any[]} content
 * @returns
 */
const Red = (...content) => {
  return h('span', { style: 'color:red' }, content);
};
/**
 *
 * @param {any[]} content
 * @returns
 */
const Bold = (...content) => {
  return h('span', { style: 'font-weight:bold' }, content);
};
export {
  Tag,
  Pre,
  PreRed,
  Line,
  Span,
  Red,
  Bold,
  TagPink,
  TagOrange,
  TagBlue,
  TagGreen,
  P,
};
