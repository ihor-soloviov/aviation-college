import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

export type TreeNode = {
    id: number | string
    title: string
    isFolder: boolean
    fileUrl: string | null
    children: TreeNode[]
}

export type DocumentTree = {
    id: number | string
    slug: string
    title: string
    description?: string
    items: TreeNode[]
}

type RawRef = { id: number | string; url?: string | null; filename?: string | null } | number | string | null | undefined

type RawNode = {
    id: number | string
    title: string
    isFolder?: boolean | null
    parent?: RawRef
    order?: number | null
    targetDoc?: RawRef
    targetUrl?: string | null
}

function parentId(p: RawRef): number | string | null {
    if (p == null) return null
    if (typeof p === 'object') return p.id ?? null
    return p
}

function resolveFileUrl(node: RawNode): string | null {
    if (node.isFolder) return null
    if (node.targetDoc && typeof node.targetDoc === 'object' && node.targetDoc.url) {
        return node.targetDoc.url
    }
    if (node.targetUrl && node.targetUrl.trim()) return node.targetUrl.trim()
    return null
}

function buildTree(rawNodes: RawNode[]): TreeNode[] {
    const sorted = [...rawNodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const byParent = new Map<number | string | null, RawNode[]>()
    for (const n of sorted) {
        const pid = parentId(n.parent)
        const bucket = byParent.get(pid) ?? []
        bucket.push(n)
        byParent.set(pid, bucket)
    }

    function pack(parent: number | string | null): TreeNode[] {
        const kids = byParent.get(parent) ?? []
        return kids.map((n) => ({
            id: n.id,
            title: n.title,
            isFolder: Boolean(n.isFolder),
            fileUrl: resolveFileUrl(n),
            children: n.isFolder ? pack(n.id) : [],
        }))
    }

    return pack(null)
}

export async function getDocumentTreeBySlug(slug: string): Promise<DocumentTree | null> {
    const payload = await getPayload({ config })

    const treesFound = await payload.find({
        collection: 'documentTrees',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
    })
    const tree = treesFound.docs[0]
    if (!tree) return null

    const nodesFound = await payload.find({
        collection: 'treeNodes',
        where: { tree: { equals: tree.id } },
        depth: 1,
        limit: 10000,
        sort: 'order',
    })
    const items = buildTree(nodesFound.docs as unknown as RawNode[])

    return {
        id: tree.id,
        slug: tree.slug as string,
        title: tree.title as string,
        description: (tree.description as string | undefined) ?? undefined,
        items,
    }
}
