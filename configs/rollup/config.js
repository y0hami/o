import path from 'node:path'
import fs from 'node:fs'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-ts'
import license from 'rollup-plugin-license'

const ROOT_DIR = path.resolve(__dirname, '../../')

const tsconfigPath = path.join(ROOT_DIR, 'configs/tsconfigs/tsconfig.build.json')
const workspaceDir = path.join(ROOT_DIR, 'packages')
const packageDirs = require('../../scripts/resolve')

const external = ['dot-prop']

const bundles = packageDirs.map(directory => {
  const pkgPath = path.resolve(workspaceDir, directory)
  const pkgJsonPath = path.resolve(pkgPath, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString())

  const inputPath = path.resolve(pkgPath, 'src/index.ts')
  const outputPath = path.resolve(pkgPath, 'dist')
  // const banner = `/* ${pkgJson.name} - v${pkgJson.version}\n *\n * Released under MIT license\n * https://github.com/hammy2899/o\n */\n`
  const name = pkgJson.name

  const base = {
    input: inputPath,
    external,
    onwarn: (warning, warn) => {
      if (warning.code === 'FILE_NAME_CONFLICT' && warning.message.includes('index.d.ts')) return
      warn(warning)
    }
  }

  const baseOutput = {
    exports: 'named',
    sourcemap: true,
    name,
    globals: {
      'dot-prop': 'dotProp'
    }
  }

  const LICENSE_OPTIONS = {
    cwd: pkgPath,
    banner: {
      commentStyle: 'regular',
      content: {
        file: path.join(ROOT_DIR, 'configs/rollup/license_banner.txt')
      }
    }
  }

  return [
    {
      ...base,
      plugins: [
        nodeResolve(),
        esbuild({
          tsconfig: tsconfigPath
        }),
        license(LICENSE_OPTIONS)
      ],
      output: [
        { ...baseOutput, file: path.resolve(outputPath, 'index.js'), format: 'umd' },
        { ...baseOutput, file: path.resolve(outputPath, 'index.cjs'), format: 'cjs' },
        { ...baseOutput, file: path.resolve(outputPath, 'index.mjs'), format: 'es' }
      ]
    },
    {
      ...base,
      plugins: [
        nodeResolve(),
        esbuild({
          tsconfig: tsconfigPath,
          minify: true
        }),
        license(LICENSE_OPTIONS)
      ],
      output: [
        { ...baseOutput, file: path.resolve(outputPath, 'index.min.js'), format: 'umd' }
      ]
    },
    {
      ...base,
      output: {
        ...baseOutput,
        file: path.resolve(outputPath, 'index.d.ts'),
        format: 'es'
      },
      plugins: [
        ts({
          tsconfig: {
            fileName: tsconfigPath,
            hook: config => ({
              ...config,
              declaration: true,
              emitDeclarationOnly: true
            })
          }
        })
      ]
    }
  ]
})

export default bundles.reduce((accum, current) => {
  return [...accum, ...current]
})
