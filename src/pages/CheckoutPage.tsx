import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';

const CheckoutPage = () => {
  const { cart, cartTotal, showPage, applyPromo, promoApplied } = useStore();
  const [step, setStep] = useState(1);
  const [paymentTab, setPaymentTab] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const totals = cartTotal();

  const detectCard = (num: string) => {
    if (num.startsWith('4')) return 'VISA';
    if (num.startsWith('5')) return 'MASTERCARD';
    if (num.startsWith('3')) return 'AMEX';
    if (num.startsWith('6')) return 'RUPAY';
    return '';
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const processPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOrderNumber('TH-' + Math.floor(100000 + Math.random() * 900000));
      setStep(3);
    }, 2500);
  };

  const stepClasses = (s: number) => {
    if (s < step) return 'bg-th-accent text-th-bg border-th-accent';
    if (s === step) return 'border-2 border-th-accent text-th-accent';
    return 'border border-[rgba(255,255,255,0.12)] text-th-text3';
  };

  const banks = [
    { name: 'State Bank of India', color: '#22409a' }, { name: 'HDFC Bank', color: '#e31837' },
    { name: 'ICICI Bank', color: '#f7941d' }, { name: 'Axis Bank', color: '#841b2d' },
    { name: 'Kotak Mahindra', color: '#ed1c24' }, { name: 'Punjab National Bank', color: '#003087' },
    { name: 'Bank of Baroda', color: '#f58220' }, { name: 'Canara Bank', color: '#ffc72c' },
  ];

  const upiApps = [
    { name: 'Google Pay', icon: 'fa-google', color: '#4285f4' },
    { name: 'PhonePe', icon: 'fa-mobile', color: '#5f259f' },
    { name: 'Paytm', icon: 'fa-mobile', color: '#00baf2' },
    { name: 'BHIM', icon: 'fa-indian-rupee-sign', color: '#f58220' },
    { name: 'Amazon Pay', icon: 'fa-amazon', color: '#ff9900' },
    { name: 'WhatsApp', icon: 'fa-whatsapp', color: '#25d366' },
    { name: 'Cred', icon: 'fa-credit-card', color: '#fff' },
    { name: 'MobiKwik', icon: 'fa-wallet', color: '#4a90d9' },
  ];

  const paymentTabs = [
    { id: 'card', icon: '💳', label: 'Card' },
    { id: 'upi', icon: '📱', label: 'UPI' },
    { id: 'netbanking', icon: '🏦', label: 'Net Banking' },
    { id: 'emi', icon: '💰', label: 'EMI' },
    { id: 'bnpl', icon: '🔄', label: 'Pay Later' },
    { id: 'cod', icon: '💵', label: 'COD' },
  ];

  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="pt-[120px] pb-20 px-[5%] page-enter">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        {/* Left */}
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-12">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-xl ${stepClasses(s)}`} style={{ background: s < step ? undefined : 'transparent' }}>
                    {s < step ? <i className="fa-solid fa-check text-sm" /> : s}
                  </div>
                  <span className={`text-[11px] uppercase tracking-[1.5px] ${s <= step ? 'text-th-text' : 'text-th-text3'}`}>
                    {['DELIVERY', 'PAYMENT', 'CONFIRM'][i]}
                  </span>
                </div>
                {i < 2 && <div className={`flex-1 h-px mx-4 ${s < step ? 'bg-th-accent' : 'bg-[rgba(255,255,255,0.07)]'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-[32px] mb-7">DELIVERY INFORMATION</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">First Name</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Last Name</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                </div>
                <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Email Address</label><input type="email" className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Phone Number</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Alternate Phone</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                </div>
                <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Address Line 1</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Address Line 2 (Optional)</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">City</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">State</label><select className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }}><option>Select State</option>{['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'].map(s=><option key={s}>{s}</option>)}</select></div>
                  <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">PIN Code</label><input className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                </div>

                <p className="text-[11px] uppercase tracking-[1.5px] text-th-text2 mt-6 mb-3">SELECT DELIVERY TYPE</p>
                <div className="grid grid-cols-2 gap-3">
                  {[{ id: 'standard', icon: 'fa-truck', color: 'text-th-accent', title: 'Standard Delivery', sub: '5-7 business days', price: 'FREE above ₹999' },
                    { id: 'express', icon: 'fa-bolt', color: 'text-th-accent3', title: 'Express Delivery', sub: '1-2 business days', price: '₹299' }
                  ].map(d => (
                    <button key={d.id} onClick={() => setDeliveryType(d.id)} className={`p-5 rounded-xl text-left transition-all ${deliveryType === d.id ? 'border-2 border-th-accent' : 'border border-[rgba(255,255,255,0.07)]'}`} style={{ background: deliveryType === d.id ? 'rgba(0,229,255,0.05)' : 'hsl(0,0%,6.7%)' }}>
                      <i className={`fa-solid ${d.icon} text-lg ${d.color} mb-2`} />
                      <p className="text-sm font-semibold">{d.title}</p>
                      <p className="text-[12px] text-th-text3">{d.sub}</p>
                      <p className="text-[12px] text-th-text2 mt-1">{d.price}</p>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 rounded bg-th-accent text-[14px] font-bold uppercase tracking-[1.5px] mt-8 hover:bg-[#33eeff] transition-all" style={{ color: '#080808' }}>CONTINUE TO PAYMENT →</button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-[32px] mb-7">CHOOSE PAYMENT METHOD</h2>

              <div className="flex flex-wrap gap-2.5 mb-7">
                {paymentTabs.map(t => (
                  <button key={t.id} onClick={() => setPaymentTab(t.id)} className={`px-5 py-2.5 rounded-3xl text-[13px] font-medium transition-all border ${paymentTab === t.id ? 'bg-th-accent border-th-accent' : 'border-[rgba(255,255,255,0.07)] hover:border-th-accent/30'}`} style={paymentTab === t.id ? { color: '#080808' } : {}}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Card */}
              {paymentTab === 'card' && (
                <div>
                  <div className="w-[400px] max-w-full h-[220px] rounded-2xl p-7 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)' }} />
                    <div className="flex justify-between items-start mb-10">
                      <span className="text-2xl">💳</span>
                      <span className="font-mono text-sm font-bold">{detectCard(cardNumber.replace(/\s/g, ''))}</span>
                    </div>
                    <p className="font-mono text-[22px] tracking-[3px] mb-6">{cardNumber || '•••• •••• •••• ••••'}</p>
                    <div className="flex justify-between text-[12px] text-th-text3">
                      <span>{cardName || 'CARD HOLDER NAME'}</span>
                      <span>{cardExpiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Card Number</label>
                      <input value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" className="w-full px-4 py-3.5 rounded text-sm font-mono outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Cardholder Name</label><input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} className="w-full px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                      <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">Expiry (MM/YY)</label><input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="12/28" className="w-full px-4 py-3.5 rounded text-sm font-mono outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[11px] uppercase tracking-[1.5px] text-th-text2 block mb-2">CVV</label><input type="password" maxLength={3} className="w-full px-4 py-3.5 rounded text-sm font-mono outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} /></div>
                      <div className="flex items-end pb-1"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-[hsl(187,100%,50%)]" /><span className="text-sm text-th-text2">Save this card</span></label></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {[{ label: 'VISA', bg: '#1a1f71' }, { label: 'MC', bg: '#eb001b' }, { label: 'AMEX', bg: '#016fcb' }, { label: 'RUPAY', bg: '#f58220' }, { label: 'MAESTRO', bg: '#0099df' }, { label: 'DISCOVER', bg: '#ff6000' }].map(c => (
                      <span key={c.label} className="text-[11px] font-bold tracking-[1px] px-3.5 py-1.5 rounded-md border border-[rgba(255,255,255,0.07)]" style={{ background: c.bg, color: '#fff' }}>{c.label}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* UPI */}
              {paymentTab === 'upi' && (
                <div>
                  <h3 className="font-display text-[28px] mb-4">PAY VIA UPI</h3>
                  <div className="flex gap-3 mb-6">
                    <input placeholder="yourname@upi" className="flex-1 px-4 py-3.5 rounded text-sm font-body outline-none border border-[rgba(255,255,255,0.12)] focus:border-th-accent transition-all" style={{ background: 'hsl(0,0%,8.2%)', color: 'white' }} />
                    <button className="px-6 py-3.5 rounded bg-th-accent text-sm font-bold" style={{ color: '#080808' }}>VERIFY & PAY</button>
                  </div>
                  <p className="text-[11px] text-th-text3 mb-6"><i className="fa-solid fa-lock mr-1" /> Transaction secured by NPCI</p>
                  <div className="grid grid-cols-4 gap-3">
                    {upiApps.map(app => (
                      <button key={app.name} className="p-4 rounded-xl border border-[rgba(255,255,255,0.07)] flex flex-col items-center gap-2 hover:border-th-accent hover:-translate-y-0.5 transition-all" style={{ background: 'hsl(0,0%,6.7%)' }}>
                        <i className={`fa-brands ${app.icon} text-2xl`} style={{ color: app.color }} />
                        <span className="text-[10px] text-th-text2">{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentTab === 'netbanking' && (
                <div>
                  <h3 className="font-display text-[28px] mb-4">SELECT YOUR BANK</h3>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {banks.map(bank => (
                      <button key={bank.name} className="p-4 rounded-xl border border-[rgba(255,255,255,0.07)] flex flex-col items-center gap-2 hover:border-th-accent transition-all" style={{ background: 'hsl(0,0%,6.7%)' }}>
                        <i className="fa-solid fa-building-columns text-[32px]" style={{ color: bank.color }} />
                        <span className="text-[12px] font-semibold text-center">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                  <button className="w-full py-4 rounded bg-th-accent text-[14px] font-bold uppercase tracking-[1.5px] transition-all" style={{ color: '#080808' }}>PROCEED TO BANK SITE →</button>
                  <p className="text-[11px] text-th-text3 text-center mt-3">You will be redirected to your bank's secure payment page.</p>
                </div>
              )}

              {/* EMI */}
              {paymentTab === 'emi' && (
                <div>
                  <h3 className="font-display text-[28px] mb-4">PAY IN EASY EMIs</h3>
                  <p className="text-sm text-th-text2 mb-6">Order Total: <span className="font-mono font-bold text-th-text">{formatPrice(totals.total)}</span></p>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.07)] overflow-hidden" style={{ background: 'hsl(0,0%,6.7%)' }}>
                    <div className="grid grid-cols-6 text-[11px] uppercase tracking-[1px] text-th-text2 p-4" style={{ background: 'hsl(0,0%,8.2%)' }}>
                      <span>Bank</span><span>3 Mo</span><span>6 Mo</span><span>12 Mo</span><span>18 Mo</span><span>24 Mo</span>
                    </div>
                    {['HDFC', 'ICICI', 'Axis', 'SBI', 'Kotak'].map(bank => (
                      <div key={bank} className="grid grid-cols-6 p-4 border-t border-[rgba(255,255,255,0.07)] text-sm hover:bg-th-bg3 transition-colors">
                        <span className="font-semibold">{bank}</span>
                        {[3, 6, 12, 18, 24].map(m => (
                          <span key={m} className="font-mono text-[13px] text-th-text2 cursor-pointer hover:text-th-accent">{formatPrice(Math.round(totals.total / m))}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-4 text-[12px] text-th-green bg-th-green/10 px-3 py-1 rounded-full">No Cost EMI available on select cards</span>
                </div>
              )}

              {/* BNPL */}
              {paymentTab === 'bnpl' && (
                <div>
                  <h3 className="font-display text-[28px] mb-4">BUY NOW, PAY LATER</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ name: 'Simpl', tag: 'Pay in 3 parts', color: '#6200ea' },
                      { name: 'LazyPay', tag: 'Pay after 15 days', color: '#0066ff' },
                      { name: 'ZestMoney', tag: 'Easy EMI', color: '#00c853' },
                      { name: 'Ola Money', tag: 'Instant credit', color: '#e52929' }
                    ].map(p => (
                      <button key={p.name} className="p-6 rounded-2xl border border-[rgba(255,255,255,0.07)] text-left hover:-translate-y-0.5 transition-all" style={{ background: 'hsl(0,0%,6.7%)' }}>
                        <p className="text-lg font-bold mb-1" style={{ color: p.color }}>{p.name}</p>
                        <p className="text-[12px] text-th-text3 mb-3">{p.tag}</p>
                        <span className="text-th-accent text-[12px] hover:underline">Check Eligibility →</span>
                        <div className="flex gap-1.5 mt-3">
                          {['0% Interest', 'Instant'].map(b => (
                            <span key={b} className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.07)] text-th-text3">{b}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COD */}
              {paymentTab === 'cod' && (
                <div className="text-center py-10">
                  <i className="fa-solid fa-hand-holding-dollar text-6xl text-th-accent3 mb-4" />
                  <h3 className="font-display text-4xl mb-3">Cash on Delivery</h3>
                  <p className="text-sm text-th-text2 max-w-md mx-auto mb-4">Pay when your order arrives. Our delivery partner will collect payment at your doorstep.</p>
                  <span className="inline-block text-[12px] font-bold text-th-accent3 px-3 py-1 rounded-full mb-6" style={{ background: 'rgba(245,158,11,0.15)' }}>₹29 COD fee applies</span>
                  <div className="space-y-2 max-w-xs mx-auto text-left mb-8">
                    {['No advance payment', 'Pay on delivery', 'Supports all pin codes'].map(t => (
                      <p key={t} className="text-sm text-th-text2 flex items-center gap-2"><i className="fa-solid fa-check text-th-green text-xs" /> {t}</p>
                    ))}
                  </div>
                  <button onClick={processPayment} className="w-full max-w-sm py-4 rounded text-[14px] font-bold uppercase tracking-[1.5px] bg-th-accent3 hover:brightness-110 transition-all" style={{ color: '#080808' }}>ORDER WITH COD →</button>
                </div>
              )}

              {/* Back button for step 2 */}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded border border-[rgba(255,255,255,0.12)] text-[14px] font-bold uppercase tracking-[1.5px] hover:border-th-text transition-all">← BACK TO DELIVERY</button>
                {paymentTab !== 'cod' && (
                <div className="flex-1">
                  <button onClick={processPayment} disabled={processing} className="w-full py-[18px] rounded text-[15px] font-bold uppercase tracking-[2px] bg-th-accent hover:bg-[#33eeff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,229,255,0.25)] transition-all disabled:opacity-70" style={{ color: '#080808' }}>
                    {processing ? <><i className="fa-solid fa-spinner fa-spin mr-2" /> Processing...</> : `PAY ${formatPrice(totals.total)} SECURELY →`}
                  </button>
                </div>
                )}
              </div>
                  <div className="flex justify-center gap-5 mb-5 flex-wrap">
                    {[['fa-lock', '256-bit SSL'], ['fa-shield-halved', 'PCI DSS'], ['fa-check-circle', 'RBI Authorized'], ['fa-shield', '3D Secure']].map(([icon, label]) => (
                      <span key={label} className="text-[11px] text-th-text3 flex items-center gap-1.5"><i className={`fa-solid ${icon} text-[10px]`} /> {label}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {['VISA', 'MASTERCARD', 'AMEX', 'RUPAY', 'UPI', 'BHIM', 'GPAY', 'PHONEPE', 'PAYTM', 'EMI', 'COD'].map(b => (
                      <span key={b} className="font-mono text-[10px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-th-text3">{b}</span>
                    ))}
                  </div>
                </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-[120px] h-[120px] rounded-full mx-auto mb-8 flex items-center justify-center animate-scaleIn" style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid hsl(142,71%,45%)' }}>
                <i className="fa-solid fa-check text-5xl text-th-green" />
              </div>
              <h2 className="font-display text-6xl text-th-green mb-3">ORDER CONFIRMED!</h2>
              <p className="font-mono text-lg text-th-text2 mb-2">ORDER #{orderNumber}</p>
              <p className="text-base font-light mb-2">Thank you for shopping with Tech HUB!</p>
              <p className="text-base font-semibold mb-8">Expected by {deliveryDate}</p>

              <div className="max-w-[480px] mx-auto p-6 rounded-xl border border-[rgba(255,255,255,0.07)] mb-8 text-left" style={{ background: 'hsl(0,0%,6.7%)' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-[rgba(255,255,255,0.07)] last:border-0 items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      {item.emoji.startsWith('/') || item.emoji.startsWith('http') ? (
                        <img src={item.emoji} alt={item.name} className="w-6 h-6 object-cover rounded" />
                      ) : (
                        <span>{item.emoji}</span>
                      )}
                      <span>{item.name} ×{item.qty}</span>
                    </div>
                    <span className="font-mono">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-[rgba(255,255,255,0.07)] mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="font-mono text-th-accent">{formatPrice(totals.total)}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 flex-wrap mb-12">
                <button className="px-6 py-3 rounded border border-th-accent text-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-th-accent hover:text-th-bg transition-all bg-transparent"><i className="fa-solid fa-location-dot mr-2" />TRACK ORDER</button>
                <button onClick={() => showPage('home')} className="px-6 py-3 rounded bg-th-accent text-[13px] font-bold uppercase tracking-[1.5px] hover:bg-[#33eeff] transition-all" style={{ color: '#080808' }}>CONTINUE SHOPPING →</button>
              </div>

              <div className="flex justify-center gap-8 flex-wrap">
                {[['📧', 'Order email sent'], ['📦', 'Packed in 24hrs'], ['🚚', 'Delivered in 5-7 days']].map(([icon, text], i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div className="w-12 border-t border-dashed border-[rgba(255,255,255,0.12)]" />}
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm text-th-text2">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:sticky lg:top-[90px] self-start p-7 rounded-[20px] border border-[rgba(255,255,255,0.07)]" style={{ background: 'hsl(0,0%,6.7%)' }}>
          <h3 className="font-display text-[28px] mb-6">ORDER SUMMARY</h3>
          <div className="max-h-[240px] overflow-y-auto space-y-3 mb-6 pr-1">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'hsl(0,0%,8.2%)' }}>
                  {item.emoji.startsWith('/') || item.emoji.startsWith('http') ? (
                    <img src={item.emoji} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">{item.emoji}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-th-accent uppercase">{item.brand}</p>
                  <p className="text-sm truncate">{item.name}</p>
                </div>
                <span className="font-mono text-sm shrink-0">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(255,255,255,0.07)] my-4" />
          {[['Subtotal', formatPrice(totals.subtotal)],
            ...(totals.discount > 0 ? [['Discount', `- ${formatPrice(totals.discount)}`]] : []),
            ['Delivery', totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)],
            ['GST (18%)', formatPrice(totals.gst)],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between text-sm mb-3">
              <span className="text-th-text2">{label}</span>
              <span className={`${label === 'Discount' ? 'text-th-green' : ''} ${value === 'FREE' ? 'text-th-green' : ''}`}>{value}</span>
            </div>
          ))}
          <div className="border-t border-[rgba(255,255,255,0.07)] my-4" />
          <div className="flex justify-between items-center mb-6">
            <span className="font-display text-2xl">TOTAL</span>
            <span className="font-mono text-[28px] font-bold text-th-accent">{formatPrice(totals.total)}</span>
          </div>

          {step <= 2 && (
            <div className="mb-4">
              <p className="text-[11px] uppercase text-th-text3 tracking-[1.5px] mb-2">PROMO CODE</p>
              <div className="flex gap-2">
                <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter code" className="flex-1 px-3 py-2 rounded text-sm bg-transparent border border-[rgba(255,255,255,0.12)] outline-none text-th-text font-body focus:border-th-accent" />
                <button onClick={() => applyPromo(promoCode)} disabled={promoApplied} className="px-3 py-2 rounded bg-th-accent text-[11px] font-bold uppercase disabled:opacity-50" style={{ color: '#080808' }}>APPLY</button>
              </div>
              {promoApplied && <p className="text-th-green text-[12px] mt-2">✓ 10% discount applied!</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[['fa-lock', 'Secure Payment'], ['fa-rotate-left', 'Easy Returns'], ['fa-certificate', '100% Genuine'], ['fa-headset', '24/7 Support']].map(([icon, label]) => (
              <div key={label} className="p-2.5 rounded-lg border border-[rgba(255,255,255,0.07)] flex flex-col items-center gap-1" style={{ background: 'hsl(0,0%,8.2%)' }}>
                <i className={`fa-solid ${icon} text-sm text-th-accent`} />
                <span className="text-[11px] text-th-text3">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
