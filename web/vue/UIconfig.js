// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const timeout = 1000 * 60 * 60 * 3 // 3 hours

const CONFIG = {
  headless: false,
  api: {
    host: '127.0.0.1',
    port: 3000,
    timeout:timeout
  },
  ui: {
    ssl: false,
    host: 'localhost',
    port: 3000,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;
