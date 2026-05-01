import { RESUME } from '@/lib/data'
import ResumeView from '@/components/ResumeView'

export const metadata = {
  title: 'Resume — Ishan Deshmukh',
  description: 'Mechatronics engineer, MIT Manipal 2026. Embedded systems, robotics, PCB design.',
}

export default function ResumePage() {
  return <ResumeView resume={RESUME} />
}
