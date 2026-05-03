import pool from './db'
import { RowDataPacket } from 'mysql2'

export interface NewsListItem {
    id: number
    old_id: number
    title: string
    tags: string | null
    add_date: string
    excerpt: string
}

export interface NewsDetail extends NewsListItem {
    content_type: 'html' | 'pdf'
    content_path: string
}

export interface ArchiveMonth {
    year: number
    month: number
    count: number
}

function buildFilter(year?: number, month?: number) {
    if (year && month) return { sql: 'WHERE YEAR(add_date) = ? AND MONTH(add_date) = ?', params: [year, month] }
    if (year) return { sql: 'WHERE YEAR(add_date) = ?', params: [year] }
    return { sql: '', params: [] }
}

export async function getNewsList(limit = 10, offset = 0, year?: number, month?: number): Promise<NewsListItem[]> {
    const { sql, params } = buildFilter(year, month)
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, old_id, title, tags, add_date FROM news_v2 ${sql} ORDER BY add_date DESC LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    )
    return rows.map((row) => ({
        id: row.id,
        old_id: row.old_id,
        title: row.title,
        tags: row.tags,
        add_date: row.add_date,
        excerpt: '',
    }))
}

export async function getNewsCount(year?: number, month?: number): Promise<number> {
    const { sql, params } = buildFilter(year, month)
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) as count FROM news_v2 ${sql}`,
        params
    )
    return rows[0].count
}

export async function getNewsById(id: number): Promise<NewsDetail | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT id, old_id, title, tags, add_date, content_type, content_path FROM news_v2 WHERE id = ?',
        [id]
    )
    if (!rows[0]) return null
    const row = rows[0]
    return {
        id: row.id,
        old_id: row.old_id,
        title: row.title,
        tags: row.tags,
        add_date: row.add_date,
        excerpt: '',
        content_type: row.content_type,
        content_path: row.content_path,
    }
}

export async function getNewsArchive(): Promise<ArchiveMonth[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT YEAR(add_date) as year, MONTH(add_date) as month, COUNT(*) as count
         FROM news_v2
         GROUP BY YEAR(add_date), MONTH(add_date)
         ORDER BY year DESC, month DESC`
    )
    return rows.map((row) => ({ year: row.year, month: row.month, count: row.count }))
}
