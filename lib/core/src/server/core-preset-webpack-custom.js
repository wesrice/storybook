import { logger } from '@storybook/node-logger';
import loadCustomWebpackConfig from './loadCustomWebpackConfig';
import mergeConfigs from './mergeConfigs';
import webpackConfigDefault from './config/webpack.config.default';

function informAboutCustomConfig(defaultConfigName) {
  if (!defaultConfigName) {
    logger.info('=> Using default webpack setup.');
    return;
  }

  logger.info(`=> Using default webpack setup based on "${defaultConfigName}".`);
}

async function createDefaultConfig(config, options) {
  const { presets } = options;

  const defaultConfig = await presets.apply('webpackDefault', webpackConfigDefault, options);

  return mergeConfigs(config, defaultConfig);
}

export async function webpack(config, options) {
  const { configDir, configType, defaultConfigName } = options;

  const defaultConfig = await createDefaultConfig(config, options);

  // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.
  const customConfig = loadCustomWebpackConfig(configDir, options);

  if (customConfig === null) {
    informAboutCustomConfig(defaultConfigName);
    return defaultConfig;
  }

  if (typeof customConfig === 'function') {
    logger.info('=> Loading custom webpack config (full-control mode).');
    return customConfig(config, configType, defaultConfig);
  }

  logger.info('=> Loading custom webpack config (extending mode).');

  return mergeConfigs(config, customConfig);
}
