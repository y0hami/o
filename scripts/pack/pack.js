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
  const packageDefaultExport = pkgJson.o?.exports?.default === true ?? false
  const packageMethods = pkgJson.o?.exports?.methods ?? []
  const packageTypes = pkgJson.o?.exports?.types ?? []

  fs.copyFileSync(LICENSE_PATH, path.resolve(PACKAGE_DIR, 'LICENSE'))

  const imports = []
  if (packageDefaultExport) {
    imports.push(plainName)
  }
  if (packageMethods.length > 0) {
    imports.push(`{ ${packageMethods.join(', ')} }`)
  }

  let usage = `
### Usage

\`\`\`typescript`

  imports
    .forEach(exp => {
      usage += `\nimport ${exp} from '${pkgName}'`
    })

  if (packageTypes.length > 0) {
    usage += `\nimport type { ${packageTypes.join(', ')} } from '${pkgName}'`
  }

  usage += '\n```'

  const includeUsage = pkgJson.o?.readme?.usage !== false
  const README = fs.readFileSync(README_TEMPLATE)
    .toString()
    .replaceAll('{usage}', includeUsage ? usage : '')
    .replaceAll('{package}', pkgName)
    .replaceAll('{name}', plainName)

  fs.writeFileSync(path.resolve(PACKAGE_DIR, 'README.md'), README)
})
