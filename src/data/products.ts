export interface Product {
  id: number;
  brand: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge: 'NEW' | 'SALE' | 'HOT';
  img: string;
  description: string;
  specs: Record<string, string>;
}

export const products: Product[] = [
  { id: 1, brand: 'Apple', name: 'iPhone 16 Pro Max', category: 'smartphones', price: 134900, oldPrice: 144900, rating: 4.8, reviews: 2847, badge: 'NEW', img: '/images/igor-omilaev-lDWTfYhZ85w-unsplash.jpg', description: 'The most advanced iPhone ever with A18 Pro chip, 48MP camera system, and titanium design.', specs: { Processor: 'A18 Pro', RAM: '8 GB', Storage: '256 GB', Camera: '48 MP', Battery: '4685 mAh', Display: '6.9" OLED' } },
  { id: 2, brand: 'Samsung', name: 'Galaxy S25 Ultra', category: 'smartphones', price: 129999, rating: 4.7, reviews: 1923, badge: 'HOT', img: '/images/amanz-mzNVfDZMUPA-unsplash.jpg', description: 'Samsung\'s flagship with Snapdragon 8 Elite, S Pen, and 200MP camera.', specs: { Processor: 'Snapdragon 8 Elite', RAM: '12 GB', Storage: '256 GB', Camera: '200 MP', Battery: '5000 mAh', Display: '6.8" AMOLED' } },
  { id: 3, brand: 'Sony', name: 'WH-1000XM6', category: 'audio', price: 29990, oldPrice: 34990, rating: 4.9, reviews: 5621, badge: 'SALE', img: '/images/yearone-oplCWB9A0bI-unsplash.jpg', description: 'Industry-leading noise cancellation with exceptional sound quality and 40-hour battery life.', specs: { Driver: '40mm', ANC: 'Yes', Battery: '40 Hours', Codec: 'LDAC', Weight: '250g', Connectivity: 'BT 5.3' } },
  { id: 4, brand: 'Apple', name: 'MacBook Pro M4', category: 'laptops', price: 199900, rating: 4.9, reviews: 3104, badge: 'NEW', img: '/images/thai-nguyen-ylqeFa_-PvA-unsplash.jpg', description: 'Supercharged by M4 Pro chip with 18-hour battery life and stunning Liquid Retina XDR display.', specs: { Processor: 'M4 Pro', RAM: '18 GB', Storage: '512 GB SSD', Display: '14.2" XDR', Battery: '18 Hours', Weight: '1.55 kg' } },
  { id: 5, brand: 'LG', name: 'OLED C4 65" TV', category: 'tvs', price: 159990, oldPrice: 189990, rating: 4.8, reviews: 892, badge: 'SALE', img: '/images/mohammad-dadkhah-nj9SdbmgIjI-unsplash.jpg', description: 'Perfect blacks, infinite contrast, and AI-powered 4K processing for the ultimate home theater.', specs: { Panel: 'OLED evo', Resolution: '4K', Refresh: '120Hz', HDR: 'Dolby Vision', Sound: 'Dolby Atmos', Size: '65 inch' } },
  { id: 6, brand: 'Sony', name: 'PlayStation 5 Pro', category: 'gaming', price: 59990, rating: 4.7, reviews: 4201, badge: 'HOT', img: '/images/amanz-yibOmgEXVAI-unsplash.jpg', description: 'Next-gen gaming with ray tracing, 8K support, and ultra-fast SSD for instant loading.', specs: { GPU: 'RDNA 3', Storage: '2 TB SSD', RAM: '16 GB', Output: '8K/4K', Controller: 'DualSense', 'Disc Drive': 'Yes' } },
  { id: 7, brand: 'Apple', name: 'Apple Watch Ultra 2', category: 'wearables', price: 89900, rating: 4.8, reviews: 1567, badge: 'NEW', img: '/images/jerry-kavan-P9oY49S5aCU-unsplash.jpg', description: 'The most rugged Apple Watch with precision GPS, 36-hour battery, and titanium case.', specs: { Display: '49mm', Battery: '36 Hours', Water: '100m', GPS: 'Precision L5', Material: 'Titanium', Sensor: 'SpO2 + ECG' } },
  { id: 8, brand: 'Bose', name: 'QuietComfort Ultra', category: 'audio', price: 24900, oldPrice: 31000, rating: 4.7, reviews: 3388, badge: 'SALE', img: '/images/maulik-sutariya-UM5PijgDMCQ-unsplash.jpg', description: 'Immersive spatial audio with world-class noise cancellation and plush comfort.', specs: { Driver: '35mm', ANC: 'Yes', Battery: '24 Hours', Codec: 'aptX', Weight: '254g', Connectivity: 'BT 5.3' } },
  { id: 9, brand: 'Dell', name: 'XPS 15 OLED', category: 'laptops', price: 179990, oldPrice: 199990, rating: 4.7, reviews: 1456, badge: 'SALE', img: '/images/ra-dragon-2nCeVeFWA_c-unsplash.jpg', description: 'InfinityEdge OLED display with Intel Core Ultra processor and premium build quality.', specs: { Processor: 'Core Ultra 9', RAM: '32 GB', Storage: '1 TB SSD', Display: '15.6" OLED', Battery: '13 Hours', Weight: '1.86 kg' } },
  { id: 10, brand: 'Asus', name: 'ROG Zephyrus G16', category: 'laptops', price: 189990, rating: 4.8, reviews: 987, badge: 'HOT', img: '/images/back2gaming-02U1nyNm16c-unsplash.jpg', description: 'Ultra-slim gaming laptop with RTX 4090 and 240Hz OLED display.', specs: { Processor: 'Core i9-14900H', RAM: '32 GB', Storage: '2 TB SSD', GPU: 'RTX 4090', Display: '16" OLED', Weight: '1.85 kg' } },
  { id: 11, brand: 'OnePlus', name: '13 Pro', category: 'smartphones', price: 69999, oldPrice: 74999, rating: 4.6, reviews: 2134, badge: 'SALE', img: '/images/ph-c-sang-mbWw9GLKCmI-unsplash.jpg', description: 'Hasselblad camera system with the latest Snapdragon processor.', specs: { Processor: 'Snapdragon 8 Gen 4', RAM: '12 GB', Storage: '256 GB', Camera: '50 MP', Battery: '6000 mAh', Display: '6.82" AMOLED' } },
  { id: 12, brand: 'Xiaomi', name: '14 Ultra', category: 'smartphones', price: 99999, rating: 4.6, reviews: 1876, badge: 'NEW', img: '/images/kevin-wang-JmbPKsB0K_k-unsplash.jpg', description: 'Leica optics with 1-inch sensor and Snapdragon 8 Gen 3 performance.', specs: { Processor: 'Snapdragon 8 Gen 3', RAM: '16 GB', Storage: '512 GB', Camera: '50 MP Leica', Battery: '5300 mAh', Display: '6.73" AMOLED' } },
  { id: 13, brand: 'JBL', name: 'Xtreme 4', category: 'audio', price: 19999, oldPrice: 24999, rating: 4.5, reviews: 3210, badge: 'SALE', img: '/images/nejc-soklic-g5Y5kjOwGwQ-unsplash.jpg', description: 'Portable powerhouse with massive bass and 24 hours of playtime.', specs: { Driver: '2x 70mm', Battery: '24 Hours', Water: 'IP67', Output: '100W', Weight: '2.1 kg', Connectivity: 'BT 5.3' } },
  { id: 14, brand: 'Samsung', name: 'Galaxy Watch 7', category: 'wearables', price: 32999, rating: 4.6, reviews: 1543, badge: 'NEW', img: '/images/daniel-romero-VBCWHVc0aGk-unsplash.jpg', description: 'Advanced health monitoring with Galaxy AI and sleek design.', specs: { Display: '44mm AMOLED', Battery: '40 Hours', Water: '5ATM+IP68', GPS: 'Dual-band', Material: 'Aluminum', OS: 'Wear OS 5' } },
  { id: 15, brand: 'Asus', name: 'ROG Ally X', category: 'gaming', price: 89990, rating: 4.7, reviews: 876, badge: 'HOT', img: '/images/gamercomp-ru-aqk9DahMxUw-unsplash.jpg', description: 'Windows gaming handheld with AMD Z1 Extreme and 7-inch 120Hz display.', specs: { Processor: 'AMD Z1 Extreme', RAM: '24 GB', Storage: '1 TB SSD', Display: '7" 120Hz', Battery: '80 Wh', Weight: '678g' } },
  { id: 16, brand: 'Sony', name: 'Bravia 9 55"', category: 'tvs', price: 129990, oldPrice: 149990, rating: 4.9, reviews: 654, badge: 'SALE', img: '/images/85mm-ca-5NE6xo4g2y8-unsplash.jpg', description: 'Mini LED with XR Processor for breathtaking picture quality.', specs: { Panel: 'Mini LED', Resolution: '4K', Refresh: '120Hz', HDR: 'Dolby Vision', Sound: 'Acoustic Multi-Audio', Size: '55 inch' } },
];

export const categories = [
  { emoji: '📱', name: 'Smartphones', slug: 'smartphones', count: 240 },
  { emoji: '💻', name: 'Laptops', slug: 'laptops', count: 185 },
  { emoji: '🎧', name: 'Audio', slug: 'audio', count: 320 },
  { emoji: '📺', name: 'TVs', slug: 'tvs', count: 95 },
  { emoji: '⌚', name: 'Wearables', slug: 'wearables', count: 150 },
  { emoji: '🎮', name: 'Gaming', slug: 'gaming', count: 210 },
];

export const formatPrice = (price: number) => {
  return '₹' + price.toLocaleString('en-IN');
};
