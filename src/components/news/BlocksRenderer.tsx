import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

type MediaObject = {
    id?: number
    url?: string
    alt?: string
    width?: number
    height?: number
    filename?: string
}

type Block =
    | { blockType: 'paragraph'; content: unknown }
    | { blockType: 'heading'; text: string; level: 'h2' | 'h3' | 'h4' }
    | { blockType: 'image'; media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }
    | { blockType: 'gallery'; images: Array<{ media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }> }
    | { blockType: 'youtube'; url: string; caption?: string }
    | { blockType: 'linkList'; title?: string; links: Array<{ label: string; href: string }> }
    | { blockType: string;[key: string]: unknown }

interface ResolvedImage {
    url: string
    alt?: string
    width?: number
    height?: number
}

function resolveImage(
    media: MediaObject | number | string | null | undefined,
    externalUrl: string | undefined,
): ResolvedImage | null {
    if (media && typeof media === 'object' && typeof media.url === 'string' && media.url) {
        return { url: media.url, alt: media.alt, width: media.width, height: media.height }
    }
    if (externalUrl) return { url: externalUrl }
    return null
}

function extractYoutubeId(url: string): string | null {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]+)/)
    return m ? m[1] : null
}

function ParagraphBlock({ content }: { content: unknown }) {
    if (!content) return null
    return (
        <div className="prose prose-lg max-w-none dark:prose-invert">
            <RichText data={content as never} />
        </div>
    )
}

function HeadingBlock({ text, level }: { text: string; level: 'h2' | 'h3' | 'h4' }) {
    const baseClass = 'font-bold tracking-tight'
    if (level === 'h3') return <h3 className={`text-2xl mt-8 mb-3 ${baseClass}`}>{text}</h3>
    if (level === 'h4') return <h4 className={`text-xl mt-6 mb-2 ${baseClass}`}>{text}</h4>
    return <h2 className={`text-3xl mt-10 mb-4 ${baseClass}`}>{text}</h2>
}

function ImageBlockComp({
    media,
    externalUrl,
    caption,
}: {
    media?: MediaObject | number | string | null
    externalUrl?: string
    caption?: string
}) {
    const img = resolveImage(media, externalUrl)
    if (!img) return null
    return (
        <figure className="my-8">
            <div className="relative overflow-hidden rounded-lg">
                <Image
                    src={img.url}
                    alt={img.alt ?? caption ?? ''}
                    width={img.width ?? 1200}
                    height={img.height ?? 800}
                    className="w-full h-auto"
                    unoptimized={!img.width || !img.height}
                />
            </div>
            {caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

function GalleryBlock({
    images,
}: {
    images: Array<{ media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }>
}) {
    if (!images || images.length === 0) return null
    return (
        <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((item, i) => {
                const img = resolveImage(item.media, item.externalUrl)
                if (!img) return null
                return (
                    <figure key={i} className="space-y-1">
                        <Image
                            src={img.url}
                            alt={img.alt ?? item.caption ?? ''}
                            width={img.width ?? 600}
                            height={img.height ?? 400}
                            className="w-full h-auto rounded-md object-cover aspect-[3/2]"
                            unoptimized={!img.width || !img.height}
                        />
                        {item.caption && (
                            <figcaption className="text-xs text-muted-foreground text-center">
                                {item.caption}
                            </figcaption>
                        )}
                    </figure>
                )
            })}
        </div>
    )
}

function YoutubeBlock({ url, caption }: { url: string; caption?: string }) {
    const id = extractYoutubeId(url)
    if (!id) return null
    return (
        <figure className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-lg">
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={caption ?? 'YouTube video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            </div>
            {caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

function LinkListBlock({
    title,
    links,
}: {
    title?: string
    links: Array<{ label: string; href: string }>
}) {
    if (!links || links.length === 0) return null
    return (
        <nav className="my-8 rounded-lg border border-blue-100 bg-blue-50/60 dark:bg-blue-900/10 dark:border-blue-900/40 p-6">
            {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
            <ul className="space-y-2">
                {links.map((link, i) => (
                    <li key={i}>
                        <a
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export function BlocksRenderer({ blocks }: { blocks: Block[] | null | undefined }) {
    if (!blocks || blocks.length === 0) return null
    return (
        <div className="space-y-4">
            {blocks.map((b, i) => {
                const key = `${b.blockType}-${i}`
                switch (b.blockType) {
                    case 'paragraph':
                        return <ParagraphBlock key={key} content={(b as { content: unknown }).content} />
                    case 'heading':
                        return <HeadingBlock key={key} text={(b as { text: string }).text} level={(b as { level: 'h2' | 'h3' | 'h4' }).level} />
                    case 'image':
                        return (
                            <ImageBlockComp
                                key={key}
                                media={(b as { media?: MediaObject | number | string | null }).media}
                                externalUrl={(b as { externalUrl?: string }).externalUrl}
                                caption={(b as { caption?: string }).caption}
                            />
                        )
                    case 'gallery':
                        return <GalleryBlock key={key} images={(b as { images: Array<{ media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }> }).images} />
                    case 'youtube':
                        return <YoutubeBlock key={key} url={(b as { url: string }).url} caption={(b as { caption?: string }).caption} />
                    case 'linkList':
                        return <LinkListBlock key={key} title={(b as { title?: string }).title} links={(b as { links: Array<{ label: string; href: string }> }).links} />
                    default:
                        return null
                }
            })}
        </div>
    )
}
