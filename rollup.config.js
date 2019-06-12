// npm
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// package.json
import pkg from './package.json';

const input = './src/index.ts';
const extensions = ['.js', '.ts'];
const plugins = [
  resolve({
    extensions,
  }),
  commonjs(),
  babel({
    extensions,
    include: ['src/**/*'],
  }),
];
const format = 'umd';
const banner = `/* o - v${pkg.version}\n *\n * Released under MIT license\n * https://github.com/hammy2899/o\n */\n`;
const name = 'o';

export default [
  {
    input,
    plugins,
    output: {
      file: 'dist/o.js',
      format,
      sourcemap: true,
      banner,
      name,
    },
  },
  {
    input,
    plugins: [
      ...plugins,
      terser({
        sourcemap: true,
      }),
    ],
    output: {
      file: 'dist/o.min.js',
      format,
      sourcemap: true,
      banner,
      name,
    },
  },
];
