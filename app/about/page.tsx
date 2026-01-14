'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const elements = contentRef.current.querySelectorAll('[data-animate]')

    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    )
  }, [])

  return (
    <section className="min-h-screen pt-32 pb-16 px-8 md:px-16 lg:px-32">
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <h1
          data-animate
          className="text-6xl md:text-8xl font-light tracking-tight mb-16"
        >
          ABOUT
        </h1>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 data-animate className="text-sm tracking-widest mb-6 opacity-40">
              COMPANY
            </h2>
            <p data-animate className="text-lg md:text-xl leading-relaxed">
              WEBB Inc. is a creative production company founded in Tokyo.
            </p>
            <p
              data-animate
              className="text-lg md:text-xl leading-relaxed mt-4 opacity-70"
            >
              We specialize in creating visual content that resonates—film,
              photography, and design that captures the essence of brands and
              stories.
            </p>
          </div>

          <div>
            <h2 data-animate className="text-sm tracking-widest mb-6 opacity-40">
              PHILOSOPHY
            </h2>
            <p data-animate className="text-lg md:text-xl leading-relaxed">
              Contrast creates meaning. Minimalism reveals truth.
            </p>
            <p
              data-animate
              className="text-lg md:text-xl leading-relaxed mt-4 opacity-70"
            >
              We believe in the power of restraint—in letting the work breathe,
              in finding beauty in negative space, in stories told through what
              is left unsaid.
            </p>
          </div>
        </div>

        <div className="mt-24 md:mt-32 grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 data-animate className="text-sm tracking-widest mb-6 opacity-40">
              FOUNDER
            </h2>
            <h3 data-animate className="text-2xl md:text-3xl font-light mb-4">
              Kazuyasu Yoshioka
            </h3>
            <p data-animate className="leading-relaxed opacity-70">
              Director / Cinematographer
            </p>
          </div>

          <div>
            <h2 data-animate className="text-sm tracking-widest mb-6 opacity-40">
              CONTACT
            </h2>
            <a
              href="mailto:contact@webb-official.com"
              data-animate
              className="text-lg md:text-xl hover:opacity-60 transition-opacity"
            >
              contact@webb-official.com
            </a>
            <div data-animate className="mt-8 flex gap-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest opacity-40 hover:opacity-100 transition-opacity"
              >
                INSTAGRAM
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest opacity-40 hover:opacity-100 transition-opacity"
              >
                VIMEO
              </a>
            </div>
          </div>
        </div>

        <div data-animate className="mt-32 pt-8 border-t border-current opacity-20">
          <p className="text-xs tracking-widest">
            WEBB Inc. / Tokyo, Japan
          </p>
        </div>
      </div>
    </section>
  )
}
