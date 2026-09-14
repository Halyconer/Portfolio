#!/usr/bin/env node
/**
 * Generate the committed web derivatives for the Creative gallery.
 *
 * Full-resolution masters live in masters/creative/ (gitignored; uploaded
 * as-is to Cloudflare R2). This script emits WebP derivatives into
 * public/assets/creative/:
 *
 *   <slug>-960.webp   grid tiles
 *   <slug>-2560.webp  featured plate + lightbox
 *
 * Run: pnpm optimize:creative
 * See AGENTS.md ("Creative photos") for the full workflow.
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MASTERS_DIR = path.join(ROOT, 'masters', 'creative')
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'creative')
const MANIFEST_PATH = path.join(MASTERS_DIR, 'manifest.json')

const SIZES = [
    // Caps the longest edge, so portrait lightbox shots don't carry 3.5MB.
    { suffix: '960', maxEdge: 960, quality: 78 },
    { suffix: '2560', maxEdge: 2560, quality: 80 },
]

// Masters are always JPEG; the data layer builds original URLs as .jpg.
const IMAGE_RE = /\.jpe?g$/i

const toPosix = (p) => p.split(path.sep).join('/')
const formatBytes = (bytes) =>
    bytes >= 1024 * 1024
        ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(bytes / 1024)} KB`

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
        const abs = path.join(dir, entry.name)
        if (entry.isDirectory()) files.push(...(await walk(abs)))
        else if (entry.isFile() && IMAGE_RE.test(entry.name)) files.push(abs)
    }
    return files
}

async function main() {
    let masters
    try {
        masters = (await walk(MASTERS_DIR)).sort()
    } catch (err) {
        if (err.code !== 'ENOENT') throw err
        console.error(
            `Could not read masters from ${MASTERS_DIR}.\n` +
                'Full-res originals are intentionally not in git — restore them from ' +
                'Cloudflare R2 (or a backup) before running this script.'
        )
        process.exit(1)
    }
    if (masters.length === 0) {
        console.error(`No image masters found in ${MASTERS_DIR}.`)
        process.exit(1)
    }

    const manifest = {}
    let originalTotal = 0
    let derivativeTotal = 0

    for (const master of masters) {
        const key = toPosix(path.relative(MASTERS_DIR, master))
        try {
            const base = key.replace(IMAGE_RE, '')
            const originalBytes = (await stat(master)).size

            const derivatives = {}
            let output = null
            for (const { suffix, maxEdge, quality } of SIZES) {
                const outPath = path.join(OUT_DIR, `${base}-${suffix}.webp`)
                await mkdir(path.dirname(outPath), { recursive: true })
                const info = await sharp(master)
                    .rotate() // apply EXIF orientation
                    .resize({
                        width: maxEdge,
                        height: maxEdge,
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .webp({ quality, effort: 5 })
                    .toFile(outPath)
                derivatives[suffix] = info.size
                derivativeTotal += info.size
                output = info
            }

            manifest[key] = {
                bytes: originalBytes,
                width: output.width,
                height: output.height,
                derivatives,
            }
            originalTotal += originalBytes

            console.log(
                `${key.padEnd(52)} ${formatBytes(originalBytes).padStart(8)} -> ` +
                    SIZES.map(
                        ({ suffix }) =>
                            `${suffix}w ${formatBytes(derivatives[suffix]).padStart(7)}`
                    ).join('  ')
            )
        } catch (err) {
            throw new Error(`Failed to process ${key}: ${err.message}`, {
                cause: err,
            })
        }
    }

    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 4) + '\n')

    const saved = 100 - (derivativeTotal / originalTotal) * 100
    console.log(
        `\n${masters.length} masters: ${formatBytes(originalTotal)} -> ` +
            `${formatBytes(derivativeTotal)} (${saved.toFixed(1)}% smaller)\n` +
            `Manifest: ${toPosix(path.relative(ROOT, MANIFEST_PATH))}`
    )
}

await main()
