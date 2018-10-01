export default {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
      },
    ],
  ],
  plugins: [
    [require.resolve('babel-plugin-emotion'), { sourceMap: true, autoLabel: true }],
    require.resolve('babel-plugin-macros'),
    require.resolve('@babel/plugin-transform-regenerator'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),

    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: true,
        regenerator: true,
      },
    ],
  ],
};
