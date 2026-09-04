#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { platform } from 'node:os'
import which from 'which'
import * as p from '@clack/prompts'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const banner = `
        .d\$b.
       i\$\$A\$\$L  .d\$b
     .\$\$F\` \`\$\$L.\$\$A\$\$.
    j\$\$'    \`4\$\$:\` \`\$\$.
   j\$\$'     .4\$:    \`\$\$.
  j\$\$\`     .\$\$:      \`4\$L
 :\$\$:____.d\$\$:  _____.:\$\$:
 \`4\$\$\$\$\$\$\$\$P\` .i\$\$\$\$\$\$\$\$P\`
`

console.log(pc.white(banner))

console.log(
  pc.bold(pc.white('  Davingm Nuxt Starter')) +
  pc.dim('  —  scaffold project baru dalam hitungan detik\n')
)

p.intro(pc.bgCyan(pc.black('create-davingm-nuxt')))


function exitCancelled() {
  p.cancel('Dibatalkan.')
  process.exit(0)
}

function formatPresetName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function commandExists(command) {
  try {
    which.sync(command)
    return true
  } catch {
    return false
  }
}

const templatesPath = path.resolve(__dirname, '../templates')

if (!fs.existsSync(templatesPath)) {
  p.cancel('Folder templates tidak ditemukan.')
  process.exit(1)
}

const presets = fs.readdirSync(templatesPath, {
  withFileTypes: true
})
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

if (presets.length === 0) {
  p.cancel('Tidak ada preset yang tersedia.')
  process.exit(1)
}


const preset = await p.select({
  message: 'Template mana yang ingin Anda gunakan?',
  options: presets.map(name => ({
    value: name,
    label: formatPresetName(name),
    hint: name === 'default'
      ? 'Davingm recommended starter'
      : undefined
  }))
})

if (p.isCancel(preset)) {
  exitCancelled()
}

const projectPath = await p.text({
  message: 'Di mana project ingin dibuat?',
  placeholder: './my-project',
  defaultValue: './my-project',
  validate(value) {
    if (!value) {
      return 'Lokasi project tidak boleh kosong.'
    }

    if (value.trim() === '.') {
      return 'Tidak dapat menggunakan folder saat ini.'
    }
  }
})

if (p.isCancel(projectPath)) {
  exitCancelled()
}

const targetPath = path.resolve(process.cwd(), projectPath)

const projectName = path.basename(targetPath)


if (!/^[a-z0-9][a-z0-9-_]*$/i.test(projectName)) {
  p.cancel(
    `Nama folder "${projectName}" tidak valid. Gunakan huruf, angka, "-", atau "_".`
  )

  process.exit(1)
}

if (targetPath === process.cwd()) {
  p.cancel('Project tidak dapat dibuat di folder saat ini.')
  process.exit(1)
}


if (fs.existsSync(targetPath)) {
  const entries = fs.readdirSync(targetPath)

  if (entries.length > 0) {
    const action = await p.select({
      message: `Folder "${projectPath}" sudah ada. Apa yang ingin dilakukan?`,
      options: [
        {
          value: 'replace',
          label: 'Replace',
          hint: 'Hapus isi folder dan buat project baru'
        },
        {
          value: 'cancel',
          label: 'Cancel',
          hint: 'Batalkan pembuatan project'
        }
      ]
    })

    if (p.isCancel(action) || action === 'cancel') {
      exitCancelled()
    }

    fs.rmSync(targetPath, {
      recursive: true,
      force: true
    })
  }
}

const packageManagers = [
  {
    value: 'pnpm',
    label: 'pnpm',
    available: commandExists('pnpm')
  },
  {
    value: 'npm',
    label: 'npm',
    available: commandExists('npm')
  },
  {
    value: 'yarn',
    label: 'Yarn',
    available: commandExists('yarn')
  },
  {
    value: 'bun',
    label: 'Bun',
    available: commandExists('bun')
  }
]

const availablePackageManagers = packageManagers.filter(
  manager => manager.available
)

if (availablePackageManagers.length === 0) {
  p.cancel('Tidak ditemukan package manager yang tersedia.')
  process.exit(1)
}

const packageManager = await p.select({
  message: 'Package manager mana yang ingin digunakan?',
  options: availablePackageManagers.map(manager => ({
    value: manager.value,
    label: manager.label
  }))
})

if (p.isCancel(packageManager)) {
  exitCancelled()
}

let initializeGit = false

if (commandExists('git')) {
  const gitChoice = await p.confirm({
    message: 'Initialize git repository?',
    initialValue: true
  })

  if (p.isCancel(gitChoice)) {
    exitCancelled()
  }

  initializeGit = gitChoice
} else {
  p.log.warn('Git tidak ditemukan. Repository Git akan dilewati.')
}

const templatePath = path.resolve(
  templatesPath,
  preset
)

p.log.step(
  `Creating project in ${pc.cyan(projectPath)}`
)

const spinner = p.spinner()

spinner.start(
  `Membuat project dengan template ${pc.cyan(formatPresetName(preset))}...`
)

try {
  fs.cpSync(templatePath, targetPath, {
    recursive: true,
    filter: source => {
      const name = path.basename(source)

      return (
        name !== 'node_modules' &&
        name !== '.nuxt' &&
        name !== '.output' &&
        name !== 'dist' &&
        name !== '.git'
      )
    }
  })

  spinner.stop(
    `Downloaded ${formatPresetName(preset)} template`
  )
} catch (error) {
  spinner.stop('Gagal membuat project.')

  p.log.error(error instanceof Error ? error.message : String(error))

  process.exit(1)
}

if (initializeGit) {
  spinner.start('Initializing git repository...')

  try {
    execSync('git init', {
      cwd: targetPath,
      stdio: 'ignore'
    })

    spinner.stop('Git repository initialized.')
  } catch {
    spinner.stop('Gagal menginisialisasi Git.')
  }
}

spinner.start(
  `Installing dependencies menggunakan ${packageManager}...`
)

try {
  execSync(`${packageManager} install`, {
    cwd: targetPath,
    stdio: 'inherit'
  })

  spinner.stop('Dependencies installed.')
} catch (error) {
  spinner.stop('Gagal menginstall dependencies.')

  p.log.error(
    `Silakan masuk ke project dan jalankan ${packageManager} install secara manual.`
  )

  process.exit(1)
}


function nextStepLine(text) {
  const width = 20

  return (
    pc.cyan('│') +
    `   › ${text}`.padEnd(width) +
    pc.cyan('│')
  )
}

console.log()

console.log(pc.cyan('╭── 👉 Next steps ───╮'))
console.log(pc.cyan('│') + '                    ' + pc.cyan('│'))
console.log(nextStepLine(`cd ${projectPath}`))
console.log(nextStepLine(`${packageManager} run dev`))
console.log(pc.cyan('│') + '                    ' + pc.cyan('│'))
console.log(pc.cyan('╰────────────────────╯'))

console.log()

console.log(
  pc.dim('  Made with by ') +
  pc.bold('Davingm')
)

console.log(
  pc.dim('  Support: ')+
  pc.cyan('https://davingm.com/sponsor')
)

console.log()