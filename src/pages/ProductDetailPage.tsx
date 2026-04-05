import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, toggleWishlist, wishlist, showPage } = useStore();
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;
  const p = selectedProduct;
  const isWished = wishlist.includes(p.id);

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <div className="flex items-center gap-2 text-[12px] text-th-text3 mb-8">
        <button onClick={() => showPage('home')} className="hover:text-th-accent transition-colors">Home</button>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <button onClick={() => showPage('products')} className="hover:text-th-accent transition-colors">Products</button>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <span className="capitalize">{p.category}</span>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <span className="text-th-text">{p.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div>
          <div className="h-[480px] rounded-[20px] border border-[rgba(255,255,255,0.07)] flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(0,0%,5.9%), hsl(0,0%,8.2%))' }}>
            <div className="absolute w-[200px] h-[200px] bg-th-accent/15 blur-[80px] rounded-full" />
            {p.img.startsWith('/') || p.img.startsWith('http') ? (
              <img src={p.img} alt={p.name} className="w-full h-full object-cover relative z-[2]" />
            ) : (
              <span className="text-[200px] animate-float relative z-[2]" style={{ filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.3))' }}>{p.img}</span>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {[0,1,2,3].map(i => (
              <div key={i} className={`w-20 h-20 rounded-xl border flex items-center justify-center cursor-pointer transition-colors overflow-hidden ${i === 0 ? 'border-th-accent' : 'border-[rgba(255,255,255,0.07)] hover:border-th-accent/30'}`} style={{ background: 'hsl(0,0%,6.7%)' }}>
                {p.img.startsWith('/') || p.img.startsWith('http') ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[40px]">{p.img}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] uppercase tracking-[2px] text-th-accent mb-2">{p.brand}</p>
          <h1 className="text-[32px] font-bold leading-tight mb-4 font-body">{p.name}</h1>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <i key={s} className={`fa-solid fa-star text-sm ${s <= Math.round(p.rating) ? 'text-th-accent3' : 'text-th-text3'}`} />)}
            </div>
            <span className="font-mono text-sm">{p.rating}</span>
            <span className="text-sm text-th-text3">({p.reviews.toLocaleString()} reviews)</span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-th-green/20 text-th-green border border-th-green/30">In Stock</span>
          </div>

          <div className="flex items-end gap-3 mb-2">
            <span className="font-mono text-4xl font-bold">{formatPrice(p.price)}</span>
            {p.oldPrice && (
              <>
                <span className="font-mono text-lg text-th-text3 line-through">{formatPrice(p.oldPrice)}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-th-red/20 text-th-red">-{Math.round((1 - p.price / p.oldPrice) * 100)}% OFF</span>
              </>
            )}
          </div>

          <p className="text-sm font-light text-th-text2 leading-[1.8] my-5">{p.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(p.specs).map(([k, v]) => (
              <div key={k} className="p-3 rounded-[10px] border border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,8.2%)' }}>
                <span className="text-[10px] uppercase text-th-text3 tracking-[1px]">{k}</span>
                <span className="block text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-0 mb-6">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 border border-[rgba(255,255,255,0.07)] rounded-l flex items-center justify-center hover:border-th-accent hover:text-th-accent transition-colors" style={{ background: 'hsl(0,0%,8.2%)' }}><i className="fa-solid fa-minus text-sm" /></button>
            <div className="w-12 h-10 border-t border-b border-[rgba(255,255,255,0.07)] flex items-center justify-center font-mono" style={{ background: 'hsl(0,0%,8.2%)' }}>{qty}</div>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 border border-[rgba(255,255,255,0.07)] rounded-r flex items-center justify-center hover:border-th-accent hover:text-th-accent transition-colors" style={{ background: 'hsl(0,0%,8.2%)' }}><i className="fa-solid fa-plus text-sm" /></button>
          </div>

          {/* CTAs */}
          <button onClick={() => { for (let i = 0; i < qty; i++) addToCart(p); }} className="w-full py-4 rounded bg-th-accent text-[14px] font-bold uppercase tracking-[1.5px] mb-3 hover:bg-[#33eeff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,229,255,0.25)] transition-all flex items-center justify-center gap-2" style={{ color: '#080808' }}>
            <i className="fa-solid fa-shopping-cart" /> ADD TO CART
          </button>
          <button onClick={() => toggleWishlist(p.id)} className={`w-full py-4 rounded text-[14px] font-bold uppercase tracking-[1.5px] mb-6 border transition-all flex items-center justify-center gap-2 bg-transparent ${isWished ? 'border-th-red text-th-red' : 'border-[rgba(255,255,255,0.12)] text-th-text hover:border-th-red hover:text-th-red'}`}>
            <i className="fa-solid fa-heart" /> {isWished ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
          </button>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {['🚚 Free Delivery', '🔄 Easy Returns', '🛡️ 2 Year Warranty', '⭐ Genuine Product'].map(f => (
              <span key={f} className="text-[11px] text-th-accent px-3.5 py-1.5 rounded-[20px]" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
