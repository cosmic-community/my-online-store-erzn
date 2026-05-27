import Link from 'next/link'
import { getFeaturedProducts, getAllCategories, getAllProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [featuredProducts, categories, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
    getAllProducts(),
  ])

  const productsToShow = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Shop the latest collection at My Online Store. Quality products, unbeatable prices.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <Link href="/categories" className="text-indigo-600 hover:text-indigo-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {productsToShow.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {featuredProducts.length > 0 ? 'Featured Products' : 'Our Products'}
              </h2>
              <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsToShow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 mb-6">
            Read genuine reviews from our happy customers
          </p>
          <Link
            href="/reviews"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            View Reviews
          </Link>
        </div>
      </section>
    </div>
  )
}