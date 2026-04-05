import { useState } from 'react';
import { Product, formatPrice } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, wishlist, showProductDetail } = useStore();
  const [added, setAdded] = useState(false);
  const isWished = wishlist.includes(product.id);

  const badgeColors: Record<string, string> = {
    NEW: 'bg-th-accent text-th-bg',
    SALE: 'bg-th-red text-th-text',
    HOT: 'bg-th-accent3 text-th-bg',
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card group relative rounded-2xl border border-[rgba(255,255,255,0.07)] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-th-accent/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ background: 'hsl(0,0%,6.7%)' }} onClick={() => showProductDetail(product)}>
      <span className={`absolute top-3.5 left-3.5 z-[2] text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded ${badgeColors[product.badge]}`}>{product.badge}</span>

      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={`absolute top-3.5 right-3.5 z-[2] w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${isWished ? 'border-th-red bg-th-red/20' : 'border-[rgba(255,255,255,0.07)] bg-[rgba(0,0,0,0.5)]'}`} style={{ backdropFilter: 'blur(10px)' }}>
        <i className={`fa-solid fa-heart text-sm ${isWished ? 'text-th-red' : 'text-th-text3'}`} />
      </button>

      <div className="h-[220px] flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, hsl(0,0%,5.9%), hsl(0,0%,8.2%))' }}>
        {product.img.startsWith('/') || product.img.startsWith('http') ? (
          <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
        ) : (
          <span className="text-[100px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{product.img}</span>
        )}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 bg-th-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="p-[18px]">
        <p className="text-[10px] tracking-[2px] uppercase text-th-accent mb-1.5">{product.brand}</p>
        <p className="text-[15px] font-semibold leading-tight mb-2">{product.name}</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <i key={s} className={`fa-solid fa-star text-[12px] ${s <= Math.round(product.rating) ? 'text-th-accent3' : 'text-th-text3'}`} />)}
          </div>
          <span className="font-mono text-[12px] text-th-text2">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[20px] font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="block font-mono text-[12px] text-th-text3 line-through">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button onClick={handleAdd} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${added ? 'bg-th-green scale-110' : 'bg-th-accent hover:bg-[#33eeff] hover:scale-110 hover:shadow-[0_8px_24px_rgba(0,229,255,0.3)]'}`} style={{ color: '#080808' }}>
            <i className={`fa-solid ${added ? 'fa-check' : 'fa-plus'} text-base`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
