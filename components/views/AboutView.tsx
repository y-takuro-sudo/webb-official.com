'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { Instagram } from 'lucide-react'

// Team members data
const TEAM_MEMBERS = [
  {
    name: '吉岡 一靖',
    nameEn: 'Yoshioka Issei',
    title: 'CEO / Director',
    instagram: '@1say1say1say',
    url: 'https://www.instagram.com/1say1say1say/',
  },
  {
    name: '木村 響',
    nameEn: 'Kimura Kyo',
    title: 'CTO / Technical Director',
    instagram: '@kyoch0919',
    url: 'https://www.instagram.com/kyoch0919/',
  },
  {
    name: '矢崎 麦',
    nameEn: 'Yazaki Baku',
    title: 'COO / Producer',
    instagram: '@baku_yazaki',
    url: 'https://www.instagram.com/baku_yazaki/',
  },
]

// Corporate Overview data
const CORPORATE_INFO = [
  { label: '会社名', value: '株式会社WEBB（ウェッブ）' },
  { label: '法人番号', value: '1011301030758' },
  { label: '資本金', value: '1,000,000円' },
  { label: '代表取締役', value: '吉岡 一靖 (Yoshioka Issei)' },
  {
    label: '所在地',
    value: '〒164-0012\n東京都中野区本町2-46-1\n中野サンブライトツイン 14階 TCIC内 No.1',
  },
  {
    label: 'CONTACT',
    value: 'MAIL: info@webb-official.com\nTEL: 050-1792-5114',
    isContact: true,
  },
]

export default function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    const elements = contentRef.current.querySelectorAll('[data-animate]')

    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-white"
    >
      <div ref={contentRef} className="min-h-full pt-32 pb-32 px-8 md:px-16 lg:px-32">
        <div className="max-w-4xl">
          <h1
            data-animate
            className="text-6xl md:text-8xl font-light tracking-tight mb-16 text-black"
          >
            ABOUT US
          </h1>

          {/* Team Section */}
          <section className="mb-24 md:mb-32">
            <h2
              data-animate
              className="text-sm tracking-widest mb-10 text-black/40"
            >
              TEAM
            </h2>
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.instagram} data-animate>
                  <h3 className="text-xl md:text-2xl font-light mb-1 text-black">
                    {member.name}
                  </h3>
                  <p className="text-sm text-black/50 mb-2">{member.nameEn}</p>
                  <p className="text-sm text-black/70 mb-4">{member.title}</p>
                  <a
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors"
                  >
                    <Instagram size={16} />
                    <span>{member.instagram}</span>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Corporate Overview Section */}
          <section className="mb-24 md:mb-32">
            <h2
              data-animate
              className="text-sm tracking-widest mb-10 text-black/40"
            >
              会社概要 / CORPORATE OVERVIEW
            </h2>
            <dl className="space-y-6">
              {CORPORATE_INFO.map((item) => (
                <div
                  key={item.label}
                  data-animate
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-4 border-b border-black/10"
                >
                  <dt className="text-sm tracking-wider text-black/50">
                    {item.label}
                  </dt>
                  <dd className="text-base text-black whitespace-pre-line">
                    {item.isContact ? (
                      <div className="space-y-1">
                        <a
                          href="mailto:info@webb-official.com"
                          className="block hover:text-black/60 transition-colors"
                        >
                          MAIL: info@webb-official.com
                        </a>
                        <a
                          href="tel:050-1792-5114"
                          className="block hover:text-black/60 transition-colors"
                        >
                          TEL: 050-1792-5114
                        </a>
                      </div>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Footer */}
          <div
            data-animate
            className="pt-8 border-t border-black/10"
          >
            <p className="text-xs tracking-widest text-black/40">
              WEBB Inc. / Tokyo, Japan
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
