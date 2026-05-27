import { getAllReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Customer Reviews | My Online Store',
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
        <p className="text-gray-600">See what our customers are saying</p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct={true} />
          ))}
        </div>
      )}
    </div>
  )
}