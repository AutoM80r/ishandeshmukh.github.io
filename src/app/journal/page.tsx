import { JOURNAL_POSTS } from '@/lib/data'
import JournalListing from '@/components/JournalListing'

export const metadata = {
  title: 'Journal — Ishan Deshmukh',
  description: 'Notes on building, competition, research, and learning. Written by Ishan Deshmukh.',
}

export default function JournalPage() {
  return <JournalListing posts={JOURNAL_POSTS} />
}
