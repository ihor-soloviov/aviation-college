import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const ALLOWED_IMAGE_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
}
const SUBDIR_RE = /^[a-z0-9-]+$/
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

type UploadMode = 'remote' | 'local'

function getUploadMode(): UploadMode {
    return process.env.UPLOAD_MODE === 'local' ? 'local' : 'remote'
}

export class UploadError extends Error {
    code: string
    constructor(code: string, message: string) {
        super(message)
        this.code = code
        this.name = 'UploadError'
    }
}

export async function uploadImage(file: File, subdir = 'news'): Promise<{ path: string }> {
    if (!SUBDIR_RE.test(subdir)) throw new UploadError('INVALID_SUBDIR', 'invalid subdir')
    if (!ALLOWED_IMAGE_MIMES.has(file.type)) throw new UploadError('UNSUPPORTED_MIME', 'unsupported mime type')
    if (file.size > MAX_UPLOAD_BYTES) throw new UploadError('FILE_TOO_LARGE', 'file too large')

    return getUploadMode() === 'local' ? uploadLocal(file, subdir) : uploadRemote(file, subdir)
}

async function uploadRemote(file: File, subdir: string): Promise<{ path: string }> {
    const base = process.env.FILES_API_URL
    const token = process.env.FILES_API_UPLOAD_TOKEN
    if (!base) throw new UploadError('NOT_CONFIGURED', 'FILES_API_URL is not set')
    if (!token) throw new UploadError('NOT_CONFIGURED', 'FILES_API_UPLOAD_TOKEN is not set')

    const form = new FormData()
    form.append('file', file)
    form.append('subdir', subdir)

    const res = await fetch(`${base}/api/uploads/image`, {
        method: 'POST',
        headers: { 'x-upload-token': token },
        body: form,
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new UploadError('REMOTE_FAILED', `upload failed (${res.status}): ${text}`)
    }

    const data = (await res.json()) as { path: string }
    return { path: data.path }
}

async function uploadLocal(file: File, subdir: string): Promise<{ path: string }> {
    const uploadsDir = process.env.UPLOADS_DIR
    if (!uploadsDir) throw new UploadError('NOT_CONFIGURED', 'UPLOADS_DIR is not set')

    const root = path.resolve(uploadsDir)
    const ext = MIME_TO_EXT[file.type]
    const filename = `${crypto.randomUUID()}.${ext}`
    const targetDir = path.resolve(root, subdir)
    const targetFile = path.resolve(targetDir, filename)

    if (!targetFile.startsWith(root + path.sep)) {
        throw new UploadError('INVALID_PATH', 'invalid path')
    }

    await fs.mkdir(targetDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(targetFile, buffer)
    return { path: `${subdir}/${filename}` }
}
