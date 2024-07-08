import react from '@vitejs/plugin-react-swc';
import dayjs from 'dayjs';
import { get } from 'lodash-es';
import { visualizer } from 'rollup-plugin-visualizer';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { ConfigEnv, defineConfig, loadConfigFromFile, PluginOption, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgrPlugin from 'vite-plugin-svgr';

/* ============================== split =============================== */

const IS_BUILD = process.env.NODE_ENV === 'production';
const IS_ANALYSE = process.env.ANALYSE === 'true';

/* ============================== split =============================== */

const SvgMap: {
  [key: string]: string;
} = {};
const getUuid = (() => {
  let count = 1;
  return (prefix: string) => {
    return `${prefix}-${count++}`;
  };
})();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build',
    manifest: IS_BUILD,
    sourcemap: IS_ANALYSE,
    rollupOptions: {
      output: {
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'static/js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'static/js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: (chunkInfo) => {
          let isCss = !!chunkInfo.name ? /\.css$/.test(chunkInfo.name) : false;
          let ret = isCss ? 'static/css/[ext]/[name].[hash].[ext]' : 'static/asset/[name].[hash].[ext]';
          return ret;
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: {
    modules: {},
  },

  resolve: {
    alias: {
      '@public': '/public',
      '@app': '/src/app',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@hooks': '/src/hooks',
      '@materias': '/src/materias',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@stores': '/src/stores',
      '@utils': '/src/utils',
    },
  },
  plugins: [
    react(),
    /* 检查ts */
    checker({ typescript: true, enableBuild: false }),
    svgrPlugin({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'prefixIds',
              params: {
                prefix: (_: any, info: any) => {
                  let path: string = info.path;
                  let prefix: string = SvgMap[path];
                  if (!prefix) {
                    prefix = getUuid('svg-id');
                    SvgMap[path] = prefix;
                  }
                  return prefix;
                },
              },
            },
          ],
        },
      },
      include: '**/*.svg?react',
    }),
    createHtmlPlugin({
      template: 'public/index.html',
      // entry: "/src/index.tsx",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
      },
      inject: {
        data: {
          ...{
            CI_BUILD_NUMBER: get(process.env, 'CI_BUILD_NUMBER', 0),
            GIT_BRANCH: get(process.env, 'GIT_BRANCH', 0),
            GIT_COMMIT_SHORT: get(process.env, 'GIT_COMMIT_SHORT'),
            IS_PREVIEW: get(process.env, 'IS_PREVIEW', false),
          },
          BUILD_TIME: `${dayjs().format('YYYY-MM-DD H:mm:ss')}`,
          BUILD_TIME_STAMP: `${dayjs().valueOf()}`,
        },
      },
    }),
    /* 此插件只在生产环境适用 开发环境拿不到所有bundle */
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: /.woff2/,
          attributes: {
            type: 'font/woff2',
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
        {
          outputMatch: /preload.*?\.ttf/,
          attributes: {
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
      ],
    }),
    ...(IS_ANALYSE
      ? [
          visualizer({
            filename: 'report-rollup-plugin-visualizer.html',
            brotliSize: true,
            emitFile: true,
            // template: 'sunburst',
            template: 'treemap',
            sourcemap: true,
          }),
        ]
      : []),
  ] as PluginOption[],
});
