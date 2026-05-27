import Link from 'next/link'
import { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

function StarRating({ rating }: { rating: number }) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= stars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ review, showProduct = true }: { review: Review; showProduct?: boolean }) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const title = getMetafieldValue(review.metadata?.review_title) || review.title
  const text = getMetafieldValue(review.metadata?.review_text)
  const ratingValue = review.metadata?.rating
  const rating = typeof ratingValue === 'number' ? ratingValue : parseFloat(getMetafieldValue(ratingValue)) || 0
  const verified = review.metadata?.verified_purchase === true
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between gap-2 mb-3">
        <StarRating rating={rating} />
        {verified && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
            ✓ Verified
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      {text && <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">{text}</p>}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
        <span className="font-medium text-gray-900">{reviewerName}</span>
        {showProduct && product && (
          <Link
            href={`/products/${product.slug}`}
            className="text-indigo-600 hover:text-indigo-700 truncate ml-2"
          >
            {product.title}
          </Link>
        )}
      </div>
    </div>
  )
}