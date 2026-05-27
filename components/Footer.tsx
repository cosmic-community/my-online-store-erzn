export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">My Online Store</h3>
            <p className="text-sm">Quality products at great prices. Shop with confidence.</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/categories" className="hover:text-white">Categories</a></li>
              <li><a href="/reviews" className="hover:text-white">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Need help? Reach out to our support team.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} My Online Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}