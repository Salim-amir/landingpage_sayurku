import { useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowDownToLine, Leaf, Star, ArrowRight, Shield, 
  Clock, Award, Users, QrCode, Smartphone, Github, Layout
} from "lucide-react";
import Navbar from "./components/Navbar";
import QRCode from "react-qr-code";
import Typewriter from "./components/Typewriter";
import FeaturesShowcase from "./components/FeaturesShowcase";
import HowItWorks from "./components/HowItWorks";
import ShoppingPlayground from "./components/ShoppingPlayground";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  // Phrases for typing animation
  const typewriterPhrases = [
    "Belanja Sayur Segar.",
    "Top-Up Saldo Digital.",
    "Katalog Produk Terlaris.",
    "Pantau Riwayat Pesanan.",
  ];

  // Pure JavaScript Smooth Scrolling with Sticky Navbar offset correction
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href === "#") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      if (href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const navbarElement = document.querySelector("nav");
          const navbarHeight = navbarElement ? navbarElement.offsetHeight : 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight + 5;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100 selection:text-green-900">
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      {/* MUST use background gradient bottom to top: hero-gradient */}
      <header id="beranda" className="relative pt-32 pb-24 md:pt-40 md:pb-36 hero-gradient overflow-hidden">
        {/* Abstract blur backdrop circles */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Premium Promo Ribbon */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-150/60 border border-green-200/50 text-green-800 text-xs font-semibold"
              >
                <Leaf className="w-4.5 h-4.5 text-green-600" />
                <span>#1 Aplikasi Belanja Sayur Segar Terbaik</span>
              </motion.div>

              {/* Headline with Typewriting */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-950 leading-tight">
                  Solusi Cerdas Untuk <br className="hidden sm:inline" />
                  <Typewriter phrases={typewriterPhrases} typingSpeed={100} deletingSpeed={50} delayBetween={2000} />
                </h1>
                <p className="max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-gray-650 font-normal leading-relaxed">
                  Bawa kesegaran pasar buah, sayur organik pilihan, bumbu dapur tradisional, dan bermacam-macam kebutuhan masak sehat langsung di depan pintu rumah Anda tanpa repot keluar rumah. 100% Bergaransi Segar!
                </p>
              </motion.div>

              {/* Call to Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                {/* CTA "Download Sekarang" with App icon */}
                <a
                  href="#fitur"
                  id="cta-hero"
                  className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-green-600/15 transition-all duration-200 active:scale-98 cursor-pointer group"
                >
                  <Layout className="w-5 h-5 text-green-50 group-hover:scale-110 transition-transform" />
                  Coba Demo Web
                </a>
                
                {/* Alternative "Pelajari Fitur" button */}
                <a
                  href="#fitur"
                  className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-slate-50 text-gray-800 hover:text-green-700 rounded-full font-semibold text-sm flex items-center justify-center gap-2 border border-gray-200 backdrop-blur-xs transition-all duration-200 active:scale-98 cursor-pointer"
                >
                  Pelajari Fitur
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>


            </div>

            {/* Hero Right Visuals - Phone Mockup and Floating Greens */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 w-full max-w-[340px]"
              >
                {/* Large Background circle light green */}
                <div className="absolute inset-0 bg-green-105 rounded-full scale-102 filter blur-xl opacity-30 select-none pointer-events-none animate-pulse" />

                {/* Pristine Mobile Phone frame featuring main catalog layout preview */}
                <div className="relative rounded-[40px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-900 w-full max-w-[330px] mx-auto overflow-hidden">
                  {/* Phone Screen Mock */}
                  <div className="rounded-[30px] bg-slate-50 overflow-hidden w-full h-[510px] flex flex-col relative pt-5">
                    {/* Phone Notch */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-slate-950 w-28 h-5 rounded-full z-45" />

                    {/* Phone Header Mock */}
                    <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-800 z-40">
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 text-xs">🥬 Sayurku</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">09:41</span>
                    </div>

                    {/* App Content inside mockup */}
                    <div className="flex-1 p-3.5 space-y-3.5 overflow-hidden">
                      {/* Search Bar placeholder */}
                      <div className="bg-white border border-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 text-[10px] text-gray-400">
                        <span>🔍 Telusuri Jeruk Lemon, Brokoli...</span>
                      </div>

                      {/* Promo Banner inside mock screen */}
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-2xl border border-green-100/50 flex justify-between items-center relative overflow-hidden">
                        <div className="space-y-0.5 relative z-10">
                          <span className="bg-green-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">FLASH PROMO</span>
                          <h4 className="font-extrabold text-[11px] text-green-950">Voucher Diskon</h4>
                          <p className="text-[8px] text-green-800">Potongan Ongkir Rp 10.000</p>
                        </div>
                        <span className="text-3xl select-none relative z-10 leading-none">🥭</span>
                      </div>

                      {/* Mini List categories */}
                      <div className="flex gap-2">
                        {["🥬 Sayuran", "🍓 Buah", "🧅 Bumbu"].map((c, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${i === 0 ? "bg-green-600 text-white" : "bg-white text-gray-500 border border-gray-100"}`}>
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Miniature Grid of products */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { name: "Brokoli Premium", price: "9.500", rating: "4.9", image: "🥦" },
                          { name: "Stroberi Organik", price: "18.000", rating: "4.8", image: "🍓" }
                        ].map((m, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-xl border border-gray-100 space-y-1.5 flex flex-col justify-between">
                            <span className="text-2xl text-center select-none">{m.image}</span>
                            <div>
                              <h5 className="font-bold text-[9px] text-gray-800 line-clamp-1">{m.name}</h5>
                              <p className="text-[8px] text-gray-400">Rp {m.price}/pax</p>
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-gray-500">
                              <span className="text-amber-500">★ {m.rating}</span>
                              <span className="bg-green-50 text-green-600 px-1 py-0.5 rounded font-extrabold">Beli</span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Mini Bottom Tab navigator */}
                    <div className="bg-white border-t border-gray-100 py-2.5 flex justify-around text-[8px] text-gray-400 font-bold shrink-0">
                      <span className="text-green-600 flex flex-col items-center">🏠<span>Mulai</span></span>
                      <span className="flex flex-col items-center">🔍<span>Cari</span></span>
                      <span className="flex flex-col items-center">👛<span>Dompet</span></span>
                      <span className="flex flex-col items-center">📦<span>Pesanan</span></span>
                    </div>

                    {/* Simulated screen indicator bar */}
                    <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto my-1.5 shrink-0" />
                  </div>
                </div>

                {/* High quality floating interactive vector decorations */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-2xl select-none z-20"
                >
                  🥬
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-16 -right-6 w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-3xl select-none z-20"
                >
                  🥑
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-2xl select-none z-20"
                >
                  🍅
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. Key Benefits Highlights Panel */}
      <section className="py-12 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              { icon: Shield, title: "100% Kebendaan Segar", desc: "Garansi uang kembali / ganti sayur baru jika ada materi layu atau busuk saat kurir kami tiba." },
              { icon: Clock, title: "Kirim Instant (Maks 2 Jam)", desc: "Butuh cepat bumbu sop harian? Tim kurir internal kami meluncur langsung dari gudang penyimpanan bersuhu optimal." },
              { icon: Award, title: "Petani Mitra Terpercaya", desc: "Semua bahan pangan dipasok secara gotong-royong adil, meningkatkan taraf hidup ratusan petani lokal Indonesia." }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl">
                  <div className="p-3 bg-green-50 rounded-2xl text-green-650 shrink-0 border border-green-100/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-950 text-base">{benefit.title}</h4>
                    <p className="text-xs md:text-sm text-gray-650 font-normal leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Features Section (Katalog, Dompet Digital & Manajemen Pesanan) */}
      <FeaturesShowcase />

      {/* 5. How It Works Timeline Section */}
      <HowItWorks />

      {/* 6. Shopping Playground - Interactive exploration */}
      <ShoppingPlayground />

      {/* 7. App download Call to Action Banner section */}
      <section id="download" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-green-800 to-[#064a31] rounded-3xl p-8 md:p-16 text-white overflow-hidden shadow-xl border border-green-700/50 relative">
            {/* Visual glow overlay inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Info text left */}
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3.5 py-1.5 rounded-full bg-green-700 text-green-100 text-xs font-bold uppercase tracking-wider">Mulai Hidup Sehat</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Nikmati Mudahnya Belanja Kesegaran Dari Genggaman
                </h2>
                <p className="text-sm md:text-base text-green-105 leading-relaxed font-normal">
                  Jelajahi purwarupa (prototype) aplikasi Sayurku sekarang juga. Anda dapat mencoba navigasi interaktif, fitur pencarian pintar, dan merasakan pengalaman belanja sayur yang modern!
                </p>

                {/* Simulated Download button options */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {/* Web Demo simulation button link */}
                  <a
                    href="#fitur"
                    className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm text-left font-sans"
                  >
                    <Layout className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <span className="block text-[9px] text-gray-400 font-medium uppercase tracking-wider">COBA SEKARANG</span>
                      <span className="block text-xs font-bold text-white">Demo Web App</span>
                    </div>
                  </a>

                  {/* Github link */}
                  <a
                    href="https://github.com/Salim-amir/landingpage_sayurku"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm text-left font-sans"
                  >
                    <Github className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <span className="block text-[9px] text-gray-400 font-medium uppercase tracking-wider">LIHAT KODE</span>
                      <span className="block text-xs font-bold text-white">Repository</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Graphic right download scanner */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                <div className="bg-white p-6 rounded-3xl text-gray-900 shadow-xl border border-green-100 max-w-xs space-y-4">
                  <div className="flex items-center justify-center p-3 bg-white rounded-2xl border border-slate-200">
                    <QRCode 
                      value={typeof window !== 'undefined' ? window.location.href : "https://github.com/Salim-amir/landingpage_sayurku"} 
                      size={160} 
                      className="text-slate-900"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-sm text-gray-950">Pindai Kode QR</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Arahkan kamera smartphone Anda ke layar untuk mencoba versi mobile web Sayurku.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions accordion section */}
      <FAQ />

      {/* 9. Footer panel */}
      <Footer />

    </div>
  );
}
