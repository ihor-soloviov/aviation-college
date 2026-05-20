require('dotenv').config()

const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const PORT = Number(process.env.PORT) || 3001
const UPLOADS_DIR = path.resolve(process.env.UPLOADS_DIR || '/var/www/uploads')
const UPLOAD_TOKEN = process.env.FILES_API_UPLOAD_TOKEN || ''
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(function (s) { return s.trim() })
    .filter(Boolean)

const MIME_TYPES = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    html: 'text/html; charset=utf-8',
}

const ALLOWED_IMAGE_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MIME_TO_EXT = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
}
const SUBDIR_RE = /^[a-z0-9-]+$/

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
})

const app = express()

app.use(
    cors({
        origin: function (origin, cb) {
            if (!origin) return cb(null, true)
            if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
            return cb(new Error('CORS: origin not allowed: ' + origin))
        },
    })
)

app.get('/health', function (_req, res) {
    res.json({ ok: true })
})

app.get('/api/articles/:id/file', async function (req, res) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).send('Invalid id')

    try {
        const [rows] = await pool.query(
            'SELECT content_path, file_format, view_mode FROM articles_v2 WHERE old_id = ?',
            [id]
        )
        if (!rows[0]) return res.status(404).send('Not found')

        const row = rows[0]
        const requestedPath = path.resolve(UPLOADS_DIR, row.content_path)

        if (!requestedPath.startsWith(UPLOADS_DIR + path.sep)) {
            return res.status(403).send('Forbidden')
        }

        if (!fs.existsSync(requestedPath)) return res.status(404).send('File missing')

        const fileFormat = row.view_mode === 'pdf' ? row.file_format || 'pdf' : 'html'
        const mime = MIME_TYPES[fileFormat] || 'application/octet-stream'
        res.setHeader('Content-Type', mime)
        fs.createReadStream(requestedPath).pipe(res)
    } catch (err) {
        console.error('[GET /api/articles/:id/file]', err)
        res.status(500).send('Internal error')
    }
})

app.get('/api/news/:id/file', async function (req, res) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).send('Invalid id')

    try {
        const [rows] = await pool.query(
            'SELECT content_path, content_type FROM news_v2 WHERE id = ?',
            [id]
        )
        if (!rows[0]) return res.status(404).send('Not found')

        const row = rows[0]
        const requestedPath = path.resolve(UPLOADS_DIR, row.content_path)

        if (!requestedPath.startsWith(UPLOADS_DIR + path.sep)) {
            return res.status(403).send('Forbidden')
        }

        if (!fs.existsSync(requestedPath)) return res.status(404).send('File missing')

        const mime = row.content_type === 'pdf' ? MIME_TYPES.pdf : MIME_TYPES.html
        res.setHeader('Content-Type', mime)
        fs.createReadStream(requestedPath).pipe(res)
    } catch (err) {
        console.error('[GET /api/news/:id/file]', err)
        res.status(500).send('Internal error')
    }
})

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
    fileFilter: function (_req, file, cb) {
        if (!ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
            return cb(new Error('UNSUPPORTED_MIME'))
        }
        cb(null, true)
    },
})

function requireUploadToken(req, res, next) {
    if (!UPLOAD_TOKEN) {
        return res.status(500).json({ error: 'upload not configured' })
    }
    const got = req.header('x-upload-token')
    if (!got || got !== UPLOAD_TOKEN) {
        return res.status(401).json({ error: 'unauthorized' })
    }
    next()
}

app.post('/api/uploads/image', requireUploadToken, upload.single('file'), async function (req, res) {
    if (!req.file) return res.status(400).json({ error: 'no file' })

    const subdir = String((req.body && req.body.subdir) || 'news')
    if (!SUBDIR_RE.test(subdir)) return res.status(400).json({ error: 'invalid subdir' })

    const ext = MIME_TO_EXT[req.file.mimetype]
    const filename = crypto.randomUUID() + '.' + ext
    const targetDir = path.resolve(UPLOADS_DIR, subdir)
    const targetFile = path.resolve(targetDir, filename)

    if (!targetFile.startsWith(UPLOADS_DIR + path.sep)) {
        return res.status(400).json({ error: 'invalid path' })
    }

    try {
        await fs.promises.mkdir(targetDir, { recursive: true })
        await fs.promises.writeFile(targetFile, req.file.buffer)
        res.status(201).json({ path: subdir + '/' + filename })
    } catch (err) {
        console.error('[POST /api/uploads/image]', err)
        res.status(500).json({ error: 'write failed' })
    }
})

app.use(
    '/uploads',
    express.static(UPLOADS_DIR, {
        dotfiles: 'deny',
        index: false,
        fallthrough: false,
        maxAge: '7d',
    })
)

app.use(function (err, _req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'file too large' })
        return res.status(400).json({ error: err.code })
    }
    if (err && err.message === 'UNSUPPORTED_MIME') {
        return res.status(400).json({ error: 'unsupported mime type' })
    }
    return next(err)
})

app.listen(PORT, function () {
    console.log('aviation-files-api listening on :' + PORT)
    console.log('UPLOADS_DIR =', UPLOADS_DIR)
})
