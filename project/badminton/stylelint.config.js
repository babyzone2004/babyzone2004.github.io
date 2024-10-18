module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    // 关闭page等不属于html范畴的标签校验
    'custom-property-pattern': null,
    'selector-type-no-unknown': null,
    'unit-no-unknown': null,
    // 禁止声明块的重复属性
    'declaration-block-no-duplicate-properties': true,
    // 关闭 standard 标准 对于变量名 kebab-case 的规则校验（因为与bem命名冲突）
    'selector-class-pattern': null,
    // 关闭 standard 标准 禁止在字体族名称列表中缺少通用字体族关键字
    'font-family-no-missing-generic-family-keyword': null,
    // 避免重复嵌套的类名
    'scss/selector-no-redundant-nesting-selector': true,
    // 指定字符串使用单引号或双引号 'single'
    'string-quotes': 'single',
    // 颜色指定大写
    // 'color-hex-case': 'upper',
    // 禁止空第一行
    'no-empty-first-line': true,
    // 禁止空块
    'block-no-empty': true,
    // 禁止小于 1 的小数有一个前导零
    // 'number-leading-zero': 'never',
    // 校验合法伪类选择器（忽略部分可能存在的伪类选择器）
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['/./', 'v-deep', '-webkit-']
      }
    ],
    // CSS 书写顺序校验：布局 =》显示=》盒模型=》文字=》背景（装饰）=》其他
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
};
