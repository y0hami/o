const path = require('node:path')
const fs = require('fs')

const WORKSPACE_DIR = path.resolve(__dirname, '../../packages')
const LICENSE_PATH = path.resolve(__dirname, '../../LICENSE')
const README_TEMPLATE = path.resolve(__dirname, './README.template.md')
const packages = require('../resolve')

packages.forEach(pkg => {
  const PACKAGE_DIR = path.resolve(WORKSPACE_DIR, pkg)
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(PACKAGE_DIR, 'package.json')))
  const pkgName = pkgJson.name
  const plainName = pkgJson.o?.name ?? pkgName.replace('o.', '')
  const packageExports = pkgJson.o?.exports !== undefined
    ? [`{ ${pkgJson.o?.exports.join(', ')} }`, `* as ${plainName}`]
    : [plainName]

  if (pkgJson.o?.default === true) {
    packageExports.push(plainName)
  }

  fs.copyFileSync(LICENSE_PATH, path.resolve(PACKAGE_DIR, 'LICENSE'))

  const usage = `
  ${packageExports
    .map(exp => `import ${exp} from '${pkgName}'`)
    .join('\n')}
  `.trim()

  const README = fs.readFileSync(README_TEMPLATE)
    .toString()
    .replaceAll('{usage}', usage)
    .replaceAll('{package}', pkgName)
    .replaceAll('{name}', plainName)

  fs.writeFileSync(path.resolve(PACKAGE_DIR, 'README.md'), README)
})
