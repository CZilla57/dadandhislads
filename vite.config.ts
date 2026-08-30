import { readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

/**
 * Strip macOS `.DS_Store` files that get copied out of `public/` into the
 * build so they never reach production. No dependency needed.
 */
function stripDsStore(): Plugin {
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else if (entry === '.DS_Store') rmSync(full)
    }
  }
  return {
    name: 'strip-ds-store',
    apply: 'build',
    closeBundle() {
      try {
        walk('dist')
      } catch {
        // dist may not exist on a failed build — nothing to clean.
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), stripDsStore()],
})
