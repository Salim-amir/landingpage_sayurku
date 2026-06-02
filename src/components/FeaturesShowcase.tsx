import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, ShoppingCart, Wallet, Truck, 
  CheckCircle2, Bell, Sparkles, Plus, 
  ArrowRight, CreditCard, RefreshCw, X, ShieldCheck, ArrowLeft, Home, FileText, User
} from "lucide-react";
import { Product } from "../types";

// Mock products for the interactive shopping preview
const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", name: "Bayam Hijau", category: "sayur_hijau", price: 12000, unit: "1 Ikat", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80", rating: 4.8, isFresh: true },
  { id: "1b", name: "Kangkung Segar", category: "sayur_hijau", price: 10000, unit: "1 Ikat", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80", rating: 4.6, isFresh: true },
  { id: "2", name: "Tomat Merah", category: "buah", price: 15000, unit: "500 Gram", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80", rating: 4.7, isFresh: true },
  { id: "2b", name: "Jeruk Manis", category: "buah", price: 25000, unit: "1 Kg", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=400&q=80", rating: 4.9, isFresh: true },
  { id: "3", name: "Cabai Rawit", category: "bumbu", price: 18000, unit: "1 Ons", image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&w=400&q=80", rating: 4.8, isFresh: true },
  { id: "3b", name: "Bawang Merah", category: "bumbu", price: 35000, unit: "250 Gram", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80", rating: 4.7, isFresh: true },
  { id: "4", name: "Wortel Lokal", category: "umbi_umbian", price: 10500, unit: "500 Gram", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80", rating: 4.9, isFresh: true },
  { id: "4b", name: "Kentang Dieng", category: "umbi_umbian", price: 16000, unit: "1 Kg", image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=400&q=80", rating: 4.8, isFresh: true },
];

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState<"katalog" | "dompet" | "pesanan">("katalog");

  // Sub-states: Katalog & Belanja Mockup
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [categoryFilter, setCategoryFilter] = useState<"all" | "sayur_hijau" | "buah" | "bumbu" | "umbi_umbian">("all");
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Convert vertical scroll to horizontal scroll on category filter bar
  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeTab]);

  // Sub-states: Dompet Digital Mockup
  const [walletBalance, setWalletBalance] = useState(9834000);
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
                    Dompet Digital
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-normal">
                    Metode pembayaran cashless dan super cepat yang sudah terintegrasi langsung di dalam aplikasi. Nikmati promo potongan ongkir dan diskon khusus setiap kali bertransaksi menggunakan Dompet Digital.
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
              <div className="w-full h-full bg-[#F8FAF7] rounded-[35px] overflow-hidden flex flex-col relative pt-7 font-sans text-xs select-none">
                
                {/* Header inside phone */}
                <div className="px-4 py-3 bg-[#F8FAF7] flex items-center justify-between z-30 pt-4">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="w-4 h-4 text-gray-800" />
                    <span className="text-[13px] font-bold tracking-tight text-gray-900">
                      {activeTab === "katalog" ? "Katalog Produk" : activeTab === "dompet" ? "Dompet Digital" : "Detail Pesanan"}
                    </span>
                  </div>
                  {/* Battery & Signal (optional, just to make it look like a phone) */}
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span className="text-[9px] font-medium font-mono">11:04</span>
                  </div>
                </div>

                {/* Main Inside Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
                  
                  {/* KATALOG TAB UI */}
                  {activeTab === "katalog" && (
                    <div className="flex-1 flex flex-col px-3 relative">
                      {/* Search Mockup */}
                      <div className="relative mt-1">
                        <input
                          type="text"
                          placeholder="Cari sayur segar hari ini..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-2 text-[10px] focus:outline-none focus:ring-1 focus:ring-[#1D5C2E] text-gray-800 placeholder-gray-400 shadow-sm"
                        />
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      </div>

                      {/* Category filters */}
                      <div
                        ref={categoryScrollRef}
                        className="flex gap-2 pb-1 overflow-x-auto scrollbar-none mt-3"
                      >
                        {[
                          { id: "all", label: "Semua Produk" },
                          { id: "sayur_hijau", label: "Sayur Hijau" },
                          { id: "buah", label: "Buah" },
                          { id: "bumbu", label: "Bumbu" },
                          { id: "umbi_umbian", label: "Umbi-umbian" },
                        ].map((cat) => {
                          const isCatActive = categoryFilter === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setCategoryFilter(cat.id as any)}
                              className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                isCatActive
                                  ? "bg-[#1D5C2E] text-white"
                                  : "bg-white text-gray-700 border border-gray-200 shadow-sm"
                              }`}
                            >
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Product Grid Mockup */}
                      <div className="grid grid-cols-2 gap-3 mt-3 pb-20 content-start">
                        {filteredProducts.map((p) => {
                          return (
                            <div key={p.id} className="bg-white rounded-[16px] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
                              <div className="h-[90px] w-full bg-gray-100 flex items-center justify-center text-5xl relative overflow-hidden">
                                {p.image.startsWith("http") ? (
                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                ) : (
                                  p.image
                                )}
                              </div>
                              <div className="p-2.5 flex flex-col justify-between flex-1">
                                <div>
                                  <h4 className="font-bold text-[10px] text-gray-900 leading-tight">{p.name}</h4>
                                  <p className="text-[8px] text-gray-400 mt-0.5">/ {p.unit}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="font-bold text-[#1D5C2E] text-[10px]">Rp {p.price.toLocaleString("id-ID")}</span>
                                  <button
                                    onClick={() => handleAddToCart(p.id)}
                                    className="w-6 h-6 bg-[#1D5C2E] text-white rounded-[6px] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Floating Action Button for Cart */}
                      <div className="absolute bottom-20 right-3 z-40">
                        <button className="w-11 h-11 bg-[#1D5C2E] rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(29,92,46,0.4)] relative cursor-pointer active:scale-95 transition-transform">
                          <ShoppingCart className="w-5 h-5" />
                          {totalCartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white box-content">
                              {totalCartCount}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DOMPET TAB UI */}
                  {activeTab === "dompet" && (
                    <div className="space-y-4 flex-1 pb-20 px-3">
                      {/* Card Display */}
                      <div className="bg-[#1D5C2E] text-white p-4 rounded-[20px] shadow-lg relative overflow-hidden mt-1">
                        <div className="flex items-center gap-1.5 mb-3 text-green-50">
                          <Wallet className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-medium">Saldo Anda</span>
                        </div>
                        <h3 className="text-[22px] font-bold mb-4 tracking-tight">Rp {walletBalance.toLocaleString("id-ID")}</h3>
                        <button className="w-full py-2.5 bg-white text-[#1D5C2E] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                          <Plus className="w-3 h-3" /> Isi Saldo
                        </button>
                      </div>

                      {/* Transaction History */}
                      <div className="space-y-3 mt-4">
                        <h4 className="font-bold text-gray-900 text-[12px]">Riwayat Transaksi</h4>
                        
                        <div className="space-y-2.5">
                          {[
                            { title: "Pembayaran", subtitle: "Pembayaran pesanan", amount: -585000, date: "2 Jun 2026, 00:11" },
                            { title: "Pembayaran", subtitle: "Pembayaran pesanan", amount: -800000, date: "2 Jun 2026, 00:02" },
                            { title: "Pembayaran", subtitle: "Pembayaran pesanan", amount: -5000, date: "1 Jun 2026, 22:24" },
                            { title: "Isi Saldo", subtitle: "Pembayaran Virtual Account", amount: 200000, date: "1 Jun 2026, 20:10" },
                          ].map((trx, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-2xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${trx.amount < 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-[#1D5C2E]'}`}>
                                <ArrowRight className={`w-4 h-4 ${trx.amount < 0 ? '-rotate-45' : 'rotate-45'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-[10px] text-gray-900">{trx.title}</h5>
                                <p className="text-[8px] text-gray-400 mt-0.5">{trx.subtitle}</p>
                                <p className="text-[8px] text-gray-400">{trx.date}</p>
                              </div>
                              <div className="text-right flex flex-col items-end justify-center">
                                <p className={`font-bold text-[10px] ${trx.amount < 0 ? 'text-red-500' : 'text-[#1D5C2E]'}`}>
                                  {trx.amount > 0 ? "+" : "-"}Rp {Math.abs(trx.amount).toLocaleString("id-ID")}
                                </p>
                                <div className="mt-1 px-1.5 py-0.5 bg-green-50 text-[#1D5C2E] text-[7px] font-bold rounded-md border border-green-100">
                                  Sukses
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PESANAN TAB UI */}
                  {activeTab === "pesanan" && (
                    <div className="space-y-4 flex-1 pb-20 px-3 mt-1">
                      
                      {/* Status Pesanan */}
                      <div className="bg-white p-3.5 rounded-2xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <span className="text-[10px] text-gray-600">Status Pesanan</span>
                          <span className="px-2.5 py-1 bg-[#F8FAF7] text-[#1D5C2E] border border-green-100/50 text-[9px] font-bold rounded-lg">Selesai</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] text-gray-500">
                            <span>Waktu Checkout</span><span className="font-medium">1 Jun 2026, 22:24</span>
                          </div>
                          <div className="flex justify-between text-[9px] text-gray-500">
                            <span>Waktu Dikirim</span><span className="font-medium">1 Jun 2026, 23:58</span>
                          </div>
                          <div className="flex justify-between text-[9px] text-gray-500">
                            <span>Waktu Selesai</span><span className="font-medium">1 Jun 2026, 23:58</span>
                          </div>
                        </div>
                      </div>

                      {/* Daftar Produk */}
                      <div>
                        <h4 className="font-bold text-gray-900 text-[11px] mb-2.5">Daftar Produk</h4>
                        <div className="bg-white p-3 rounded-2xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl border border-gray-100">
                            🥬
                          </div>
                          <div className="flex-1 mt-1">
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-[10px] text-gray-900">Bayam Hijau</h5>
                              <span className="font-bold text-[10px] text-gray-900">Rp 12.000</span>
                            </div>
                            <p className="text-[9px] text-gray-500 mt-1">1 x Rp 12.000</p>
                          </div>
                        </div>
                      </div>

                      {/* Informasi Pengiriman */}
                      <div>
                        <h4 className="font-bold text-gray-900 text-[11px] mb-2.5">Informasi Pengiriman</h4>
                        <div className="bg-white p-3.5 rounded-2xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] space-y-3.5">
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5"><div className="w-5 h-5 rounded-full bg-[#1D5C2E] flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div></div>
                            <div>
                              <h6 className="text-[9px] text-gray-400">Alamat Tujuan</h6>
                              <p className="text-[10px] text-gray-700 leading-relaxed mt-0.5 font-medium">jl.mawar, uhuhu, malang, 057378</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-100 pt-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-[#F8FAF7] flex items-center justify-center text-[#1D5C2E]">
                                <Truck className="w-4 h-4" />
                              </div>
                              <div>
                                <h6 className="text-[8px] text-gray-400">Kurir Pengantar</h6>
                                <p className="font-bold text-[10px] text-gray-900">Yanto</p>
                                <p className="text-[8px] text-gray-500">0850531316</p>
                              </div>
                            </div>
                            <button className="px-3 py-2 bg-[#25D366] text-white rounded-lg text-[9px] font-bold flex items-center gap-1.5 shadow-sm">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
                              Chat WA
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Rincian Pembayaran */}
                      <div>
                        <h4 className="font-bold text-gray-900 text-[11px] mb-2.5">Rincian Pembayaran</h4>
                        <div className="bg-white p-3.5 rounded-2xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] space-y-3">
                          <div className="flex justify-between text-[9px] border-b border-gray-100 pb-3">
                            <span className="text-gray-500">Metode Pembayaran</span>
                            <span className="font-bold text-gray-900">Dompet Digital</span>
                          </div>
                          <div className="flex justify-between text-[9px]">
                            <span className="text-gray-500">Subtotal Produk</span>
                            <span className="text-gray-900 font-medium">Rp 12.000</span>
                          </div>
                          <div className="flex justify-between text-[9px]">
                            <span className="text-gray-500">Ongkos Kirim</span>
                            <span className="text-gray-900 font-medium">Rp 0</span>
                          </div>
                          <div className="flex justify-between text-[11px] border-t border-gray-100 pt-3 mt-1">
                            <span className="font-bold text-gray-900">Total Belanja</span>
                            <span className="font-bold text-[#1D5C2E]">Rp 12.000</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* Static Bottom Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-100 flex items-center justify-around z-40 px-2 pb-1 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
                  {[
                    { id: 'beranda', icon: Home, label: 'Beranda' },
                    { id: 'pesanan', icon: FileText, label: 'Pesanan' },
                    { id: 'dompet', icon: Wallet, label: 'Dompet' },
                    { id: 'notifikasi', icon: Bell, label: 'Notifikasi' },
                    { id: 'profil', icon: User, label: 'Profil' }
                  ].map((item) => {
                    const isActive = 
                      (activeTab === 'katalog' && item.id === 'beranda') ||
                      (activeTab === 'pesanan' && item.id === 'pesanan') ||
                      (activeTab === 'dompet' && item.id === 'dompet');
                    
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex flex-col items-center gap-1 cursor-pointer w-12"
                        onClick={() => {
                          if (item.id === 'beranda') setActiveTab('katalog');
                          if (item.id === 'pesanan') setActiveTab('pesanan');
                          if (item.id === 'dompet') setActiveTab('dompet');
                        }}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#1D5C2E]' : 'text-gray-400'}`} />
                        <span className={`text-[8px] ${isActive ? 'font-bold text-[#1D5C2E]' : 'font-medium text-gray-400'}`}>{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Home Indicator line of simulated mobile phone screen */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full z-50" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
