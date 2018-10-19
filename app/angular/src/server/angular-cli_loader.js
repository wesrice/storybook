import { logger } from '@storybook/node-logger';
import { getAngularCliParts, isBuildAngularInstalled } from './angular-cli_utils';
import { getAngularCliConfig } from './angular-cli_config';

export function loadAngularCliComponents(dir) {
  const cliConfig = getAngularCliConfig(dir);

  if (!cliConfig) {
    return false;
  }

  if (!isBuildAngularInstalled()) {
    logger.info('=> Using base config because @angular-devkit/build-angular is not installed.');
    return false;
  }

  const cliParts = getAngularCliParts(cliConfig);

  if (!cliParts) {
    logger.warn('=> Failed to get angular-cli webpack config.');
    return false;
  }

  return {
    cliConfig,
    cliParts,
  };
}
