import { useStore } from '@/context/StoreContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const WishlistPage = () => {
  const { wishlist, showPage } = useStore();
  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishedProducts.length === 0) {
    return (
      <div className="pt-[120px] pb-20 px-[5%] page-enter text-center">
        <span className="text-[80px] block mb-4">💝</span>
        <h1 className="font-display text-3xl mb-2">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-sm text-th-text2 mb-8">Save your favorite items for later</p>
        <button onClick={() => showPage('products')} className="px-8 py-3.5 rounded bg-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-[#33eeff] transition-all" style={{ color: '#080808' }}>BROWSE PRODUCTS</button>
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <h1 className="font-display text-5xl mb-10">MY WISHLIST <span className="text-th-accent text-2xl">({wishedProducts.length})</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishedProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default WishlistPage;
