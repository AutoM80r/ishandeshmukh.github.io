import { notFound } from 'next/navigation'
import { PROJECT_DETAILS } from '@/lib/data'
import ProjectDetail from '@/components/ProjectDetail'

export async function generateStaticParams() {
  return PROJECT_DETAILS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECT_DETAILS.find(p => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Ishan Deshmukh`,
    description: project.headline,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECT_DETAILS.find(p => p.slug === slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
