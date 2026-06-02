import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, ShoppingCart, Wallet, Truck, 
  CheckCircle2, Bell, Sparkles, Plus, 
  ArrowRight, CreditCard, RefreshCw, X, ShieldCheck
} from "lucide-react";
import { Product } from "../types";

// Mock products for the interactive shopping preview
const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", name: "Bayam Organik", category: "sayur", price: 6500, unit: "ikat", image: "🥬", rating: 4.8, isFresh: true },
  { id: "2", name: "Wortel Manis Berastagi", category: "sayur", price: 9000, unit: "500g", image: "🥕", rating: 4.9, isFresh: true },
  { id: "3", name: "Tomat Merah Segar", category: "sayur", price: 8000, unit: "500g", image: "🍅", rating: 4.7, isFresh: false },
  { id: "4", name: "Alpukat Mentega Jumbo", category: "buah", price: 23000, unit: "1kg", image: "🥑", rating: 4.9, isFresh: true },
  { id: "5", name: "Bawang Putih Kating", category: "bumbu", price: 12000, unit: "250g", image: "🧄", rating: 4.6, isFresh: false },
  { id: "6", name: "Cabai Rawit Merah", category: "bumbu", price: 14000, unit: "200g", image: "🌶️", rating: 4.8, isFresh: true },
];

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState<"katalog" | "dompet" | "pesanan">("katalog");

  // Sub-states: Katalog & Belanja Mockup
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [categoryFilter, setCategoryFilter] = useState<"all" | "sayur" | "buah" | "bumbu">("all");

  // Sub-states: Dompet Digital Mockup
  const [walletBalance, setWalletBalance] = useState(35000);
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null);
  const [walletStep, setWalletStep] = useState<"main" | "pin" | "success">("main");
  const [pinCode, setPinCode] = useState<string>("");
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  // Sub-states: Manajemen Pesanan Mockup
  const [orderStep, setOrderStep] = useState(1); // 1: Penyiapan, 2: Pengiriman, 3: Sampai
  const [isSimulatingDelivery, setIsSimulatingDelivery] = useState(false);
  const [progressWidth, setProgressWidth] = useState(25); // progress bar percentage
  const [deliveryNotification, setDeliveryNotification] = useState<string | null>(null);

  // Quick helper to counts items in cart
  const totalCartCount = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);
  const totalCartPrice = (Object.entries(cart) as [string, number][]).reduce((sum: number, [id, qty]: [string, number]) => {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const clearCart = () => setCart({});

  // Dompet actions
  const initiateTopUp = (amount: number) => {
    setTopUpAmount(amount);
    setWalletStep("pin");
    setPinCode("");
  };

  const handlePinInput = (num: string) => {
    if (pinCode.length < 6) {
      const nextPin = pinCode + num;
      setPinCode(nextPin);
      if (nextPin.length === 6) {
        setIsProcessingTopUp(true);
        setTimeout(() => {
          setIsProcessingTopUp(false);
          setWalletBalance((prev) => prev + (topUpAmount || 0));
          setWalletStep("success");
        }, 1500);
      }
    }
  };

  const resetWalletMockup = () => {
    setWalletStep("main");
    setTopUpAmount(null);
    setPinCode("");
  };

  // Pesanan actions
  const startDeliverySimulation = () => {
    if (isSimulatingDelivery) return;
    setIsSimulatingDelivery(true);
    setOrderStep(1);
    setProgressWidth(25);
    setDeliveryNotification("Sayurku: Belanjaanmu sedang dipilah & dikemas higienis. 🥬");

    // Timeline transition timers
    setTimeout(() => {
      setOrderStep(2);
      setProgressWidth(60);
      setDeliveryNotification("Sayurku: Kurir Budi telah mengambil paketmu & meluncur ke rumahmu! 🛵");
    }, 4000);

    setTimeout(() => {
      setOrderStep(3);
      setProgressWidth(100);
      setDeliveryNotification("Sayurku: Ting tong! Pesanan sampai dengan selamat. Jangan lupa dicuci ya! 🥕🍅");
      setIsSimulatingDelivery(false);
    }, 8500);
  };

  // Auto-hide alert banner
  useEffect(() => {
    if (deliveryNotification) {
      const timer = setTimeout(() => {
        setDeliveryNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [deliveryNotification]);

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="fitur" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4 border border-green-100"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Fitur Cerdas Aplikasi
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
          >
            Satu Aplikasi, Segudang Kemudahan Dapur
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600 font-normal leading-relaxed"
          >
            Sayurku mengintegrasikan seluruh perjalanan belanja kebutuhan dapur dalam satu ekosistem digital yang modern, lancar, dan aman.
          </motion.p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
          {[
            { id: "katalog", label: "Katalog & Belanja", icon: Search },
            { id: "dompet", label: "Dompet Digital", icon: Wallet },
            { id: "pesanan", label: "Manajemen Pesanan", icon: Truck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  // Trigger helpful default cleanups when switching tabs
                  if (tab.id === "dompet") resetWalletMockup();
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-green-600 text-white shadow-md shadow-green-600/10 scale-102"
                    : "bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-gray-900 border border-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid: Description on Left, Interactive Phone Mockup on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Descriptive info changing based on active tab */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "katalog" && (
                <motion.div
                  key="info-katalog"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="inline-block p-3 rounded-2xl bg-green-50 text-green-600 border border-green-100">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
                    Katalog & Keranjang Pintar
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-normal">
                    Temukan ratusan pilihan bahan makanan fresh mulai dari sayur organik, buah impor-lokal, daging segar, hingga bumbu jadi praktis. Sistem pencarian cerdas kami mempermudah Anda mencari sayur terlaris dalam sekejap.
                  </p>
                  <ul className="space-y-3.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Pencarian Instan:</strong> Autocomplete serta filter kategori yang responsif.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Kondisi Sayur Terpilah:</strong> Hanya menyajikan sayur yang lolos uji kesegaran QC ketat.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Simulasi Keranjang:</strong> Masukkan item dan lihat total hitungan belanja di samping kanan.</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100/60 flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <p className="text-xs text-green-800">
                      <strong>Coba Interaksi:</strong> Ketik jenis sayur di kotak pencarian handphone simulasi (misal: "bayam") atau langsung klik tombol **Beli** untuk menambahkan sayuran!
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "dompet" && (
                <motion.div
                  key="info-dompet"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="inline-block p-3 rounded-2xl bg-green-50 text-green-600 border border-green-100">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
                    Dompet Digital "SayurPay"
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-normal">
                    Metode pembayaran cashless dan super cepat yang sudah terintegrasi langsung di dalam aplikasi. Nikmati promo potongan ongkir dan diskon khusus setiap kali bertransaksi menggunakan SayurPay.
                  </p>
                  <ul className="space-y-3.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Isi Saldo Cepat:</strong> Pengisian instan via Virtual Account bank maupun minimarket.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Konfirmasi Keamanan PIN:</strong> Enkripsi 6-digit PIN untuk mengesahkan transaksi belanja harian.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Riwayat Terkelola:</strong> Pemantauan ketat pengeluaran belanja mingguan Anda.</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100/60 flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <p className="text-xs text-green-800">
                      <strong>Coba Interaksi:</strong> Di layar simulasi handphone, pilih nominal isi saldo, masukkan PIN aman buatanmu (atau klik tombol angka acak) untuk mencobanya secara instan.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "pesanan" && (
                <motion.div
                  key="info-pesanan"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="inline-block p-3 rounded-2xl bg-green-50 text-green-600 border border-green-100">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
                    Pelacakan Real-time Presisi
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-normal">
                    Ucapkan selamat tinggal pada rasa cemas menunggu kiriman sayur. Dengan tim kurir berdedikasi tinggi, pantau status pengerjaan pesanan Anda dari tahap pemilihan di central-hub gudang hingga pintu gerbang rumah Anda.
                  </p>
                  <ul className="space-y-3.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Status Pemrosesan Higienis:</strong> Notifikasi saat tim mendisinfeksi wadah boks sayurmu.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Estimasi Akurat:</strong> ETA kurir terhitung matang menyesuaikan data navigasi lalu lintas real-time.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Konfirmasi Selesai:</strong> Kiriman bukti foto langsung dari kurir demi kepastian paket diterima.</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100/60 flex items-center gap-3">
                    <span className="text-2xl">🛵</span>
                    <p className="text-xs text-green-800">
                      <strong>Coba Interaksi:</strong> Tekan tombol **Simulasikan Pelacakan** di bawah simulasi handphone untuk melihat proses notifikasi pesanan bergulir sampai kurir tiba di gerbang.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Beautiful Interactive Mobile Viewport Screen */}
          <div className="lg:col-span-7 flex justify-center relative">
            {/* Visual glow behind mockups */}
            <div className="absolute inset-0 bg-radial from-green-100/40 via-transparent to-transparent blur-2xl pointer-events-none scale-90" />

            {/* Dynamic notifications sliding in from above the phone */}
            <AnimatePresence>
              {deliveryNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute top-12 z-50 w-full max-w-xs mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-green-100 p-4 flex items-start gap-3"
                >
                  <div className="p-1 px-1.5 rounded-lg bg-green-50 text-green-600 shrink-0">
                    <Bell className="w-4 h-4 animate-bounce" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Notifikasi Sayurku</h5>
                    <p className="text-xs text-gray-600 mt-0.5">{deliveryNotification}</p>
                  </div>
                  <button onClick={() => setDeliveryNotification(null)} className="ml-auto text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Phone Container */}
            <div id="phone-container" className="w-[310px] h-[610px] bg-slate-950 rounded-[44px] p-3 shadow-2xl relative border-4 border-slate-800 flex flex-col overflow-hidden">
              {/* Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-3 border border-slate-800/40" />
              </div>

              {/* In-Phone Screen Web Content */}
              <div className="w-full h-full bg-slate-50 rounded-[35px] overflow-hidden flex flex-col relative pt-7 font-sans text-xs select-none">
                
                {/* Header inside phone */}
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-white z-30">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold tracking-tight text-green-600">Sayurku</span>
                  </div>
                  {/* Digital Clock & Signal Indicators */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <span>09:41</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Main Inside Body (Scrollable or Static based on Mode) */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 flex flex-col">
                  
                  {/* KATALOG TAB UI */}
                  {activeTab === "katalog" && (
                    <div className="space-y-3 flex-1 flex flex-col">
                      {/* Search Mockup */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Cari sayur, buah, atau bumbu..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-full pl-8 pr-8 py-2 text-[11px] focus:outline-none focus:ring-1 focus:ring-green-500 focus:bg-white text-gray-800 placeholder-gray-400"
                        />
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2.5 text-gray-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Category filters inside phone */}
                      <div className="flex gap-1.5 pb-1 overflow-x-auto scrollbar-none">
                        {[
                          { id: "all", label: "Semua" },
                          { id: "sayur", label: "🥬 Sayur" },
                          { id: "buah", label: "🥑 Buah" },
                          { id: "bumbu", label: "🧄 Bumbu" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setCategoryFilter(cat.id as any)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                              categoryFilter === cat.id
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-600 border border-gray-100"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      {/* Product Grid Mockup */}
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => {
                            const inCart = (cart[p.id] || 0) as number;
                            return (
                              <div key={p.id} className="bg-white p-2 rounded-xl border border-gray-100 flex flex-col justify-between relative shadow-sm hover:border-green-100 transition-colors">
                                {p.isFresh && (
                                  <span className="absolute top-1 right-1 px-1 py-0.5 rounded bg-green-50 text-[8px] font-semibold text-green-700">Fresh</span>
                                )}
                                <div className="text-2xl mt-1 text-center select-none mb-1">{p.image}</div>
                                <div>
                                  <h4 className="font-semibold text-[10px] text-gray-800 line-clamp-1">{p.name}</h4>
                                  <p className="text-[8px] text-gray-400">Rp {p.price.toLocaleString("id-ID")}/{p.unit}</p>
                                </div>
                                <button
                                  id={`btn-beli-${p.id}`}
                                  onClick={() => handleAddToCart(p.id)}
                                  className="w-full mt-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  {inCart > 0 ? (
                                    <>
                                      <Plus className="w-2.5 h-2.5" />
                                      Tambah (+{inCart})
                                    </>
                                  ) : "Beli"}
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="col-span-2 text-center py-6 text-gray-400">
                            Produk saringan tidak ditemukan
                          </div>
                        )}
                      </div>

                      {/* Sticky Active Cart Bar at bottom of simulator */}
                      {totalCartCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-600 p-2.5 rounded-xl text-white flex items-center justify-between shadow-lg mt-auto"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-700 relative">
                              <ShoppingCart className="w-3 h-3 text-white" />
                              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-[8px] text-green-950 font-bold rounded-full w-4 h-4 flex items-center justify-center scale-90">
                                {totalCartCount}
                              </span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold">Keranjang Belanja</p>
                              <p className="text-[8.5px] text-green-100">Rp {totalCartPrice.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                          <button 
                            onClick={clearCart} 
                            className="bg-green-700 hover:bg-green-800 text-[8px] font-bold px-2 py-1 rounded-lg text-green-100 transition-colors cursor-pointer"
                          >
                            Reset
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* DOMPET TAB UI */}
                  {activeTab === "dompet" && (
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <AnimatePresence mode="wait">
                        {walletStep === "main" && (
                          <motion.div
                            key="wallet-main"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4 flex-1"
                          >
                            {/* Card Display */}
                            <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-4 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
                              <div className="absolute right-0 bottom-0 bg-white/5 w-24 h-24 rounded-full translate-x-4 translate-y-4" />
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] font-medium tracking-wide text-green-100">SAYURPAY BALANCE</span>
                                <CreditCard className="w-4 h-4 text-green-200" />
                              </div>
                              <div className="space-y-0.5">
                                <h3 className="text-lg font-bold">Rp {walletBalance.toLocaleString("id-ID")}</h3>
                                <p className="text-[8px] text-green-100/80">Aktif • Amir Salim</p>
                              </div>
                            </div>

                            {/* Section: Quick Topup */}
                            <div>
                              <h4 className="font-bold text-gray-800 text-[10px] mb-2">Isi Saldo Cepat</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {[15000, 50000, 100000].map((amount) => (
                                  <button
                                    key={amount}
                                    onClick={() => initiateTopUp(amount)}
                                    className="bg-white border hover:border-green-600 border-gray-100 rounded-xl p-2.5 text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:shadow-xs"
                                  >
                                    <span className="text-[9px] font-bold text-gray-800">+{amount >= 1000 ? `${amount / 1000}k` : amount}</span>
                                    <span className="text-[8px] text-green-600">Pilih</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Promos slider */}
                            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-3 flex items-center gap-2.5">
                              <span className="text-lg">⭐</span>
                              <div>
                                <h5 className="font-bold text-amber-900 text-[9px]">Promo Cashback 15%</h5>
                                <p className="text-[8px] text-amber-700">Gunakan SayurPay untuk bayar minimal Rp 45.000</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {walletStep === "pin" && (
                          <motion.div
                            key="wallet-pin"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4 flex-1 flex flex-col justify-center text-center"
                          >
                            <h4 className="font-bold text-gray-800 text-xs">Masukkan PIN SayurPay</h4>
                            <p className="text-[9px] text-gray-500">Top-Up Sebesar: <span className="font-bold text-gray-800">Rp {topUpAmount?.toLocaleString("id-ID")}</span></p>
                            
                            {/* PIN Display bullet bubbles */}
                            <div className="flex justify-center gap-2 py-3">
                              {[0, 1, 2, 3, 4, 5].map((index) => {
                                const isFilled = pinCode.length > index;
                                return (
                                  <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                                      isFilled ? "bg-green-600 border-green-600 scale-110" : "border-gray-200 bg-white"
                                    }`}
                                  />
                                );
                              })}
                            </div>

                            {isProcessingTopUp ? (
                              <div className="py-4 flex flex-col items-center gap-2 justify-center">
                                <RefreshCw className="w-5 h-5 text-green-600 animate-spin" />
                                <span className="text-[9px] text-green-600 font-bold">Memverifikasi keamanan...</span>
                              </div>
                            ) : (
                              /* PIN Keyboard Input inside app simulator */
                              <div className="grid grid-cols-3 gap-2.5 max-w-[180px] mx-auto mt-2">
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "←"].map((keyChar) => (
                                  <button
                                    key={keyChar}
                                    onClick={() => {
                                      if (keyChar === "C") {
                                        setPinCode("");
                                      } else if (keyChar === "←") {
                                        setPinCode(pinCode.slice(0, -1));
                                      } else {
                                        handlePinInput(keyChar);
                                      }
                                    }}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-100 hover:bg-green-50 hover:border-green-200 text-[10px] font-bold text-gray-800 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xs"
                                  >
                                    {keyChar}
                                  </button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}

                        {walletStep === "success" && (
                          <motion.div
                            key="wallet-success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8"
                          >
                            <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 mb-2">
                              <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-gray-900 text-xs text-center">Top-Up Berhasil!</h4>
                              <p className="text-[9px] text-gray-500 mt-1 max-w-[160px] mx-auto">Saldo SayurPay Anda telah ditambahkan sebesar Rp {topUpAmount?.toLocaleString("id-ID")}.</p>
                            </div>
                            <button
                              onClick={resetWalletMockup}
                              className="px-4 py-1.5 bg-green-600 text-white rounded-full text-[9px] font-bold shadow-sm cursor-pointer hover:bg-green-700 transition"
                            >
                              Kembali ke Dompet
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* PESANAN TAB UI */}
                  {activeTab === "pesanan" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      {/* Live Status Map Preview illustration */}
                      <div className="bg-slate-100 h-28 rounded-2xl relative overflow-hidden border border-slate-200/60 shadow-xs">
                        {/* Simulated minimal vector map */}
                        <div className="absolute inset-0 bg-[#e2e8f0]" />
                        {/* Map Roads lines vector */}
                        <div className="absolute top-1/2 left-0 right-0 h-4 bg-white -translate-y-1/2" />
                        <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white" />
                        <div className="absolute left-2/3 top-0 bottom-0 w-4 bg-white" />
                        
                        {/* Route Path Indicator Line */}
                        <div className="absolute top-1/2 left-1/3 right-1/4 h-1.5 bg-green-400 -translate-y-1/2 rounded" />
                        
                        {/* Simulated Map Pins */}
                        <div className="absolute top-[38%] left-[30%] bg-green-100 p-1 rounded-full border border-green-400 z-10 animate-pulse">
                          🏢
                        </div>
                        
                        {/* Animated delivery guy icon moving on path */}
                        <motion.div
                          animate={isSimulatingDelivery ? {
                            left: orderStep === 1 ? "30%" : orderStep === 2 ? "55%" : "70%",
                            top: orderStep === 1 ? "38%" : orderStep === 2 ? "38%" : "38%"
                          } : { left: "30%", top: "38%" }}
                          transition={{ duration: 1.5, type: "spring" }}
                          className="absolute z-20 text-base"
                        >
                          🛵
                        </motion.div>

                        <div className="absolute top-[38%] right-[22%] bg-red-100 p-1 rounded-full border border-red-400 z-10 animate-bounce">
                          📍
                        </div>
                      </div>

                      {/* Timeline Steps simulation inside phone */}
                      <div className="space-y-2 text-left">
                        <div className="flex gap-2 items-center">
                          <h4 className="font-bold text-gray-800 text-[10px]">Lacak Belanjaan Anda</h4>
                          {isSimulatingDelivery && <span className="flex h-1.5 w-1.5 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span></span>}
                        </div>

                        {/* Custom Progress Line */}
                        <div className="relative">
                          {/* Background indicator line */}
                          <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-gray-200" />
                          <div className="absolute left-[7px] top-1 w-[2px] bg-green-500 transition-all duration-500" style={{ height: `${progressWidth}%` }} />

                          <div className="space-y-3 relative z-11">
                            {/* Step 1 */}
                            <div className="flex gap-2">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${
                                orderStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                              }`}>✓</div>
                              <div>
                                <p className={`text-[10px] font-bold ${orderStep >= 1 ? "text-gray-900" : "text-gray-400"}`}>Pesanan Diterima & Dikemas</p>
                                <p className="text-[8px] text-gray-400">Tim Sayurku sedang memilah sayur segar.</p>
                              </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-2">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 z-10 ${
                                orderStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                              }`}>{orderStep > 2 ? "✓" : "2"}</div>
                              <div>
                                <p className={`text-[10px] font-bold ${orderStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>Kurir Sedang Mengantar</p>
                                <p className="text-[8px] text-gray-400">Pak Tasripin (Honda Revo Hitam, AB-3921-XW)</p>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-2">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 z-10 ${
                                orderStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                              }`}>3</div>
                              <div>
                                <p className={`text-[10px] font-bold ${orderStep >= 3 ? "text-gray-900" : "text-gray-400"}`}>Sampai di Meja Dapurmu</p>
                                <p className="text-[8px] text-gray-400">Sayur bersih siap untuk dimasak.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Trigger bottom simulation panel inside phone */}
                      <button
                        onClick={startDeliverySimulation}
                        disabled={isSimulatingDelivery}
                        className={`w-full py-2 ${
                          isSimulatingDelivery ? "bg-slate-100 text-gray-400" : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        } rounded-xl text-[10px] font-bold text-center transition-colors flex items-center justify-center gap-1.5`}
                      >
                        {isSimulatingDelivery ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin text-gray-400" />
                            Dalam Perjalanan...
                          </>
                        ) : (
                          <>
                            <Truck className="w-3 h-3" />
                            Simulasikan Pelacakan
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>

                {/* Home Indicator line of simulated mobile phone screen */}
                <div className="w-24 h-1 bg-gray-300 rounded-full mx-auto my-1.5 shrink-0" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
