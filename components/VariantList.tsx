import Link from 'next/link'
import { Variant } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function VariantList({ variants, showProduct = false }: { variants: Variant[]; showProduct?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {variants.map((variant) => {
        const name = getMetafieldValue(variant.metadata?.variant_name) || variant.title
        const sku = getMetafieldValue(variant.metadata?.sku)
        const size = getMetafieldValue(variant.metadata?.size)
        const color = getMetafieldValue(variant.metadata?.color)
        const priceAdj = variant.metadata?.price_adjustment
        const stock = variant.metadata?.stock_level
        const image = variant.metadata?.variant_image
        const product = variant.metadata?.product

        return (
          <div
            key={variant.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4"
          >
            {image ? (
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                🎨
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
              {showProduct && product && (
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs text-indigo-600 hover:text-indigo-700 block truncate"
                >
                  {product.title}
                </Link>
              )}
              {sku && <p className="text-xs text-gray-500 mt-1">SKU: {sku}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {size && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    Size: {size}
                  </span>
                )}
                {color && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {color}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                {typeof priceAdj === 'number' && priceAdj !== 0 && (
                  <span className={priceAdj > 0 ? 'text-gray-700' : 'text-green-600'}>
                    {priceAdj > 0 ? '+' : ''}${priceAdj.toFixed(2)}
                  </span>
                )}
                {typeof stock === 'number' && (
                  <span className="text-xs text-gray-500">{stock} in stock</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}