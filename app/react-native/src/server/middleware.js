import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import baseConfig from './config/webpack.config';
import baseProductionConfig from './config/webpack.config.prod';
import loadConfig from './config';

function getMiddleware(configDir) {
  const middlewarePath = path.resolve(configDir, 'middleware.js');
  if (fs.existsSync(middlewarePath)) {
    let middlewareModule = require(middlewarePath); // eslint-disable-line
    if (middlewareModule.__esModule) { // eslint-disable-line
      middlewareModule = middlewareModule.default;
    }
    return middlewareModule;
  }
  return () => {};
}

export default function(options) {
  const { projectDir, configDir } = options;
  // Build the webpack configuration using the `baseConfig`
  // custom `.babelrc` file and `webpack.config.js` files
  const environment = options.environment || 'DEVELOPMENT';
  const isProd = environment === 'PRODUCTION';
  const currentWebpackConfig = isProd ? baseProductionConfig(options) : baseConfig(options);
  const config = loadConfig(environment, currentWebpackConfig, projectDir, configDir);

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
    // stats: {
    //   assets: true,
    //   assetsSort: 'field',
    //   builtAt: false,
    //   cached: true,
    //   cachedAssets: false,
    //   children: false,
    //   chunks: false,
    //   chunkModules: true,
    //   chunkOrigins: false,
    //   chunksSort: 'field',
    //   context: '../src/',
    //   colors: true,
    //   depth: false,
    //   entrypoints: false,
    //   env: false,
    //   errors: true,
    //   errorDetails: true,
    //   hash: true,
    //   maxModules: 15,
    //   modules: false,
    //   modulesSort: 'field',
    //   moduleTrace: false,
    //   performance: true,
    //   providedExports: false,
    //   publicPath: false,
    //   reasons: false,
    //   source: false,
    //   timings: false,
    //   usedExports: false,
    //   version: false,
    //   warnings: true,
    // },
  };

  const router = new Router();
  const middlewareFn = getMiddleware(configDir);
  middlewareFn(router);

  router.use(webpackDevMiddleware(compiler, devMiddlewareOptions));

  if (!isProd) {
    router.use(
      webpackHotMiddleware(compiler, {
        log: false,
        quiet: true,
        noInfo: true,
      })
    );
  }

  router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(`${__dirname}/public/index.html`));
  });

  return router;
}
