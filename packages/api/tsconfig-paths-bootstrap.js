const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const isProd = process.env.NODE_ENV === 'production';

const path = require('path');
const baseUrl = path.resolve(__dirname, isProd ? './dist/src' : './src'); // Either absolute or relative path. If relative it's resolved to current working directory.
// const baseUrl = './'; // Either absolute or relative path. If relative it's resolved to current working directory.
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
