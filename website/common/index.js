/**
 *
 * @param {string} url
 * @param {any=} headers
 * @returns
 */
export function sendRequest(url, headers = {}, method = 'get') {
  return fetch(`${location.protocol}//${location.hostname}:3000${url}`, {
    headers,
    method,
  });
}
