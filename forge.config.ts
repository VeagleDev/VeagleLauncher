import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    icon: '/src/assets/app/icon.png',
    executableName: 'Griff',
    win32metadata: {
        CompanyName: 'Veagle',
        FileDescription: 'Griff Launcher est un launcheur à bibliothèques privées par Veagle',
        OriginalFilename: 'Griff',
        ProductName: 'Griff Launcher',
        InternalName: 'Griff',
    },
    asar: false,
    appVersion: '1.1',
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      mainConfig,

      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
      devServer: {
        compress: true,
      },

      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/static/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
