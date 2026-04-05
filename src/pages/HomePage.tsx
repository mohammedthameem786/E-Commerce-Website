import { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { products, categories, formatPrice } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const { showPage, setCategoryFilter } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [countdown, setCountdown] = useState({ h: '23', m: '59', s: '59', ms: '99' });
  const filterCats = ['all', 'smartphones', 'laptops', 'audio', 'gaming', 'wearables', 'tvs'];
  const featured = products.slice(0, 8);
  const filtered = activeFilter === 'all' ? featured : featured.filter(p => p.category === activeFilter);

  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
        ms: String(Math.floor((diff % 1000) / 10)).padStart(2, '0'),
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-[5%] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(0,229,255,0.06), transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,58,237,0.08), transparent 60%), linear-gradient(180deg, hsl(0,0%,3.1%), hsl(0,0%,5.9%))' }} />
        <div className="grid-bg" />

        <div className="relative z-[2] max-w-[700px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-3xl mb-7 animate-fadeUp" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-th-accent animate-pulse-dot" />
            <span className="text-[11px] font-semibold tracking-[2px] uppercase text-th-accent">NEW ARRIVALS 2025</span>
          </div>

          <h1 className="font-display leading-[0.9] tracking-[-2px] mb-6 animate-fadeUp fill-forwards delay-100" style={{ fontSize: 'clamp(72px, 12vw, 140px)' }}>
            NEXT-GEN<br /><span className="text-th-accent">TECH HUB</span>
          </h1>

          <p className="text-base font-light text-th-text2 leading-[1.8] max-w-[480px] mb-8 animate-fadeUp fill-forwards delay-200">
            Discover the future of technology. Premium electronics, unbeatable performance, delivered to your door.
          </p>

          <div className="flex gap-4 animate-fadeUp fill-forwards delay-300">
            <button onClick={() => showPage('products')} className="px-8 py-3.5 rounded text-[13px] font-bold uppercase tracking-[1.5px] bg-th-accent hover:bg-[#33eeff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,229,255,0.25)] transition-all" style={{ color: '#080808' }}>SHOP NOW →</button>
            <button onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded text-[13px] font-bold uppercase tracking-[1.5px] border border-[rgba(255,255,255,0.12)] text-th-text hover:border-th-accent hover:text-th-accent hover:-translate-y-0.5 transition-all bg-transparent">VIEW DEALS</button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 animate-fadeUp fill-forwards delay-500" style={{ marginTop: '32px', alignItems: 'flex-end' }}>
            {[['10K+', 'PRODUCTS'], ['500+', 'BRANDS'], ['1M+', 'CUSTOMERS']].map(([num, label]) => (
              <div key={label}>
                <span className="font-display text-4xl text-th-accent">{num}</span>
                <span className="block text-[11px] uppercase text-th-text3 tracking-[2px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual - desktop only */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[42%] hidden lg:flex items-center justify-center animate-fadeIn fill-forwards delay-400">
          <div className="relative w-[420px] h-[420px] flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] rounded-full bg-th-accent/20 blur-[80px] animate-glow" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-th-accent/15 animate-spin-slow" />
            <div className="absolute w-[260px] h-[260px] rounded-full border border-th-accent/15 animate-spin-slow-reverse" />
            <span className="text-[160px] animate-float z-[2]" style={{ filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.3))' }}>💻</span>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase text-th-text3 tracking-[2px]">SCROLL</span>
          <div className="w-px h-10 animate-scrollAnim" style={{ background: 'linear-gradient(to bottom, hsl(187,100%,50%), transparent)' }} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-[100px] px-[5%]" style={{ background: 'hsl(0,0%,3.1%)' }}>
        <p className="text-[11px] uppercase tracking-[3px] text-th-accent mb-3">SHOP BY CATEGORY</p>
        <h2 className="font-display mb-12" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>EXPLORE OUR RANGE</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <button key={cat.slug} onClick={() => { setCategoryFilter(cat.slug); showPage('products'); }} className="cat-card group relative text-center p-7 rounded-xl border border-[rgba(255,255,255,0.07)] hover:-translate-y-1 hover:border-th-accent/30 transition-all duration-300 overflow-hidden" style={{ background: 'hsl(0,0%,6.7%)' }}>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-th-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <span className="text-4xl block mb-3">{cat.emoji}</span>
              <span className="text-[12px] font-bold tracking-[1px] uppercase text-th-text2 group-hover:text-th-accent transition-colors">{cat.name}</span>
              <span className="block text-[11px] text-th-text3 mt-1">{cat.count} products</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-[100px] px-[5%] border-t border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,5.9%)' }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] text-th-accent mb-3">FEATURED PRODUCTS</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>TRENDING NOW</h2>
          </div>
          <button onClick={() => showPage('products')} className="text-th-accent text-[13px] hover:underline">View All →</button>
        </div>

        <div className="flex gap-2.5 mb-10 flex-wrap">
          {filterCats.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-3xl border text-[13px] font-body transition-all ${activeFilter === cat ? 'bg-th-accent border-th-accent' : 'border-[rgba(255,255,255,0.07)] hover:border-th-accent/30'}`} style={activeFilter === cat ? { color: '#080808' } : {}}>
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Flash Deals */}
      <section id="deals" className="py-20 px-[5%] border-t border-b border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,5.9%)' }}>
        <p className="text-[11px] uppercase tracking-[3px] text-th-accent mb-3">LIMITED TIME OFFER</p>
        <h2 className="font-display mb-10" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>FLASH DEALS</h2>

        <div className="flex flex-col lg:flex-row items-center gap-10 p-10 rounded-[20px] border border-[rgba(255,255,255,0.07)] relative overflow-hidden" style={{ background: 'hsl(0,0%,6.7%)' }}>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-th-accent/5 blur-[100px] rounded-full" />
          
          <div className="bg-th-red text-th-text font-display text-5xl py-4 px-6 rounded-xl min-w-[120px] text-center leading-none">40%<br />OFF</div>
          
          <div className="flex-1">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-th-red mb-2">⚡ FLASH DEAL</p>
            <h3 className="font-display text-5xl leading-none mb-3">Sony OLED 4K TV</h3>
            <p className="text-sm font-light text-th-text2">65-inch OLED panel, 120Hz, Dolby Vision & Atmos, perfect for home theater</p>
            <button onClick={() => showPage('products')} className="mt-5 px-6 py-3 rounded border border-th-accent text-th-accent text-[13px] font-semibold uppercase tracking-[1.5px] hover:bg-th-accent hover:text-th-bg transition-all bg-transparent">Shop This Deal →</button>
          </div>

          <div className="flex gap-4">
            {[{ v: countdown.h, l: 'HRS' }, { v: countdown.m, l: 'MIN' }, { v: countdown.s, l: 'SEC' }, { v: countdown.ms, l: 'MS' }].map(t => (
              <div key={t.l} className="text-center px-5 py-4 rounded-[10px] border border-[rgba(255,255,255,0.07)] min-w-[70px]" style={{ background: 'hsl(0,0%,8.2%)' }}>
                <span className="font-mono text-[32px] font-bold text-th-accent leading-none">{t.v}</span>
                <span className="block text-[10px] tracking-[1.5px] uppercase text-th-text3 mt-1">{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-8 px-[5%] border-t border-b border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,5.9%)' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'fa-truck', title: 'Free Delivery', sub: 'On orders above ₹999' },
            { icon: 'fa-rotate-left', title: 'Easy Returns', sub: '15-day hassle-free returns' },
            { icon: 'fa-shield-halved', title: '2 Year Warranty', sub: 'On all electronics' },
            { icon: 'fa-headset', title: '24/7 Support', sub: 'Expert help anytime' },
          ].map((f, i) => (
            <div key={f.icon} className={`flex items-center gap-4 px-8 py-4 ${i < 3 ? 'lg:border-r border-[rgba(255,255,255,0.07)]' : ''}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
                <i className={`fa-solid ${f.icon} text-xl text-th-accent`} />
              </div>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-[12px] text-th-text3">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[100px] px-[5%]" style={{ background: 'hsl(0,0%,3.1%)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] text-th-accent mb-3">WHO WE ARE</p>
            <h2 className="font-display mb-8" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>ABOUT TECH HUB</h2>
            <p className="text-sm font-light text-th-text2 leading-[1.8] mb-4">Tech HUB is India's leading premium electronics destination, founded in 2020 with a vision to make cutting-edge technology accessible to everyone. We curate the finest electronics from over 500 global brands.</p>
            <p className="text-sm font-light text-th-text2 leading-[1.8] mb-8">With over 1 million satisfied customers and counting, we've become the go-to platform for tech enthusiasts. Our commitment to authenticity, competitive pricing, and exceptional after-sales service sets us apart.</p>
            <div className="grid grid-cols-2 gap-3">
              {[['₹500Cr+', 'Revenue'], ['1M+', 'Customers'], ['10K+', 'Products'], ['500+', 'Brands']].map(([n, l]) => (
                <div key={l} className="p-4 rounded-xl border border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,6.7%)' }}>
                  <span className="font-display text-2xl text-th-accent">{n}</span>
                  <span className="block text-[11px] text-th-text3 uppercase tracking-[1px]">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col gap-4">
            {[{ icon: 'fa-gem', title: 'Premium Selection', desc: 'Handpicked products from the world\'s best brands' },
              { icon: 'fa-tag', title: 'Best Prices', desc: 'Price match guarantee across all categories' },
              { icon: 'fa-bolt', title: 'Fast Delivery', desc: 'Express delivery in 1-2 business days' }].map((c, i) => (
              <div key={c.title} className="p-6 rounded-xl border border-[rgba(255,255,255,0.07)] transition-all hover:-translate-y-1" style={{ background: 'hsl(0,0%,6.7%)', marginLeft: i * 20 }}>
                <i className={`fa-solid ${c.icon} text-2xl text-th-accent mb-3`} />
                <h4 className="text-lg font-semibold mb-1">{c.title}</h4>
                <p className="text-sm text-th-text2">{c.desc}</p>
              </div>
            ))}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-th-accent/10 blur-[120px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-[5%] text-center" style={{ background: 'hsl(0,0%,5.9%)' }}>
        <h2 className="font-display text-6xl mb-4">STAY IN THE LOOP</h2>
        <p className="text-sm text-th-text2 mb-8 max-w-md mx-auto">Get the latest deals, product launches, and tech news delivered straight to your inbox.</p>
        <div className="flex max-w-md mx-auto rounded-full overflow-hidden border border-th-accent/30">
          <input placeholder="Enter your email" className="flex-1 px-6 py-3.5 bg-transparent text-sm font-body outline-none text-th-text placeholder:text-th-text3" />
          <button className="px-8 py-3.5 bg-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-[#33eeff] transition-colors" style={{ color: '#080808' }}>SUBSCRIBE</button>
        </div>
        <p className="text-[11px] text-th-text3 mt-4">No spam. Unsubscribe anytime.</p>
      </section>
    </div>
  );
};

export default HomePage;
