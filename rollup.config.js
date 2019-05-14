// npm
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// package.json
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const name = 'o';

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
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.browser,
      format: 'iife',
      name,
      globals: {},
    },
  ],
};
