import { motion } from "motion/react";
import { Search, Wallet, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { TimelineStep } from "../types";

const STEPS: TimelineStep[] = [
  {
    step: 1,
    title: "Pilih Bahan Makanan Segar",
    description: "Cari produk sayuran premium atau kebutuhan dapur dengan filter pencarian pintar, lalu tambahkan ke keranjang belanja Anda.",
  },
  {
    step: 2,
    title: "Isi Saldo & Bayar Instan",
    description: "Gunakan dompet digital SayurPay untuk melakukan pembayaran cashless pas belanjaan. Masukkan PIN keamanan Anda untuk verifikasi instan.",
  },
  {
    step: 3,
    title: "Lacak Pengiriman Real-time",
    description: "Pantau pesanan Anda dikemas higienis hingga kurir kami meluncur mengantarkan langsung ke depan pintu dapur Anda.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4 border border-green-100">
            <Sparkles className="w-3.5 h-3.5" />
            Langkah Praktis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Bagaimana Sayurku Bekerja?
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 font-normal">
            Hanya butuh 3 langkah rileks untuk membawa kesegaran alam langsung ke panci dapur Anda.
          </p>
        </div>

        {/* Dynamic Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gray-200 -translate-y-10 z-0" />

          {STEPS.map((step, idx) => {
            return (
              <motion.div
                key={step.step}
                id={`step-${step.step}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-gray-150/60 shadow-xs relative z-10 flex flex-col items-center text-center hover:shadow-md hover:border-green-100 transition-all duration-300"
              >
                {/* Step Circle badge */}
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 border border-green-100 flex items-center justify-center font-extrabold text-lg mb-6 shadow-xs">
                  {step.step === 1 && <Search className="w-6 h-6" />}
                  {step.step === 2 && <Wallet className="w-6 h-6" />}
                  {step.step === 3 && <MapPin className="w-6 h-6" />}
                </div>

                <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Langkah {step.step}</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-950 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
