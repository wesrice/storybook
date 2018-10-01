import path from 'path';
import { Router } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { getMiddleware } from './utils';
import loadConfig from './config';

let webpackResolve = () => {};
let webpackReject = () => {};

export const webpackValid = new Promise((resolve, reject) => {
  webpackResolve = resolve;
  webpackReject = reject;
});

export default function(configDir, loadOptions, quiet) {
  // Build the webpack configuration using the `getBaseConfig`
  // custom `.babelrc` file and `webpack.config.js` files
  const config = loadConfig({
    configType: 'DEVELOPMENT',
    corePresets: [require.resolve('./core-preset-dev.js')],
    configDir,
    quiet,
    ...loadOptions,
  });
  const middlewareFn = getMiddleware(configDir);

  // remove the leading '/'
  let { publicPath } = config.output;
  if (publicPath[0] === '/') {
    publicPath = publicPath.slice(1);
  }

  const compiler = webpack(config);
  const devMiddlewareOptions = {
    noInfo: true,
    logLevel: 'warn',
    watchOptions: config.watchOptions || {
      aggregateTimeout: 10,
    },
    stats: {
      assets: true,
      assetsSort: 'field',
      builtAt: false,
      cached: true,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: true,
      chunkOrigins: false,
      chunksSort: 'field',
      context: '../src/',
      colors: true,
      depth: false,
      entrypoints: false,
      env: false,
      errors: true,
      errorDetails: true,
      hash: true,
      maxModules: 15,
      modules: false,
      modulesSort: 'field',
      moduleTrace: false,
      performance: true,
      providedExports: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      usedExports: false,
      version: false,
      warnings: true,
    },
    publicPath: config.output.publicPath,
    ...config.devServer,
  };

  const router = new Router();
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, devMiddlewareOptions);
  router.use(webpackDevMiddlewareInstance);
  router.use(webpackHotMiddleware(compiler));

  // custom middleware
  middlewareFn(router);

  webpackDevMiddlewareInstance.waitUntilValid(stats => {
    router.get('/', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.sendFile(path.join(`${__dirname}/public/index.html`));
    });

    router.get('/iframe.html', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.sendFile(path.join(`${__dirname}/public/iframe.html`));
    });

    if (stats.toJson().errors.length) {
      webpackReject(stats);
    } else {
      webpackResolve(stats);
    }
  });

  return router;
}
