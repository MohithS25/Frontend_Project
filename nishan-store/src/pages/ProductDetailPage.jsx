import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import Navbar from '../components/Navbar'

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={`text-base ${rating >= star ? 'text-yellow-400' : rating >= star - 0.5 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
      <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        const data = await getProductById(id)
        setProduct(data)
        setSelectedImage(0)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-4 bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm hover:shadow transition-all"
        >
          ← Back
        </button>

        {loading && <DetailSkeleton />}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-2">Something went wrong</p>
            <p className="text-sm text-gray-400 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && product && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image panel */}
                <div className="md:w-5/12 p-5 flex flex-col gap-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="bg-gray-50 rounded-lg flex items-center justify-center p-6 h-72">
                    <img
                      src={product.images?.[selectedImage] ?? product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  {product.images?.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`flex-shrink-0 w-14 h-14 rounded-md border-2 overflow-hidden bg-gray-50 transition-colors ${
                            i === selectedImage ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="md:w-7/12 p-6 flex flex-col gap-3">
                  <h1 className="text-xl font-bold text-gray-900 leading-snug">{product.title}</h1>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Stars rating={product.rating} />
                    {product.reviews?.length > 0 && (
                      <span className="text-sm text-gray-400">{product.reviews.length} reviews</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 text-sm border-t border-gray-100 pt-3">
                    {product.brand && (
                      <p className="flex gap-1">
                        <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Brand:</span>
                        <span className="text-gray-600">{product.brand}</span>
                      </p>
                    )}
                    <p className="flex gap-1">
                      <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Category:</span>
                      <span className="text-gray-600 capitalize">{product.category}</span>
                    </p>
                    <p className="flex gap-1">
                      <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Availability:</span>
                      <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <h2 className="font-semibold text-gray-800 mb-1.5">Description</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {product.reviews?.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-4 p-6">
                <h2 className="font-bold text-gray-900 text-base mb-4">
                  Reviews ({product.reviews.length})
                </h2>
                <div className="divide-y divide-gray-100">
                  {product.reviews.map((review, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-800">{review.reviewerName}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <Stars rating={review.rating} />
                      <p className="text-sm text-gray-600 mt-1.5">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12 p-5">
          <div className="h-72 bg-gray-200 rounded-lg" />
        </div>
        <div className="md:w-7/12 p-6 flex flex-col gap-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-7 bg-gray-200 rounded w-1/3" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
