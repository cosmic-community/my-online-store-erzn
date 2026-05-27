// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const categoryName = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav className="mb-4 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{categoryName}</span>
          </nav>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {image && (
              <img
                src={`${image.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                alt={categoryName}
                width={120}
                height={120}
                className="rounded-lg shadow-lg"
              />
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{categoryName}</h1>
              {description && <p className="text-lg text-white/90 max-w-2xl">{description}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}