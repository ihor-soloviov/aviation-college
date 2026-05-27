import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { Info, AlertTriangle, CheckCircle2, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getColorClasses } from '@/lib/cms-colors'
import type { LinkList, LinkListItem } from '@/lib/link-lists'

type MediaObject = {
    id?: number
    url?: string
    alt?: string
    width?: number
    height?: number
    filename?: string
}

type CardData = {
    title: string
    description?: string
    icon?: string
    color?: string
    href?: string
}

type Block =
    | { blockType: 'paragraph'; content: unknown }
    | { blockType: 'heading'; text: string; level: 'h2' | 'h3' | 'h4' }
    | { blockType: 'image'; media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }
    | { blockType: 'gallery'; images: Array<{ media?: MediaObject | number | string | null; externalUrl?: string; caption?: string }> }
    | { blockType: 'youtube'; url: string; caption?: string }
    | { blockType: 'linkList'; title?: string; links: Array<{ label: string; href: string }> }
    | { blockType: 'hero'; variant: 'gradient' | 'image' | 'minimal'; title: string; subtitle?: string; accentColor?: string; backgroundImage?: MediaObject | number | string | null; ctaLabel?: string; ctaHref?: string }
    | { blockType: 'cardGrid'; title?: string; description?: string; columns?: '2' | '3' | '4'; cards: CardData[] }
    | { blockType: 'infoBanner'; variant: 'info' | 'warning' | 'success'; title?: string; content: unknown }
    | { blockType: 'linkListRef'; linkList?: { id: number | string } | number | string | null; displayMode?: 'grid' | 'list' | 'accordion'; showTitle?: boolean }
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

function getLucideIcon(name?: string, fallback?: LucideIcon): LucideIcon | null {
    if (!name) return fallback ?? null
    const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name]
    return Icon ?? fallback ?? null
}

function isExternal(href: string): boolean {
    return /^https?:\/\//.test(href)
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

function HeroBlock({
    variant,
    title,
    subtitle,
    accentColor,
    backgroundImage,
    ctaLabel,
    ctaHref,
}: {
    variant: 'gradient' | 'image' | 'minimal'
    title: string
    subtitle?: string
    accentColor?: string
    backgroundImage?: MediaObject | number | string | null
    ctaLabel?: string
    ctaHref?: string
}) {
    const overlayCta =
        ctaLabel && ctaHref ? (
            <Link
                href={ctaHref}
                target={isExternal(ctaHref) ? '_blank' : undefined}
                rel={isExternal(ctaHref) ? 'noopener noreferrer' : undefined}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/15 px-6 py-3 font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
            >
                {ctaLabel}
            </Link>
        ) : null

    if (variant === 'minimal') {
        const c = getColorClasses(accentColor)
        return (
            <section className={`my-8 rounded-2xl border-l-4 bg-muted/40 px-8 py-10 ${c.border.replace('hover:', '')}`}>
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
                {ctaLabel && ctaHref && (
                    <Link
                        href={ctaHref}
                        target={isExternal(ctaHref) ? '_blank' : undefined}
                        rel={isExternal(ctaHref) ? 'noopener noreferrer' : undefined}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        {ctaLabel}
                    </Link>
                )}
            </section>
        )
    }

    if (variant === 'image') {
        const img = resolveImage(backgroundImage, undefined)
        return (
            <section className="relative my-8 overflow-hidden rounded-2xl">
                {img && (
                    <Image
                        src={img.url}
                        alt={img.alt ?? ''}
                        fill
                        className="object-cover"
                        unoptimized={!img.width || !img.height}
                    />
                )}
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 px-8 py-20 text-center text-white md:py-28">
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
                    {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
                    {overlayCta}
                </div>
            </section>
        )
    }

    // gradient (default)
    const c = getColorClasses(accentColor)
    return (
        <section className={`my-8 overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} px-8 py-20 text-center text-white md:py-28`}>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
            {overlayCta}
        </section>
    )
}

const GRID_COLS: Record<string, string> = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

function CardGridBlock({
    title,
    description,
    columns = '3',
    cards,
}: {
    title?: string
    description?: string
    columns?: '2' | '3' | '4'
    cards: CardData[]
}) {
    if (!cards || cards.length === 0) return null
    return (
        <section className="my-10">
            {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p>}
            <div className={`mt-6 grid grid-cols-1 gap-4 ${GRID_COLS[columns] ?? GRID_COLS['3']}`}>
                {cards.map((card, i) => {
                    const c = getColorClasses(card.color)
                    const Icon = getLucideIcon(card.icon)
                    const inner = (
                        <>
                            {Icon && (
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${c.iconBg}`}>
                                    <Icon className={`h-6 w-6 ${c.iconText}`} />
                                </div>
                            )}
                            <h3 className="flex items-center gap-1 text-lg font-semibold">
                                {card.title}
                                {card.href && <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
                            </h3>
                            {card.description && (
                                <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                            )}
                        </>
                    )
                    const cls = `rounded-xl border bg-card p-6 transition ${card.href ? `hover:shadow-md ${c.border}` : ''}`
                    if (card.href) {
                        return (
                            <Link
                                key={i}
                                href={card.href}
                                target={isExternal(card.href) ? '_blank' : undefined}
                                rel={isExternal(card.href) ? 'noopener noreferrer' : undefined}
                                className={`block ${cls}`}
                            >
                                {inner}
                            </Link>
                        )
                    }
                    return (
                        <div key={i} className={cls}>
                            {inner}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

const BANNER_STYLES: Record<string, { wrap: string; icon: LucideIcon; iconColor: string }> = {
    info: { wrap: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/15', icon: Info, iconColor: 'text-blue-600 dark:text-blue-400' },
    warning: { wrap: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/15', icon: AlertTriangle, iconColor: 'text-amber-600 dark:text-amber-400' },
    success: { wrap: 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/15', icon: CheckCircle2, iconColor: 'text-green-600 dark:text-green-400' },
}

function InfoBannerBlock({
    variant,
    title,
    content,
}: {
    variant: 'info' | 'warning' | 'success'
    title?: string
    content: unknown
}) {
    const s = BANNER_STYLES[variant] ?? BANNER_STYLES.info
    const Icon = s.icon
    return (
        <div className={`my-8 flex gap-4 rounded-xl border p-5 ${s.wrap}`}>
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.iconColor}`} />
            <div className="min-w-0">
                {title && <h4 className="mb-1 font-semibold">{title}</h4>}
                {content ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        <RichText data={content as never} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

function LinkListItemCard({ item }: { item: LinkListItem }) {
    const c = getColorClasses(item.color)
    const Icon = getLucideIcon(item.icon, LucideIcons.FileText)
    const inner = (
        <>
            {Icon && (
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${c.iconBg}`}>
                    <Icon className={`h-5 w-5 ${c.iconText}`} />
                </div>
            )}
            <div className="flex items-center gap-1 font-medium">
                {item.title}
                {item.href && <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
            </div>
            {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
        </>
    )
    const cls = `rounded-xl border bg-card p-5 transition ${item.href ? `hover:shadow-md ${c.border}` : ''}`
    if (item.href) {
        return (
            <Link
                href={item.href}
                target={isExternal(item.href) ? '_blank' : undefined}
                rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
                className={`block ${cls}`}
            >
                {inner}
            </Link>
        )
    }
    return <div className={cls}>{inner}</div>
}

function LinkListRefBlock({
    list,
    showTitle,
}: {
    list?: LinkList
    showTitle?: boolean
}) {
    if (!list || list.items.length === 0) return null
    return (
        <section className="my-10">
            {showTitle && <h2 className="mb-6 text-3xl font-bold tracking-tight">{list.title}</h2>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.items.map((item, i) => (
                    <LinkListItemCard key={i} item={item} />
                ))}
            </div>
        </section>
    )
}

function refListId(ref: { id: number | string } | number | string | null | undefined): string | null {
    if (ref == null) return null
    if (typeof ref === 'object') return String(ref.id)
    return String(ref)
}

export function BlocksRenderer({
    blocks,
    linkLists,
}: {
    blocks: Block[] | null | undefined
    linkLists?: Record<string, LinkList>
}) {
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
                    case 'hero': {
                        const hb = b as Extract<Block, { blockType: 'hero' }>
                        return (
                            <HeroBlock
                                key={key}
                                variant={hb.variant}
                                title={hb.title}
                                subtitle={hb.subtitle}
                                accentColor={hb.accentColor}
                                backgroundImage={hb.backgroundImage}
                                ctaLabel={hb.ctaLabel}
                                ctaHref={hb.ctaHref}
                            />
                        )
                    }
                    case 'cardGrid': {
                        const cb = b as Extract<Block, { blockType: 'cardGrid' }>
                        return <CardGridBlock key={key} title={cb.title} description={cb.description} columns={cb.columns} cards={cb.cards} />
                    }
                    case 'infoBanner': {
                        const ib = b as Extract<Block, { blockType: 'infoBanner' }>
                        return <InfoBannerBlock key={key} variant={ib.variant} title={ib.title} content={ib.content} />
                    }
                    case 'linkListRef': {
                        const rb = b as Extract<Block, { blockType: 'linkListRef' }>
                        const id = refListId(rb.linkList)
                        const list = id && linkLists ? linkLists[id] : undefined
                        return <LinkListRefBlock key={key} list={list} showTitle={rb.showTitle} />
                    }
                    default:
                        return null
                }
            })}
        </div>
    )
}
