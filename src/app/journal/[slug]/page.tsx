import { notFound } from 'next/navigation'
import { JOURNAL_POSTS } from '@/lib/data'
import JournalPostView from '@/components/JournalPostView'

export async function generateStaticParams() {
  return JOURNAL_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = JOURNAL_POSTS.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — Ishan Deshmukh`,
    description: post.excerpt,
  }
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = JOURNAL_POSTS.find(p => p.slug === slug)
  if (!post) notFound()
  const index = JOURNAL_POSTS.findIndex(p => p.slug === slug)
  const prev = JOURNAL_POSTS[index + 1] ?? null
  const next = JOURNAL_POSTS[index - 1] ?? null
  return <JournalPostView post={post} prev={prev} next={next} />
}
