module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  globals: {
    // 定义 vue 自动引入的全局变量，防止报错
    // defineProps: true,
    // defineEmits: true,
    // ref: true,
    // reactive: true,
    // onMounted: true
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { // ecma 特性，比如支持 jsx
      jsx: true
    },
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // vue
    'vue/html-self-closing': 'off',
    'vue/html-indent': ['off', 2],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-quotes': ['error', 'double'],
    'vue/multi-word-component-names': ['off'],
    'vue/first-attribute-linebreak': 0,
    'vue/html-closing-bracket-newline': 0, //  结尾标签必须换行
    'vue/max-attributes-per-line': 0, // 每行最多多少个属性
    'vue/attribute-hyphenation': 0, // 使用 - 分割去代替标签中大写的属性
    'vue/no-multiple-template-root': 0,
    // js
    indent: ['warn', 2], // 2 行缩进，防止与默认格式化功能冲突，关闭
    semi: ['error', 'never'], // 禁止使用分号
    'no-unused-vars': 1,
    'no-else-return': 'error', // 如果 if 语句里面有 return ,后面不能跟 else 语句，减少括号
    'space-infix-ops': ['error', { int32Hint: false }], // 要求操作符周围有空格
    'no-multiple-empty-lines': ['error', { max: 2 }], // 空行最多不能超过2行
    'no-whitespace-before-property': 'error', // 禁止在属性前使用空格
    'space-before-blocks': 'error', // 在块之前强制保持一致的间距
    'no-trailing-spaces': 'error', // 一行结束后面不要有空格
    'space-in-parens': ['error', 'never'], // 强制括号左右的不加空格
    'spaced-comment': ['error', 'always'], // 注释间隔
    'template-tag-spacing': ['error', 'always'], // 在模板标签及其文字之间需要空格
    'no-var': 'error', // 禁止使用 var
    'no-console': 'warn', // 使用 console 警告
    'no-debugger': 'warn', // 使用 debugger 会警告
    'prefer-destructuring': [
      'error',
      {
        // 优先使用数组和对象解构
        array: false,
        object: false
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    // 组件名称为多个单词，忽略的组件名称
    'comma-dangle': ['off', 'never'], // 最后一个属性不允许有逗号
    'arrow-spacing': 'error', // 箭头函数空格
    'template-curly-spacing': 'error',
    'quote-props': ['error', 'as-needed'], // 对象字面量属性名称使用引号
    'object-curly-spacing': ['error', 'always'], // 强制在花括号中使用一致的空格
    'no-unneeded-ternary': 'error', // 禁止可以表达为更简单结构的三元操作符
    // 禁止 with/in 语句
    'no-restricted-syntax': [
      'error',
      'WithStatement',
      'BinaryExpression[operator="in"]'
    ],
    'no-lonely-if': 'error', // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'newline-per-chained-call': ['off', { ignoreChainWithDepth: 2 }], // 要求方法链中每个调用都有一个换行符
    // 路径别名设置
    'space-before-function-paren': 0,
    'eol-last': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'no-irregular-whitespace': 2,
    // ts
    'no-undef': 0, // 交给 TS 处理未命名的变量
    '@typescript-eslint/no-explicit-any': 1, // 使用 any 时警告
  }
}
