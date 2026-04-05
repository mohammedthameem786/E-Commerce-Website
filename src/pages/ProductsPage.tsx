import { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductsPage = () => {
  const { categoryFilter } = useStore();
  const [selectedCats, setSelectedCats] = useState<string[]>(categoryFilter !== 'all' ? [categoryFilter] : []);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const allCats = ['smartphones', 'laptops', 'audio', 'tvs', 'wearables', 'gaming'];

  const toggleCat = (cat: string) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCats.length > 0) result = result.filter(p => selectedCats.includes(p.category));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (a.badge === 'NEW' ? -1 : 1)); break;
    }
    return result;
  }, [selectedCats, sortBy, priceRange]);

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <h1 className="font-display mb-2" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>ALL PRODUCTS</h1>
      <p className="text-sm text-th-text2 mb-10">Discover our complete collection of premium electronics</p>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[90px] lg:self-start space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl">FILTERS</h3>
            <button onClick={() => { setSelectedCats([]); setPriceRange([0, 200000]); }} className="text-[12px] text-th-accent hover:underline">Clear All</button>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">CATEGORY</p>
            {allCats.map(cat => (
              <label key={cat} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} className="w-4 h-4 accent-[hsl(187,100%,50%)] cursor-pointer" />
                <span className="text-sm text-th-text2 group-hover:text-th-text capitalize">{cat}</span>
                <span className="ml-auto text-[11px] text-th-text3 px-2 py-0.5 rounded-full" style={{ background: 'hsl(0,0%,8.2%)' }}>{products.filter(p => p.category === cat).length}</span>
              </label>
            ))}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">PRICE RANGE</p>
            <input type="range" min={0} max={200000} step={5000} value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])} className="w-full accent-[hsl(187,100%,50%)]" />
            <p className="text-[12px] text-th-text3 mt-1">₹0 — ₹{priceRange[1].toLocaleString('en-IN')}</p>
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-th-text2">Showing {filtered.length} products</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2.5 rounded text-sm font-body text-th-accent outline-none border border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,8.2%)' }}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="font-display text-2xl mb-2">NO PRODUCTS FOUND</p>
              <p className="text-sm text-th-text2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
