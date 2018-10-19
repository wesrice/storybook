import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { filterOutStylingRules } from './angular-cli_utils';

export function applyAngularCliWebpackConfig(baseConfig, cliParts, cliConfig) {
  const { cliCommonConfig, cliStyleConfig } = cliParts;

  // Don't use storybooks styling rules because we have to use rules created by @angular-devkit/build-angular
  // because @angular-devkit/build-angular created rules have include/exclude for global style files.
  const rulesExcludingStyles = filterOutStylingRules(baseConfig);

  // cliStyleConfig.entry adds global style files to the webpack context
  const entry = {
    ...baseConfig.entry,
    iframe: []
      .concat(baseConfig.entry.iframe)
      .concat(Object.values(cliStyleConfig.entry).reduce((acc, item) => acc.concat(item), [])),
  };

  const module = {
    ...baseConfig.module,
    rules: [...cliStyleConfig.module.rules, ...rulesExcludingStyles],
  };

  // We use cliCommonConfig plugins to serve static assets files.
  const plugins = [...cliStyleConfig.plugins, ...cliCommonConfig.plugins, ...baseConfig.plugins];

  const resolve = {
    ...baseConfig.resolve,
    modules: Array.from(
      new Set([...baseConfig.resolve.modules, ...cliCommonConfig.resolve.modules])
    ),
    plugins: [
      new TsconfigPathsPlugin({
        configFile: cliConfig.buildOptions.tsConfig,
      }),
    ],
  };

  return {
    ...baseConfig,
    entry,
    module,
    plugins,
    resolve,
    resolveLoader: cliCommonConfig.resolveLoader,
  };
}
