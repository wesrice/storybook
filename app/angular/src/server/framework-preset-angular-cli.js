import { logger } from '@storybook/node-logger';
import { filterOutStylingRules } from './angular-cli_utils';

import {
  getAngularCliWebpackConfigOptions,
  applyAngularCliWebpackConfig,
} from './angular-cli_config';

const cwd = process.cwd();
const cliWebpackConfigOptions = getAngularCliWebpackConfigOptions(cwd);

export function webpack(config) {
  if (!cliWebpackConfigOptions) {
    return config;
  }

  logger.info('=> Loading angular-cli config.');
  return applyAngularCliWebpackConfig(config, cliWebpackConfigOptions);
}

export function webpackDefault(config) {
  if (!cliWebpackConfigOptions) {
    return config;
  }

  const defaultRulesWithoutCss = filterOutStylingRules(config);

  return {
    ...config,
    module: {
      ...config.module,
      rules: defaultRulesWithoutCss,
    },
  };
}
