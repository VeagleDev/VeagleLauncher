import type {Configuration} from 'webpack';

import {rules} from './webpack.rules';
import {plugins} from './webpack.plugins';


rules.push({
  test: /\.css$/,
  use: [
      "style-loader",
      "css-loader",
      "postcss-loader"
  ],
});

rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    }
)

rules.push({
  test: /\.(png|jpe?g|gif|mp4)$/i,
  use: [
    {
      loader: 'file-loader',
    },
  ],
},
)

rules.push({
  test: /.txt$/i,
  use: 'raw-loader',
},
)

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
