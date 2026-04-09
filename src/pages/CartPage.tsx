import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import { useState } from 'react';

const CartPage = () => {
  const { cart, removeFromCart, updateQty, showPage, cartTotal, applyPromo, promoApplied } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const totals = cartTotal();

  if (cart.length === 0) {
    return (
      <div className="pt-[120px] pb-20 px-[5%] page-enter text-center">
        <span className="text-[80px] block mb-4">🛒</span>
        <h1 className="font-display text-3xl mb-2">YOUR CART IS EMPTY</h1>
        <p className="text-sm text-th-text2 mb-8">Looks like you haven't added anything yet</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => showPage('products')} className="px-8 py-3.5 rounded bg-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-[#33eeff] transition-all" style={{ color: '#080808' }}>CONTINUE SHOPPING</button>
          <button onClick={() => showPage('order-history')} className="px-8 py-3.5 rounded border border-th-accent text-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-th-accent hover:text-th-bg transition-all">VIEW ORDER HISTORY</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <h1 className="font-display text-5xl mb-2">YOUR CART <span className="text-th-accent text-2xl">({cart.reduce((s, i) => s + i.qty, 0)})</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8">
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-5 py-5 border-b border-[rgba(255,255,255,0.07)]">
              <div className="w-[70px] h-[70px] rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'hsl(0,0%,6.7%)' }}>
                {item.emoji.startsWith('/') || item.emoji.startsWith('http') ? (
                  <img src={item.emoji} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[40px]">{item.emoji}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-th-accent uppercase tracking-[2px]">{item.brand}</p>
                <p className="text-base font-semibold truncate">{item.name}</p>
              </div>
              <span className="font-mono text-lg font-bold shrink-0">{formatPrice(item.price)}</span>
              <div className="flex items-center shrink-0">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.07)] flex items-center justify-center hover:border-th-accent hover:text-th-accent transition-colors"><i className="fa-solid fa-minus text-[11px]" /></button>
                <span className="font-mono text-base min-w-[40px] text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.07)] flex items-center justify-center hover:border-th-accent hover:text-th-accent transition-colors"><i className="fa-solid fa-plus text-[11px]" /></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-th-text3 hover:text-th-red transition-colors p-2"><i className="fa-solid fa-trash text-sm" /></button>
            </div>
          ))}
          <div className="flex gap-3 mt-4">
            <button onClick={() => showPage('products')} className="text-th-accent text-[13px] hover:underline">← Continue Shopping</button>
            <button onClick={() => showPage('order-history')} className="text-th-accent text-[13px] hover:underline">View Order History →</button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-[90px] self-start p-7 rounded-[20px] border border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,6.7%)' }}>
          <h3 className="font-display text-[28px] mb-6">ORDER SUMMARY</h3>
          
          {[['Subtotal', formatPrice(totals.subtotal)],
            ...(totals.discount > 0 ? [['Discount', `- ${formatPrice(totals.discount)}`]] : []),
            ['Delivery', totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)],
            ['GST (18%)', formatPrice(totals.gst)],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between text-sm mb-3.5">
              <span className="text-th-text2">{label}</span>
              <span className={`${label === 'Discount' ? 'text-th-green' : ''} ${value === 'FREE' ? 'text-th-green' : ''}`}>{value}</span>
            </div>
          ))}

          <div className="border-t border-[rgba(255,255,255,0.07)] my-5" />
          <div className="flex justify-between items-center mb-6">
            <span className="font-display text-2xl">TOTAL</span>
            <span className="font-mono text-[28px] font-bold text-th-accent">{formatPrice(totals.total)}</span>
          </div>

          {totals.discount > 0 && <p className="text-th-green text-[12px] text-center mb-5">You save {formatPrice(totals.discount)} on this order!</p>}

          <button onClick={() => showPage('checkout')} className="w-full py-[18px] rounded bg-th-accent text-[14px] font-bold uppercase tracking-[2px] hover:bg-[#33eeff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,229,255,0.25)] transition-all" style={{ color: '#080808' }}>PROCEED TO CHECKOUT →</button>

          <div className="flex justify-center gap-4 mt-4">
            <span className="text-[11px] text-th-text3 flex items-center gap-1"><i className="fa-solid fa-lock text-[10px]" /> Secure Checkout</span>
            <span className="text-[11px] text-th-text3 flex items-center gap-1"><i className="fa-solid fa-shield-halved text-[10px]" /> Buyer Protection</span>
          </div>

          {/* Promo */}
          <div className="mt-6">
            <p className="text-[11px] uppercase text-th-text3 tracking-[1.5px] mb-2">PROMO CODE</p>
            <div className="flex gap-2">
              <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter code" className="flex-1 px-3 py-2.5 rounded text-sm bg-transparent border border-[rgba(255,255,255,0.12)] outline-none text-th-text font-body focus:border-th-accent" />
              <button onClick={() => applyPromo(promoCode)} disabled={promoApplied} className="px-4 py-2.5 rounded bg-th-accent text-[12px] font-bold uppercase disabled:opacity-50 transition-colors" style={{ color: '#080808' }}>APPLY</button>
            </div>
            {promoApplied && <p className="text-th-green text-[12px] mt-2">✓ 10% discount applied!</p>}
          </div>

          <div className="flex flex-wrap gap-2 mt-5 justify-center">
            {['VISA', 'MC', 'AMEX', 'UPI', 'RUPAY', 'NET BANKING'].map(b => (
              <span key={b} className="font-mono text-[10px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-th-text3">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
