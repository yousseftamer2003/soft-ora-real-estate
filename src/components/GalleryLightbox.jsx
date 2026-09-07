import { useEffect, useRef } from 'react'

export default function GalleryLightbox({ images, index, onClose, onIndex }) {
  const startX = useRef(null)

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onIndex((i) => (i + 1) % images.length)
      if (event.key === 'ArrowLeft') onIndex((i) => (i - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [images.length, onClose, onIndex])

  function prev() {
    onIndex((i) => (i - 1 + images.length) % images.length)
  }

  function next() {
    onIndex((i) => (i + 1) % images.length)
  }

  function onTouchStart(event) {
    startX.current = event.changedTouches[0].clientX
  }

  function onTouchEnd(event) {
    if (startX.current == null) return
    const delta = event.changedTouches[0].clientX - startX.current
    startX.current = null
    if (delta < -40) next()
    if (delta > 40) prev()
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
      <button type="button" className="lightbox__backdrop" aria-label="Close preview" onClick={onClose} />
      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous photo">
        ‹
      </button>
      <img
        src={images[index]}
        alt={`Photo ${index + 1} of ${images.length}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next photo">
        ›
      </button>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <p className="lightbox__count">
        {index + 1} / {images.length}
      </p>
    </div>
  )
}
