import type {Configuration} from 'webpack';

import {rules} from './webpack.rules';

export const mainConfig: Configuration = {
  entry: './src/main.ts',
  mode: 'production',
  target: 'electron-main',
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.csv', '.png', '.jpg', '.txt', 'mp4'],
  },
};
