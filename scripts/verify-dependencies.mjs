import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const sections = ['dependencies', 'devDependencies']
const missing = []

for (const section of sections) {
  for (const name of Object.keys(pkg[section] ?? {})) {
    const folder = join(root, 'node_modules', name)
    if (!existsSync(folder)) missing.push(name)
  }
}

if (missing.length) {
  console.error('Missing npm packages (run npm install):')
  for (const name of missing) console.error(`  - ${name}`)
  process.exit(1)
}

console.log('All package.json dependencies are present in node_modules.')
