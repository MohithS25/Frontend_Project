import { useState } from 'react'

function FilterSidebar({ categories, brands, filters, onCategoryChange, onPriceApply, onBrandToggle }) {
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)
  const [categorySearch, setCategorySearch] = useState('')

  const visibleCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  )

  return (
    <aside className="w-56 flex-shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Sidebar search */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center gap-2 border border-gray-200 rounded px-2.5 py-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={categorySearch}
            onChange={e => setCategorySearch(e.target.value)}
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="p-3 space-y-5">
        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {visibleCategories.map(cat => (
              <label
                key={cat.slug}
                className="flex items-center gap-2 py-0.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.category === cat.slug}
                  onChange={() => onCategoryChange(filters.category === cat.slug ? null : cat.slug)}
                  className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                />
                <span className={`text-sm group-hover:text-gray-900 transition-colors ${
                  filters.category === cat.slug ? 'text-blue-600 font-medium' : 'text-gray-600'
                }`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price Range</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              min={0}
              className="w-1/2 border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              min={0}
              className="w-1/2 border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <button
            onClick={() => onPriceApply(minPrice, maxPrice)}
            className="w-full bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium"
          >
            Apply
          </button>
        </div>

        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brands</h3>
            <div className="space-y-1 max-h-44 overflow-y-auto">
              {brands.map(brand => (
                <label
                  key={brand}
                  className="flex items-center gap-2 py-0.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => onBrandToggle(brand)}
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                  <span className={`text-sm group-hover:text-gray-900 transition-colors ${
                    filters.brands.includes(brand) ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default FilterSidebar
