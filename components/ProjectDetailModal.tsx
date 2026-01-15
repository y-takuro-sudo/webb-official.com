'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { useViewStore } from '@/store/useViewStore'

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function ProjectDetailModal() {
  const { isModalOpen, selectedProject, closeModal } = useViewStore()
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // GSAP animations
  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return

    if (isModalOpen) {
      // Open animation
      gsap.set(modalRef.current, { visibility: 'visible' })
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      // Close animation
      gsap.to(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          gsap.set(modalRef.current, { visibility: 'hidden' })
        },
      })
    }
  }, [isModalOpen])

  // Initialize Lenis for modal internal scroll
  useEffect(() => {
    if (!isModalOpen || !scrollContainerRef.current) return

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild as HTMLElement,
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

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isModalOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal])

  if (!selectedProject) return null

  const videoId = selectedProject.videourl
    ? getYouTubeVideoId(selectedProject.videourl)
    : null

  const thumbnailUrl =
    selectedProject.thumbnail?.url ||
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80'

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[300] bg-white/95"
      style={{ visibility: 'hidden', opacity: 0 }}
      onClick={(e) => {
        if (e.target === modalRef.current) closeModal()
      }}
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="fixed top-8 right-8 z-[310] p-2 text-black"
        aria-label="Close modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
      >
        <div ref={contentRef} className="min-h-full pb-32">
          {/* Hero Section - Video or Image */}
          <div className="relative w-full h-[60vh] md:h-[70vh]">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                title={selectedProject.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={thumbnailUrl}
                alt={selectedProject.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-8 md:px-16 pt-12">
            {/* Title & Meta */}
            <div className="mb-12">
              <p className="text-sm tracking-widest mb-4 text-black/50">
                {selectedProject.category.join(' / ')} / {selectedProject.year}
              </p>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black">
                {selectedProject.title}
              </h1>
              {selectedProject.client && (
                <p className="text-lg mt-4 text-black/70">
                  {selectedProject.client}
                </p>
              )}
            </div>

            {/* Description */}
            {selectedProject.description && (
              <div className="mb-12">
                <h2 className="text-sm tracking-widest mb-4 text-black/50">
                  DESCRIPTION
                </h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: selectedProject.description,
                  }}
                />
              </div>
            )}

            {/* Credits */}
            {selectedProject.credits && (
              <div className="mb-12">
                <h2 className="text-sm tracking-widest mb-4 text-black/50">
                  CREDITS
                </h2>
                <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-black/80">
                  {selectedProject.credits}
                </pre>
              </div>
            )}

            {/* Gallery */}
            {selectedProject.gallery && selectedProject.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-sm tracking-widest mb-6 text-black/50">
                  GALLERY
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={`${selectedProject.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Link (if not embedded) */}
            {selectedProject.videourl && !videoId && (
              <div className="mb-12">
                <a
                  href={selectedProject.videourl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-widest text-black hover:text-black/70 transition-colors"
                >
                  WATCH VIDEO →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
