import pool from './db'
import { RowDataPacket } from 'mysql2'
import fs from 'fs'
import path from 'path'
import { DATA_UNAVAILABLE, type Unavailable } from './data-result'

export interface ArticleDetail {
    id: number
    old_id: number
    title: string
    view_mode: 'html' | 'docx_to_html' | 'pdf'
    file_format: string | null
    content_path: string
    html: string | null
}

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? '/var/www/uploads'

// Первинне detail-читання: null = не знайдено, Unavailable = MySQL/файли недоступні.
export async function getArticleById(id: number): Promise<ArticleDetail | null | Unavailable> {
    let rows: RowDataPacket[]
    try {
        ;[rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, old_id, title, view_mode, file_format, content_path FROM articles_v2 WHERE old_id = ?',
            [id]
        )
    } catch (error) {
        console.error('[getArticleById] data source unavailable:', error)
        return DATA_UNAVAILABLE
    }
    if (!rows[0]) return null
    const row = rows[0]

    let html: string | null = null
    if (row.view_mode !== 'pdf') {
        const filePath = path.join(UPLOADS_DIR, row.content_path)
        // Читання файлу — best-effort: відсутній/битий файл не має ламати сторінку.
        try {
            if (fs.existsSync(filePath)) {
                html = fs.readFileSync(filePath, 'utf-8')
            }
        } catch (error) {
            console.error('[getArticleById] failed to read content file:', error)
        }
    }

    return {
        id: row.id,
        old_id: row.old_id,
        title: row.title,
        view_mode: row.view_mode,
        file_format: row.file_format,
        content_path: row.content_path,
        html,
    }
}

export async function getArticleContent(id: number): Promise<{ data: Buffer; fileFormat: string } | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT content_path, file_format, view_mode FROM articles_v2 WHERE old_id = ?',
        [id]
    )
    if (!rows[0]) return null

    const row = rows[0]
    const filePath = path.join(UPLOADS_DIR, row.content_path)

    if (!fs.existsSync(filePath)) return null

    const data = fs.readFileSync(filePath)
    const fileFormat = row.view_mode === 'pdf' ? (row.file_format ?? 'pdf') : 'html'

    return { data, fileFormat }
}
