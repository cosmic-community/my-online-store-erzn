import Link from 'next/link'
import { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import InventoryBadge from './InventoryBadge'

export default function ProductCard({ product }: { product: Product }) {
  const name = getMetafieldValue(product.metadata?.product_name) || product.title
  const price = product.metadata?.price
  const image = product.metadata?.main_image
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const category = product.metadata?.category

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            📦
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        {category && (
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
            {category.title}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          {typeof price === 'number' && (
            <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          )}
          {inventoryStatus && <InventoryBadge status={inventoryStatus} />}
        </div>
      </div>
    </Link>
  )
}