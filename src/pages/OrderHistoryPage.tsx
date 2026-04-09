import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';

const OrderHistoryPage = () => {
  const { orderHistory, searchOrders, showPage } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const filteredOrders = searchQuery.trim() ? searchOrders(searchQuery) : orderHistory;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-th-accent';
      case 'packed': return 'text-th-accent3';
      case 'shipped': return 'text-th-blue';
      case 'delivered': return 'text-th-green';
      default: return 'text-th-text2';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return 'fa-circle-check';
      case 'packed': return 'fa-box';
      case 'shipped': return 'fa-truck';
      case 'delivered': return 'fa-check-double';
      default: return 'fa-circle';
    }
  };

  if (orderHistory.length === 0) {
    return (
      <div className="pt-[120px] pb-20 px-[5%] page-enter text-center">
        <span className="text-[80px] block mb-4">📦</span>
        <h1 className="font-display text-3xl mb-2">NO ORDERS YET</h1>
        <p className="text-sm text-th-text2 mb-8">You haven't placed any orders yet</p>
        <button onClick={() => showPage('products')} className="px-8 py-3.5 rounded bg-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-[#33eeff] transition-all" style={{ color: '#080808' }}>START SHOPPING</button>
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <h1 className="font-display text-5xl mb-8">ORDER HISTORY</h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-th-text3" />
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all"
            style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }}
          />
        </div>
        {searchQuery.trim() && (
          <p className="text-[12px] text-th-text3 mt-2">
            Found <span className="text-th-accent font-semibold">{filteredOrders.length}</span> order{filteredOrders.length !== 1 ? 's' : ''} matching "<span className="font-semibold text-th-text">{searchQuery}</span>"
          </p>
        )}
      </div>

      {/* Orders List */}
      {(filteredOrders.length === 0 && searchQuery.trim()) ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-magnifying-glass text-4xl text-th-text3 mb-4" />
          <p className="text-th-text2 mb-2">No products match your search</p>
          <p className="text-[12px] text-th-text3">Try searching by product name or brand</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-inbox text-4xl text-th-text3 mb-4" />
          <p className="text-th-text2">No orders to display</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden transition-all hover:border-th-accent/30"
              style={{ background: 'hsl(0,0%,6.7%)' }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-th-bg3 transition-colors"
              >
                <div className="flex items-center gap-5 flex-1 text-left">
                  <div>
                    <p className="font-mono text-th-accent font-semibold">{order.orderNumber}</p>
                    <p className="text-[12px] text-th-text3 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-th-text2 truncate">{order.items.length} item(s) • {formatPrice(order.totals.total)}</p>
                    <p className="text-[12px] text-th-text3">{order.address.city}, {order.address.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className={`text-[13px] font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      <i className={`fa-solid ${getStatusIcon(order.status)}`} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                  <i className={`fa-solid fa-chevron-${expandedOrder === order.id ? 'up' : 'down'} text-th-text3 transition-transform`} />
                </div>
              </button>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-[rgba(255,255,255,0.07)] p-5 space-y-5">
                  {/* Order Items */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">ORDER ITEMS</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-sm p-3 rounded bg-th-bg2">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded flex items-center justify-center bg-th-bg3 shrink-0">
                              {item.emoji.startsWith('/') || item.emoji.startsWith('http') ? (
                                <img src={item.emoji} alt={item.name} className="w-full h-full object-cover rounded" />
                              ) : (
                                <span className="text-sm">{item.emoji}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-th-accent uppercase">{item.brand}</p>
                              <p className="text-sm truncate">{item.name}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <p className="font-mono text-[12px] font-semibold">×{item.qty}</p>
                            <p className="font-mono text-[12px] text-th-text3">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">DELIVERY ADDRESS</h4>
                    <div className="p-3 rounded bg-th-bg2 text-sm space-y-1">
                      <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                      <p className="text-th-text3">{order.address.address1}</p>
                      {order.address.address2 && <p className="text-th-text3">{order.address.address2}</p>}
                      <p className="text-th-text3">{order.address.city}, {order.address.state} {order.address.pinCode}</p>
                      <p className="text-th-text3">📞 {order.address.phone}</p>
                      <p className="text-th-text3">📧 {order.address.email}</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">ORDER SUMMARY</h4>
                    <div className="p-3 rounded bg-th-bg2 space-y-2 text-sm">
                      <div className="flex justify-between text-th-text3">
                        <span>Subtotal</span>
                        <span className="font-mono">{formatPrice(order.totals.subtotal)}</span>
                      </div>
                      {order.totals.discount > 0 && (
                        <div className="flex justify-between text-th-green">
                          <span>Discount</span>
                          <span className="font-mono">-{formatPrice(order.totals.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-th-text3">
                        <span>Delivery</span>
                        <span className="font-mono">{order.totals.delivery === 0 ? 'FREE' : formatPrice(order.totals.delivery)}</span>
                      </div>
                      <div className="flex justify-between text-th-text3">
                        <span>GST (18%)</span>
                        <span className="font-mono">{formatPrice(order.totals.gst)}</span>
                      </div>
                      <div className="border-t border-[rgba(255,255,255,0.07)] pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="font-mono text-th-accent">{formatPrice(order.totals.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded bg-th-bg2">
                      <p className="text-[11px] text-th-text3 uppercase tracking-[1px] mb-1">Delivery Type</p>
                      <p className="font-semibold capitalize">{order.deliveryType}</p>
                    </div>
                    <div className="p-3 rounded bg-th-bg2">
                      <p className="text-[11px] text-th-text3 uppercase tracking-[1px] mb-1">Payment Method</p>
                      <p className="font-semibold capitalize">{order.paymentMethod}</p>
                    </div>
                    <div className="p-3 rounded bg-th-bg2">
                      <p className="text-[11px] text-th-text3 uppercase tracking-[1px] mb-1">Ordered On</p>
                      <p className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="p-3 rounded bg-th-bg2">
                      <p className="text-[11px] text-th-text3 uppercase tracking-[1px] mb-1">Expected Delivery</p>
                      <p className="font-semibold">
                        {new Date(order.deliveryDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mb-3">STATUS TIMELINE</h4>
                    <div className="space-y-2">
                      {['confirmed', 'packed', 'shipped', 'delivered'].map((status, idx) => (
                        <div key={status} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                            ['confirmed', 'packed', 'shipped', 'delivered'].indexOf(order.status) >= idx
                              ? `bg-th-accent text-th-bg`
                              : 'bg-th-bg3 text-th-text3'
                          }`}>
                            <i className={`fa-solid ${getStatusIcon(status)}`} />
                          </div>
                          <span className={`text-[13px] capitalize font-semibold ${
                            ['confirmed', 'packed', 'shipped', 'delivered'].indexOf(order.status) >= idx
                              ? getStatusColor(status)
                              : 'text-th-text3'
                          }`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => showPage('cart')}
                    className="w-full py-2.5 rounded border border-th-accent text-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-th-accent hover:text-th-bg transition-all"
                  >
                    REORDER
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
