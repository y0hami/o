const path = require('node:path')
const fs = require('node:fs')

const WORKSPACE_DIR = path.resolve(__dirname, '../packages')

const skip = []
const packages = fs.readdirSync(WORKSPACE_DIR)
  .map(directory => {
    const pkgPath = path.resolve(WORKSPACE_DIR, directory, 'package.json')
    return JSON.parse(fs.readFileSync(pkgPath))
  })
  .filter(pkg => {
    if (pkg.o !== undefined && pkg.o.build === false) {
      skip.push(pkg.name)
      return false
    }
    return true
  })
  .map(pkg => ({
    name: pkg.name,
    directory: pkg.name.replace('o.', ''),
    dependencies: Object.keys(pkg.dependencies ?? {})
      .filter(dep => dep.startsWith('o.') && !skip.includes(dep))
  }))

packages.forEach(pkg => {
  pkg.dependencies.forEach((dep, index) => {
    const depIndex = packages.findIndex(pdep => pdep.name === dep)
    pkg.dependencies[index] = packages[depIndex]
  })
})

const graph = []
const walk = (pkg) => {
  if (pkg.dependencies.length !== 0) {
    pkg.dependencies.forEach(walk)
  }
  if (!graph.includes(pkg.directory)) graph.push(pkg.directory)
}
packages.forEach(walk)

module.exports = graph

if (process.argv.includes('--list')) {
  graph.forEach(dep => console.log(dep))
}
