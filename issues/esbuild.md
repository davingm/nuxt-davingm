Errors type :

```bash
Lockfile is up to date, resolution step is skipped
Packages: +563
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 563, reused 563, downloaded 0, added 563, done

dependencies:
+ nuxt 4.5.2
+ vue 3.5.41
+ vue-router 5.2.0
$ nuxt prepare
│
◆  Types generated in .nuxt.

[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild@0.28.2

Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
node:internal/errors:985
  const err = new Error(message);
              ^

Error: Command failed: pnpm install
    at genericNodeError (node:internal/errors:985:15)
    at wrappedFn (node:internal/errors:539:14)
    at checkExecSyncError (node:child_process:942:11)
    at execSync (node:child_process:1014:15)
    at file:///C:/Users/Hype/Documents/Developer/Package/nuxt-davingm/src/cli.js:52:1
    at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
    at async node:internal/modules/esm/loader:643:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
  status: 1,
  signal: null,
  output: [ null, null, null ],
  pid: 9548,
  stdout: null,
  stderr: null
}

Node.js v24.19.0
[ELIFECYCLE] Command failed with exit code 1.

Hype@davingm MINGW64 ~/Documents/Developer/Package/nuxt-davingm
$
```


Apa masalahnya?

Di template Nuxt-mu, kamu kemungkinan punya:

template/
├── package.json
├── pnpm-lock.yaml
└── ...

dan pnpm versi yang kamu gunakan sekarang menerapkan mekanisme approval terhadap lifecycle/build scripts.

esbuild memang membutuhkan executable binary yang biasanya disiapkan melalui install script.

Jadi untuk development lokal template, kamu perlu mengizinkan build script esbuild.