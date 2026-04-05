import { useState } from 'react';
import { useStore } from '@/context/StoreContext';

const Navbar = () => {
  const { cart, showPage, currentPage, wishlist } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const navTo = (page: string) => { showPage(page); setMobileOpen(false); };

  const handleNavClick = (label: string, id: string) => {
    if (id === 'deals' || id === 'about') {
      navTo('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navTo(id);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showPage('products');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center justify-between px-[5%]" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="font-display text-[28px] tracking-[4px] cursor-pointer" onClick={() => navTo('home')}>
          TECH<span className="text-th-accent">HUB</span>
        </div>

        <ul className="hidden md:flex gap-9">
          {[['HOME', 'home'], ['PRODUCTS', 'products'], ['DEALS', 'deals'], ['ABOUT', 'about']].map(([label, id]) => (
            <li key={id}>
              <button onClick={() => handleNavClick(label, id)} className={`text-[12px] uppercase tracking-[2px] transition-colors duration-200 font-body ${currentPage === id ? 'text-th-accent' : 'text-th-text2 hover:text-th-accent'}`}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-3xl border border-th-bg3 hover:border-th-accent/30 transition-colors" style={{ background: 'hsl(0,0%,8.2%)' }}>
            <i className="fa-solid fa-search text-[13px] text-th-text3" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..." className="bg-transparent border-none outline-none text-[13px] font-body w-[160px] text-th-text placeholder:text-th-text3" />
          </form>

          <button onClick={() => navTo('wishlist')} className="relative w-10 h-10 rounded-full border border-th-bg3 flex items-center justify-center hover:border-th-red/50 transition-colors group">
            <i className="fa-solid fa-heart text-[15px] text-th-text3 group-hover:text-th-red transition-colors" />
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-th-red text-[10px] font-mono font-bold flex items-center justify-center text-th-text">{wishlist.length}</span>}
          </button>

          <button onClick={() => navTo('cart')} className="relative w-10 h-10 rounded-full border border-th-bg3 flex items-center justify-center hover:border-th-accent/50 transition-colors group">
            <i className="fa-solid fa-shopping-cart text-[15px] text-th-text3 group-hover:text-th-accent transition-colors" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-th-accent text-[10px] font-mono font-bold flex items-center justify-center" style={{ color: '#080808' }}>{totalItems}</span>}
          </button>

          <button className="hidden md:flex w-10 h-10 rounded-full border border-th-bg3 items-center justify-center hover:border-th-accent/50 transition-colors group">
            <i className="fa-solid fa-user text-[15px] text-th-text3 group-hover:text-th-accent transition-colors" />
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 rounded-full border border-th-bg3 flex items-center justify-center">
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-th-text`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8" style={{ background: 'rgba(8,8,8,0.97)' }}>
          {[['HOME', 'home'], ['PRODUCTS', 'products'], ['DEALS', 'deals'], ['ABOUT', 'about']].map(([label, id]) => (
            <button key={label} onClick={() => handleNavClick(label, id)} className="font-display text-5xl tracking-[4px] text-th-text hover:text-th-accent transition-colors">{label}</button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
