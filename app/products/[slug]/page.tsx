// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getVariantsByProduct, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'
import ProductGallery from '@/components/ProductGallery'
import VariantList from '@/components/VariantList'
import ReviewCard from '@/components/ReviewCard'
import InventoryBadge from '@/components/InventoryBadge'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const [variants, reviews] = await Promise.all([
    getVariantsByProduct(product.id),
    getReviewsByProduct(product.id),
  ])

  const productName = getMetafieldValue(product.metadata?.product_name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const stockQty = product.metadata?.stock_quantity
  const category = product.metadata?.category
  const mainImage = product.metadata?.main_image
  const gallery = product.metadata?.gallery || []

  const allImages = mainImage ? [mainImage, ...gallery] : gallery

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/products" className="text-gray-500 hover:text-indigo-600">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{productName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <ProductGallery images={allImages} alt={productName} />

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-2"
            >
              {category.title}
            </Link>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{productName}</h1>

          <div className="flex items-center gap-4 mb-6">
            {typeof price === 'number' && (
              <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            )}
            {inventoryStatus && <InventoryBadge status={inventoryStatus} />}
          </div>

          {description && (
            <div className="prose max-w-none mb-6">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}

          {typeof stockQty === 'number' && (
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-medium">In stock:</span> {stockQty} units
            </p>
          )}

          <button
            type="button"
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Variants */}
      {variants.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Variants</h2>
          <VariantList variants={variants} />
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}