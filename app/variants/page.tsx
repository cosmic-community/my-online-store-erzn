import { getAllVariants } from '@/lib/cosmic'
import VariantList from '@/components/VariantList'

export const metadata = {
  title: 'All Variants | My Online Store',
}

export default async function VariantsPage() {
  const variants = await getAllVariants()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Variants</h1>
        <p className="text-gray-600">Explore product variations</p>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No variants available.</p>
        </div>
      ) : (
        <VariantList variants={variants} showProduct={true} />
      )}
    </div>
  )
}