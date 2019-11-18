// npm
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

// package.json
import pkg from './package.json'

const input = './src/index.ts'
const extensions = ['.js']
const plugins = [
  typescript({
    tsconfig: 'tsconfig.build.json'
  }),
  resolve({
    extensions
  }),
  commonjs(),
  babel({
    extensions,
    include: ['src/**/*']
  })
]
const banner = `/* o - v${pkg.version}\n *\n * Released under MIT license\n * https://github.com/hammy2899/o\n */\n`
const name = 'o'

export default [
  // standard umd
  {
    input,
    plugins,
    output: {
      file: 'dist/o.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      banner,
      name
    }
  },

  // minified
  {
    input,
    plugins: [
      ...plugins,
      terser({
        sourcemap: true
      })
    ],
    output: {
      file: 'dist/o.min.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      banner,
      name
    }
  },

  // esm
  {
    input,
    plugins,
    output: {
      file: 'dist/o.mjs',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      banner,
      name
    }
  }
]
