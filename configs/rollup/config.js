import path from 'node:path'
import fs from 'node:fs'
import typescript from 'rollup-plugin-typescript2'
import esbuild from 'rollup-plugin-esbuild'

const tsconfigPath = path.resolve(__dirname, '../tsconfigs/tsconfig.build.json')
const workspaceDir = path.resolve(__dirname, '../../packages')
const packageDirs = require('../../scripts/resolve')

const globals = {
  'dot-prop': 'dotProp'
}

packageDirs.forEach(dir => {
  globals[`o.${dir}`] = `o_${dir}`
})

const external = [
  'dot-prop',
  ...packageDirs.map(dir => `o.${dir}`)
]

const bundles = packageDirs.map(directory => {
  const pkgPath = path.resolve(workspaceDir, directory)
  const pkgJsonPath = path.resolve(pkgPath, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString())

  const inputPath = path.resolve(pkgPath, 'src/index.ts')
  const outputPath = path.resolve(pkgPath, 'dist')
  const banner = `/* ${pkgJson.name} - v${pkgJson.version}\n *\n * Released under MIT license\n * https://github.com/hammy2899/o\n */\n`
  const name = pkgJson.name

  const baseOutput = {
    exports: 'named',
    sourcemap: true,
    name
  }

  return [
    {
      plugins: [
        typescript({
          tsconfig: tsconfigPath,
          tsconfigOverride: {
            include: [path.resolve(pkgPath, 'src')]
          }
        }),
        esbuild({
          tsconfig: tsconfigPath,
          banner
        })
      ],
      input: inputPath,
      output: [
        { ...baseOutput, file: path.resolve(outputPath, 'index.js'), format: 'umd', globals },
        { ...baseOutput, file: path.resolve(outputPath, 'index.cjs'), format: 'cjs', globals },
        { ...baseOutput, file: path.resolve(outputPath, 'index.mjs'), format: 'es', globals }
      ],
      external
    },
    {
      plugins: [
        typescript({
          tsconfig: tsconfigPath,
          tsconfigOverride: {
            include: [path.resolve(pkgPath, 'src')]
          }
        }),
        esbuild({
          tsconfig: tsconfigPath,
          banner,
          minify: true
        })
      ],
      input: inputPath,
      output: [
        { ...baseOutput, file: path.resolve(outputPath, 'index.min.js'), format: 'umd', globals }
      ],
      external
    }
  ]
})

export default bundles.reduce((accum, current) => {
  return [...accum, ...current]
})
