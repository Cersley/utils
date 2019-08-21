const boxmodel = [
  'display',
  'flex',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex-flow',
  'flex-direction',
  'flex-wrap',
  'justify-content',
  'align-content',
  'align-items',
  'align-self',
  'order',
  'float',
  'clear',
  'box-sizing',
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
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
  'overflow',
  'overflow-x',
  'overflow-y',
];

const positioning = [
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
];

const visual = [
  'list-style',
  'list-style-position',
  'list-style-type',
  'list-style-image',
  'table-layout',
  'empty-cells',
  'caption-side',
  'background',
  'background-color',
  'background-image',
  'background-repeat',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-size',
  'background-clip',
  'background-origin',
  'background-attachment',
  'background-blend-mode',
  'box-decoration-break',
  'border',
  'border-width',
  'border-style',
  'border-color',
  'border-top',
  'border-top-width',
  'border-top-style',
  'border-top-color',
  'border-right',
  'border-right-width',
  'border-right-style',
  'border-right-color',
  'border-bottom',
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color',
  'border-left',
  'border-left-width',
  'border-left-style',
  'border-left-color',
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-image',
  'border-image-source',
  'border-image-slice',
  'border-image-width',
  'border-image-outset',
  'border-image-repeat',
  'border-collapse',
  'border-spacing',
  'outline',
  'outline-width',
  'outline-style',
  'outline-color',
  'outline-offset',
  'box-shadow',
  'transform',
  'transform-origin',
  'transform-style',
  'backface-visibility',
  'perspective',
  'perspective-origin',
  'visibility',
  'cursor',
  'opacity',
  'filter',
  'backdrop-filter',
];

const typography = [
  'color',
  'font',
  'font-weight',
  'font-size',
  'font-family',
  'font-style',
  'font-variant',
  'font-size-adjust',
  'font-stretch',
  'font-effect',
  'font-emphasize',
  'font-emphasize-position',
  'font-emphasize-style',
  'font-smooth',
  'line-height',
  'direction',
  'letter-spacing',
  'white-space',
  'text-align',
  'text-align-last',
  'text-transform',
  'text-decoration',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-style',
  'text-emphasis-position',
  'text-indent',
  'text-justify',
  'text-outline',
  'text-wrap',
  'text-overflow',
  'text-overflow-ellipsis',
  'text-overflow-mode',
  'text-orientation',
  'text-shadow',
  'vertical-align',
  'word-wrap',
  'word-break',
  'word-spacing',
  'overflow-wrap',
  'tab-size',
  'hyphens',
  'unicode-bidi',
  'columns',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'src',
];

const animation = [
  'transition',
  'transition-delay',
  'transition-timing-function',
  'transition-duration',
  'transition-property',
  'animation',
  'animation-name',
  'animation-duration',
  'animation-play-state',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
];

const misc = [
  'appearance',
  'clip',
  'clip-path',
  'counter-reset',
  'counter-increment',
  'resize',
  'user-select',
  'nav-index',
  'nav-up',
  'nav-right',
  'nav-down',
  'nav-left',
  'pointer-events',
  'quotes',
  'touch-action',
  'will-change',
  'zoom',
  'fill',
  'fill-rule',
  'clip-rule',
  'stroke',
];

const rational = [
  ...boxmodel,
  {
    emptyLineBefore: 'always',
    properties: positioning,
  },
  {
    emptyLineBefore: 'always',
    properties: visual,
  },
  {
    emptyLineBefore: 'always',
    properties: typography,
  },
  {
    emptyLineBefore: 'always',
    properties: animation,
  },
  {
    emptyLineBefore: 'always',
    properties: misc,
  },
];

module.exports = {
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-order': rational,

    /**
     * Rule
     */
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],

    /**
     * Color
     */
    'color-no-invalid-hex': true,
    'color-named': 'never',
    // 'color-no-hex': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',

    /**
     * Font-family
     */
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'font-family-name-quotes': 'always-unless-keyword',
    // 'font-weight-notation': 'named-where-possible', /* disabled */

    /**
     * Function (calc, linear-gradient)
     */
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    // 'function-blacklist': [],
    'function-url-no-scheme-relative': true,
    // 'function-url-scheme-blacklist': [],
    // 'function-url-scheme-whitelist': [],
    // 'function-whitelist': [],
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-newline-before': 'never-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    /**
     * String
     */
    'string-no-newline': true,
    'string-quotes': 'single',

    /**
     * Number
     */
    'number-max-precision': 4,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,

    /**
     * Unit (px, em, rem, ...)
     */
    'unit-no-unknown': true,
    // 'unit-blacklist': [],
    // 'unit-whitelist': [],
    'unit-case': 'lower',

    /**
     * Property
     */
    'property-no-unknown': true,
    // 'property-blacklist': [],
    'property-no-vendor-prefix': true,
    // 'property-whitelist': [],
    'property-case': 'lower',

    /**
     * Keyframes
     */
    'keyframe-declaration-no-important': true,
    // 'keyframes-name-pattern': '',

    /**
     * Declaration block
     */
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-single-line-max-declarations': 0,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',

    /**
     * Block
     */
    'block-no-empty': true,
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-after': 'always-single-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-newline-before': 'never-single-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always-single-line',

    /**
     * Selector
     */
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    // 'selector-attribute-operator-blacklist': [],
    // 'selector-attribute-operator-whitelist': [],
    // 'selector-class-pattern': '',
    // 'selector-combinator-blacklist': [],
    // 'selector-combinator-whitelist': [],
    // 'selector-id-pattern': '',
    // 'selector-max-attribute': '',
    // 'selector-max-class': 3,
    // 'selector-max-combinators': 2,
    // 'selector-max-compound-selectors': 3,
    'selector-max-empty-lines': 0,
    // 'selector-max-id': 2,
    // 'selector-max-pseudo-class': 1,
    // 'selector-max-specificity': '',
    // 'selector-max-type': 2,
    // 'selector-max-universal': 2,
    // 'selector-nested-pattern': '',
    // 'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    // 'selector-pseudo-class-blacklist': [],
    // 'selector-pseudo-class-whitelist': [],
    // 'selector-pseudo-element-blacklist': [],
    // 'selector-pseudo-element-whitelist': [],
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'never',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-type-case': 'lower',
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never',

    /**
     * Media feature
     */
    'media-feature-name-no-unknown': true,
    // 'media-feature-name-blacklist': [],
    'media-feature-name-no-vendor-prefix': true,
    // 'media-feature-name-value-whitelist': [],
    // 'media-feature-name-whitelist': [],
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': 'never-multi-line',
    'media-query-list-comma-space-after': 'always',
    'media-query-list-comma-space-before': 'never',

    /**
     * Custom media
     */
    // 'custom-media-pattern': '',

    /**
     * At-rule (@media, @keyframes, ...)
     */
    'at-rule-no-unknown': null,
    // 'at-rule-blacklist': [],
    'at-rule-no-vendor-prefix': true,
    // 'at-rule-whitelist': [],
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'after-same-name',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
          'first-nested',
        ],
        ignore: ['after-comment', 'blockless-after-blockless'],
        ignoreAtRules: ['else'],
      },
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',

    /**
     * Comment
     */
    'comment-no-empty': true,
    // 'comment-word-blacklist': [],
    'comment-empty-line-before': 'never',
    'comment-whitespace-inside': 'always',

    /**
     * General / Sheet
     */
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'max-nesting-depth': 3,
    'no-unknown-animations': true,
    indentation: 2,
    // 'linebreaks': 'unix',
    'max-empty-lines': 2,
    'max-line-length': 100,
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines'],
      },
    ],
    'no-missing-end-of-source-newline': true,

    /**
     * Time
     */
    'time-min-milliseconds': 50,

    /**
     * Shorthand property
     */
    'shorthand-property-no-redundant-values': true,

    /**
     * Value
     */
    // 'value-no-vendor-prefix': [
    //   true,
    //   {
    //     ignoreProperties: [],
    //   }
    // ]
    'value-keyword-case': 'lower',
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-max-empty-lines': 0,

    /**
     * Custom property
     */
    // 'custom-property-pattern': '',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'after-custom-property', 'first-nested'],
      },
    ],

    /**
     * Declaration
     */
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': true,
    // 'declaration-property-unit-blacklist': {},
    // 'declaration-property-unit-whitelist': {},
    // 'declaration-property-value-blacklist': {},
    // 'declaration-property-value-whitelist': {},
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    // 'declaration-colon-newline-after': 'always-multi-line', /* disabled */
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    // 'declaration-empty-line-before': 'never', /* disabled */

    /**
     * Length
     */
    // 'length-zero-no-unit': true,
  },
};
