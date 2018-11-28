import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/o.js',
    format: 'umd',
    sourceMap: 'inline',
    name: 'o',
  },
  plugins: [
    babel(),
  ],
};
