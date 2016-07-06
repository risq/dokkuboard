const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./config');
const proxyMiddleware = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'dev';
const webpackConfig = env === 'testing'
  ? require('./build/webpack.prod.conf')
  : require('./build/webpack.dev.conf');

const api = require('./server/api');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
app.use(bodyParser.json());
app.use('/api', api);


if (env === 'dev') {
  const compiler = webpack(webpackConfig);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler);
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  // proxy api requests
  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    app.use(proxyMiddleware(context, options));
  });

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);
}

// serve pure static assets
const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${port} (env: ${env})\n`);
});
