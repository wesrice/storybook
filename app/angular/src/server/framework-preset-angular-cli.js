import { logger } from '@storybook/node-logger';
import { loadAngularCliComponents } from './angular-cli_loader';
import { applyAngularCliWebpackConfig } from './angular-cli_webpack';
import { filterOutStylingRules } from './angular-cli_utils';

const angularCliComponents = loadAngularCliComponents(process.cwd());

export function webpack(config) {
  if (!angularCliComponents) {
    return config;
  }

  const { cliParts, cliConfig } = angularCliComponents;

  logger.info('=> Loading angular-cli config.');

  return applyAngularCliWebpackConfig(config, cliParts, cliConfig);
}

export function webpackDefault(config) {
  if (!angularCliComponents) {
    return config;
  }

  const defaultRulesWithoutStyles = filterOutStylingRules(config);

  return {
    ...config,
    module: {
      ...(config.module || {}),
      rules: defaultRulesWithoutStyles,
    },
  };
}
