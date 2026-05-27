'use client'

import { useState } from 'react'
import { CosmicImage } from '@/types'

export default function ProductGallery({ images, alt }: { images: CosmicImage[]; alt: string }) {
  const [selected, setSelected] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-6xl">
        📦
      </div>
    )
  }

  const current = images[selected] || images[0]

  if (!current) {
    return null
  }

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img
          src={`${current.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={alt}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(idx)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                selected === idx ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${img.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${alt} ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}