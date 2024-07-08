export default {
  singleQuote: true, // 使用单引号
  quoteProps: 'consistent', // 对象属性名引号保持一致
  trailingComma: 'all', // 多行对象或数组的最后一个元素后面加上逗号
  semi: true, // 在语句末尾加上分号
  printWidth: 120, // 每行最大字符数
  proseWrap: 'never', // 不对 Markdown 文件中的文字进行换行处理
  endOfLine: 'lf', // 使用 LF 作为换行符

  // 针对特定文件类型的特殊配置
  overrides: [
    {
      // 针对只被 JSON5 工具使用的 JSON 文件的特殊配置
      files: ['*/tsconfig.json', '.vscode/*.json'],
      options: {
        parser: 'json5', // 使用 json5 解析器
        tabWidth: 2, // 缩进级别使用 2 个空格
        quoteProps: 'preserve', // 保留属性名的引号
        singleQuote: false,
      },
    },
    {
      // 针对所有 JSON 文件的配置
      files: '*.json',
      options: {
        tabWidth: 2, // 缩进级别使用 2 个空格
        quoteProps: 'preserve', // 保留属性名的引号
        singleQuote: false,
      },
    },
    {
      // 针对 YAML 文件的配置，使用 2 个空格缩进，不使用 tab
      files: ['*.yaml', '*.yml'],
      options: {
        tabWidth: 2, // 缩进级别使用 2 个空格
        useTabs: false, // 不使用 tab 缩进
        quoteProps: 'preserve', // 保留属性名的引号
      },
    },
  ],

  // 导入顺序配置
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js 内置模块
    '^react$', // react 库
    '^react', // 其他 react 相关的库
    'classnames', // classnames 库
    '<THIRD_PARTY_MODULES>', // 其他第三方模块
    '^@public/(.*)$', // @public 路径下的模块
    '^@/constants/(.*)$', // @/constants 路径下的模块
    '^@utils/(.*)$', // @utils 路径下的模块
    '^@services/(.*)$', // @services 路径下的模块
    '^@fullstrack/(.*)$', // @app 路径下的模块
    '^@stores/(.*)$', // @stores 路径下的模块
    '^@hooks/(.*)$', // @hooks 路径下的模块
    '^@components/(.*)$', // @components 路径下的模块
    '^@materias/(.*)$', // @materias 路径下的模块
    '^@pages/(.*)$', // @pages 路径下的模块
    '^[./]', // 相对路径
    'css$', // CSS 文件
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'], // 导入顺序插件的解析器插件
  importOrderTypeScriptVersion: '5.5.3',

  //tailwind 配置
  tailwindConfig: './apps/web/tailwind.config.js',
  tailwindFunctions: ['cls'],

  // 使用的 prettier 插件
  plugins: [
    '@ianvs/prettier-plugin-sort-imports', // 用于排序导入的插件
    'prettier-plugin-packagejson', // 用于格式化 package.json 的插件
    'prettier-plugin-css-order', // 用于排序 CSS 规则的插件
    'prettier-plugin-tailwindcss', // 用于格式化 Tailwind CSS 的插件
  ],
};
