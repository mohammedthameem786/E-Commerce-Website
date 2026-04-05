import { useStore } from '@/context/StoreContext';

const Footer = () => {
  const { showPage } = useStore();

  const cols = [
    { title: 'PRODUCTS', links: ['Smartphones', 'Laptops', 'Audio', 'TVs', 'Wearables', 'Gaming', 'New Arrivals', 'Best Sellers'] },
    { title: 'COMPANY', links: ['About Us', 'Careers', 'Press', 'Blog', 'Investors', 'CSR'] },
    { title: 'SUPPORT', links: ['Help Center', 'Track Order', 'Returns', 'Warranty', 'Store Locator', 'EMI Help'] },
    { title: 'LEGAL', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility', 'Sitemap'] },
  ];

  const socials = [
    { icon: 'fa-instagram', hover: 'hover:text-pink-500 hover:border-pink-500' },
    { icon: 'fa-twitter', hover: 'hover:text-th-accent hover:border-th-accent' },
    { icon: 'fa-youtube', hover: 'hover:text-th-red hover:border-th-red' },
    { icon: 'fa-linkedin', hover: 'hover:text-blue-500 hover:border-blue-500' },
    { icon: 'fa-facebook', hover: 'hover:text-blue-600 hover:border-blue-600' },
  ];

  const paymentBadges = ['VISA', 'MC', 'AMEX', 'UPI', 'RUPAY', 'NET BANKING'];

  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] px-[5%] pt-20 pb-10" style={{ background: '#050505' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="font-display text-3xl tracking-[4px] mb-4 cursor-pointer" onClick={() => showPage('home')}>
            TECH<span className="text-th-accent">HUB</span>
          </div>
          <p className="text-[13px] text-th-text3 mb-6 leading-relaxed">India's most trusted electronics destination</p>
          <div className="flex gap-3">
            {socials.map(s => (
              <button key={s.icon} className={`w-10 h-10 rounded-full border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-th-text3 transition-all duration-200 ${s.hover}`}>
                <i className={`fa-brands ${s.icon}`} />
              </button>
            ))}
          </div>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 className="text-[12px] uppercase tracking-[2px] mb-5 text-th-text">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map(link => (
                <li key={link}><button className="text-[13px] text-th-text3 hover:text-th-accent transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(255,255,255,0.07)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-th-text3">© 2025 Tech HUB. All rights reserved. Made in India 🇮🇳</p>
        <div className="flex gap-2 flex-wrap">
          {paymentBadges.map(b => (
            <span key={b} className="font-mono text-[10px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-th-text3">{b}</span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
