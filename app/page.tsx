import Hero from '@/components/Hero'
import ProjectGrid from '@/components/ProjectGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectGrid />
      <footer className="py-16 px-8 text-center">
        <p className="text-xs tracking-widest opacity-40">
          &copy; {new Date().getFullYear()} WEBB Inc. All rights reserved.
        </p>
      </footer>
    </>
  )
}
