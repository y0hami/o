// npm
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// package.json
import pkg from './package.json';

const extensions = ['.js', '.ts'];

export default {
  input: './src/index.ts',
  plugins: [
    resolve({
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      include: ['src/**/*'],
    }),
  ],
  output: {
    file: 'dist/o.js',
    format: 'umd',
    sourceMap: true,
    banner: `/* o - v${pkg.version}\n *\n * Released under MIT license\n * https://github.com/hammy2899/o\n */\n`,
    name: 'o',
  },
};
