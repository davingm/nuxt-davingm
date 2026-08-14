#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

p.intro('Davingm Nuxt Starter')

const projectName = await p.text({
  message: 'Nama project?',
  placeholder: 'my-project',
  defaultValue: 'my-project',
  validate(value) {
    if (!value) {
      return 'Nama project tidak boleh kosong.'
    }

    if (!/^[a-z0-9][a-z0-9-_]*$/.test(value)) {
      return 'Gunakan huruf kecil, angka, "-", atau "_".'
    }
  }
})

if (p.isCancel(projectName)) {
  p.cancel('Dibatalkan.')
  process.exit(0)
}

const templatesPath = path.resolve(__dirname, '../templates')

const presets = fs.readdirSync(templatesPath, {
  withFileTypes: true
})
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

const preset = await p.select({
  message: 'Pilih preset:',
  options: presets.map(name => ({
    value: name,
    label: name
  }))
})

if (p.isCancel(preset)) {
  p.cancel('Dibatalkan.')
  process.exit(0)
}

const templatePath = path.resolve(
  __dirname,
  `../templates/${preset}`
)

const targetPath = path.resolve(
  process.cwd(),
  projectName
)

if (fs.existsSync(targetPath)) {
  p.cancel(`Folder "${projectName}" sudah ada.`)
  process.exit(1)
}

const spinner = p.spinner()

spinner.start('Membuat project...')

fs.cpSync(templatePath, targetPath, {
  recursive: true,
  filter: (source) => {
    const name = path.basename(source)

    return name !== 'node_modules' && name !== '.nuxt'
  }
})

spinner.stop('Template berhasil disalin.')

const userAgent = process.env.npm_config_user_agent ?? ''

let packageManager = 'npm'

if (userAgent.startsWith('pnpm')) {
  packageManager = 'pnpm'
} else if (userAgent.startsWith('yarn')) {
  packageManager = 'yarn'
} else if (userAgent.startsWith('bun')) {
  packageManager = 'bun'
}

spinner.start(
  `Menginstall dependencies menggunakan ${packageManager}...`
)

try {
  execSync(`${packageManager} install`, {
    cwd: targetPath,
    stdio: 'inherit'
  })

  spinner.stop('Dependencies berhasil diinstall.')
} catch {
  spinner.stop('Gagal menginstall dependencies.')
  process.exit(1)
}

p.outro(`Project ${projectName} berhasil dibuat!`)