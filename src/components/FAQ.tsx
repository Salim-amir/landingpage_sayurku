import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "1",
    question: "Apa itu aplikasi Sayurku?",
    answer: "Sayurku adalah platform belanja online serbapraktis untuk mendapatkan sayuran segar, buah-buahan lokal, bumbu dapur harian, dan sembako berkualitas tinggi. Semua pesanan bersumber langsung dari kelompok tani mitra nasional, memastikan harga adil dan kesegaran maksimal.",
  },
  {
    id: "2",
    question: "Bagaimana cara melakukan pembayaran di Sayurku?",
    answer: "Kami mendukung metode pembayaran cashless cepat menggunakan dompet digital internal 'SayurPay', Virtual Account bank utama (BCA, Mandiri, BRI, BNI), QRIS, kartu kredit, hingga metode bayar di tempat (Cash on Delivery) untuk kenyamanan belanja Anda.",
  },
  {
    id: "3",
    question: "Apakah sayuran yang dikirim dijamin benar-benar segar?",
    answer: "Tentu saja! Demi menjaga kandungan nutrisi, tim kami menjalankan program Quality Control (QC) dua kali lipat. Sayur dipanen langsung sewaktu dini hari oleh petani mitra, dibersihkan di pusat filter higienis kami, lalu dikirim menggunakan wadah berpendingin khusus.",
  },
  {
    id: "4",
    question: "Berapa lama estimasi pengiriman hingga pesanan sampai?",
    answer: "Kami menawarkan dua moda pengiriman fleksibel: Pengiriman Instan (sampai di depan pintu dalam waktu maksimal 2 jam setelah dikemas) serta Pengiriman Terjadwal (pagi hari berikutnya pk 06:00 - 09:00 sehingga bahan segar siap sebelum jam memasak Anda).",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4 border border-green-100">
            <HelpCircle className="w-3.5 h-3.5" />
            Butuh Bantuan?
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Pertanyaan Yang Sering Diajukan
          </h2>
          <p className="mt-3 text-base text-gray-650 font-normal">
            Punya keraguan seputar pemesanan sayur kami? Silakan baca beberapa jawaban singkat berikut.
          </p>
        </div>

        {/* Accordion Questions Stack */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeIndex === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="bg-white rounded-2xl border border-gray-150/60 shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  id={`btn-faq-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-gray-900 hover:text-green-700 focus:outline-none transition-colors cursor-pointer"
                >
                  <span className="pr-4 text-base md:text-lg">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-green-600" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-gray-50 text-sm md:text-base text-gray-650 leading-relaxed font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
