import path from 'node:path'
import fs from 'node:fs'
import esbuild from 'rollup-plugin-esbuild'
import ts from 'rollup-plugin-ts'
import license from 'rollup-plugin-license'

const ROOT_DIR = path.resolve(__dirname, '../../')

const tsconfigPath = path.join(ROOT_DIR, 'configs/tsconfigs/tsconfig.build.json')
const workspaceDir = path.join(ROOT_DIR, 'packages')
const packageDirs = require('../../scripts/resolve')

const bundles = packageDirs.map(directory => {
  const pkgPath = path.resolve(workspaceDir, directory)
  const pkgJsonPath = path.resolve(pkgPath, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString())

  const inputPath = path.resolve(pkgPath, 'src/index.ts')
  const outputPath = path.resolve(pkgPath, 'dist')
  const name = pkgJson.name

  const base = {
    input: inputPath,
    onwarn: (warning, warn) => {
      if (warning.code === 'FILE_NAME_CONFLICT' && warning.message.includes('index.d.ts')) return
      warn(warning)
    },
    external: ['dot-notation-tokenizer']
  }

  const baseOutput = {
    exports: 'named',
    sourcemap: true,
    name,
    globals: {
      'dot-notation-tokenizer': 'dotNotationTokenizer'
    }
  }

  const LICENSE_OPTIONS = {
    banner: {
      commentStyle: 'regular',
      content: {
        file: path.join(ROOT_DIR, 'configs/rollup/license_banner.txt')
      },
      data: { pkg: pkgJson }
    }
  }

  return [
    {
      ...base,
      plugins: [
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
