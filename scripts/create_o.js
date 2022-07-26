const path = require('node:path')
const fs = require('node:fs')
const packages = require('./resolve')

const ROOT_DIR = path.resolve(__dirname, '../')

const oExports = []
const exportedTypes = []

packages.forEach(dir => {
  const pkgJson = fs.readFileSync(path.resolve(ROOT_DIR, 'packages', dir, 'package.json')).toString()
  const pkg = JSON.parse(pkgJson)

  if (pkg.o?.global !== false) {
    const pkgExports = pkg.o?.exports ?? {}
    const name = pkg.o?.name ?? pkg.name.replace('o.', '')
    const types = (pkgExports.types ?? []).filter(type => !exportedTypes.includes(type))

    if (pkgExports.default === true && (pkgExports.methods === undefined || pkgExports.methods.length === 0)) {
      oExports.push({
        package: pkg,
        directory: dir,
        exports: [`default as ${name}`],
        types
      })
    } else {
      oExports.push({
        package: pkg,
        directory: dir,
        exports: pkgExports.methods,
        types
      })
    }

    exportedTypes.push(...types)
  }
})

const fileLines = []

oExports.forEach(exp => {
  fileLines.push(`// ${exp.package.name}`)
  fileLines.push(`export { ${exp.exports.join(', ')} } from '../../${exp.directory}/src'`)
  if (exp.types.length > 0) {
    fileLines.push(`export type { ${exp.types.join(', ')} } from '../../${exp.directory}/src'`)
  }
  fileLines.push('')
})

fs.writeFileSync(path.resolve(ROOT_DIR, 'packages', 'o', 'src', 'index.ts'), fileLines.join('\n'))
