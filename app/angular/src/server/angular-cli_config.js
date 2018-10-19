import path from 'path';
import fs from 'fs';
import { normalizeAssetPatterns } from './angular-cli_utils';

function getTsConfigOptions(tsConfigPath) {
  const basicOptions = {
    options: {},
    raw: {},
    fileNames: [],
    errors: [],
  };

  if (!fs.existsSync(tsConfigPath)) {
    return basicOptions;
  }

  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  const { baseUrl } = tsConfig.compilerOptions || {};

  if (baseUrl) {
    const tsConfigDirName = path.dirname(tsConfigPath);
    basicOptions.options.baseUrl = path.resolve(tsConfigDirName, baseUrl);
  }

  return basicOptions;
}

export function getAngularCliConfig(dirToSearch) {
  const fname = path.join(dirToSearch, 'angular.json');

  if (!fs.existsSync(fname)) {
    return null;
  }

  const angularJson = JSON.parse(fs.readFileSync(fname, 'utf8'));
  const { projects, defaultProject } = angularJson;

  if (!projects || !Object.keys(projects).length) {
    throw new Error('angular.json must have projects entry.');
  }

  let project = projects[Object.keys(projects)[0]];

  if (defaultProject) {
    project = projects[defaultProject];
  }

  const { options: projectOptions } = project.architect.build;

  const normalizedAssets = normalizeAssetPatterns(
    projectOptions.assets,
    dirToSearch,
    project.sourceRoot
  );

  const projectRoot = path.resolve(dirToSearch, project.root);
  const tsConfigPath = path.resolve(dirToSearch, projectOptions.tsConfig);
  const tsConfig = getTsConfigOptions(tsConfigPath);

  return {
    root: dirToSearch,
    projectRoot,
    tsConfigPath,
    tsConfig,
    supportES2015: false,
    buildOptions: {
      ...projectOptions,
      assets: normalizedAssets,
    },
  };
}
