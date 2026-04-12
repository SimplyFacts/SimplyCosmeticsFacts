const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const fs = require('node:fs');
const { FileStore } = require('metro-cache');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.maxWorkers = 6;

const SHARED_ALIASES = {
  'expo-image': path.resolve(__dirname, './polyfills/shared/expo-image.tsx'),
};

const NATIVE_ALIASES = {
  './Libraries/Components/TextInput/TextInput': path.resolve(
    __dirname,
    './polyfills/native/texinput.native.jsx'
  ),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    if (
      context.originModulePath.startsWith(`${__dirname}/polyfills/native`) ||
      context.originModulePath.startsWith(`${__dirname}/polyfills/web`) ||
      context.originModulePath.startsWith(`${__dirname}/polyfills/shared`)
    ) {
      return context.resolveRequest(context, moduleName, platform);
    }
    if (moduleName.startsWith('@expo-google-fonts/') && moduleName !== '@expo-google-fonts/dev') {
      return context.resolveRequest(context, '@expo-google-fonts/dev', platform);
    }
    if (SHARED_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, SHARED_ALIASES[moduleName], platform);
    }
    if (NATIVE_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, NATIVE_ALIASES[moduleName], platform);
    }
    return context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    throw error;
  }
};

const cacheDir = path.join(__dirname, 'caches');

config.cacheStores = () => [
  new FileStore({
    root: path.join(cacheDir, '.metro-cache'),
  }),
];
config.resetCache = false;
config.fileMapCacheDirectory = cacheDir;

const originalGetTransformOptions = config.transformer.getTransformOptions;

config.transformer = {
  ...config.transformer,
  getTransformOptions: async (entryPoints, options) => {
    if (options.dev === false) {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      fs.mkdirSync(cacheDir);
    }
    return await originalGetTransformOptions(entryPoints, options);
  },
};

module.exports = config;
