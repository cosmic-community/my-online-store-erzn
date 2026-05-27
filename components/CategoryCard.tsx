import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-5xl">
            🏷️
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}