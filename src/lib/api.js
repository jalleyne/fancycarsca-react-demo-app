import 'whatwg-fetch';
import fetchDefaults from 'fetch-defaults';

/** */
const api = fetchDefaults(fetch, { headers: {} });

/** */
export default api;
