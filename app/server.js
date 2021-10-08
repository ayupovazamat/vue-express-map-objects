const path = require('path');
const express = require('express');

const {createBundleRenderer} = require('vue-server-renderer');
const template = require('fs').readFileSync(
  path.join(__dirname, './templates/index.html'),
  'utf-8',
);

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const server = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
  inject: false,
});

server.use('/dist', express.static(path.join(__dirname, '../dist')));
server.use('/', express.static(path.join(__dirname, './node_assets')));

// enable CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routers
const routes = require('./routes')
server.use(express.json());
server.use('/api', routes)

// все остальные запросы
server.get('*', (req, res) => {
  const context = {url: req.url};
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end('Page not found');
      } else {
        console.log(err);
        res.status(500).end('Internal Server Error');
      }
    }
    res.end(html);
  });
});

server.listen(process.env.PORT || 80);
