import { useNavigate } from 'react-router-dom'

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = rating >= star
          const half = !filled && rating >= star - 0.5
          return (
            <span key={star} className={`text-sm ${filled || half ? 'text-yellow-400' : 'text-gray-300'}`}>
              {filled ? '★' : half ? '★' : '★'}
            </span>
          )
        })}
      </div>
      <span className="text-xs text-gray-400">({rating.toFixed(1)})</span>
    </div>
  )
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { id, title, price, rating, thumbnail } = product

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
    >
      <div className="bg-gray-50 flex items-center justify-center p-4 h-44">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      <div className="p-3 border-t border-gray-100">
        <h3 className="text-sm text-gray-800 font-medium leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-900">${price.toFixed(2)}</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
