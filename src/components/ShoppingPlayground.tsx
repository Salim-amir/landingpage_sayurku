import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Minus, ShoppingCart, Leaf, Flame, 
  Sparkles, Check, ArrowRight, Heart 
} from "lucide-react";
import { Product } from "../types";

const PLAYGROUND_PRODUCTS: Product[] = [
  { id: "p1", name: "Bayam Hijau", category: "sayur_hijau", price: 12000, unit: "250g", image: "🥬", rating: 4.8, isFresh: true },
  { id: "p2", name: "Tomat Merah", category: "buah", price: 15000, unit: "500g", image: "🍅", rating: 4.7, isFresh: true },
  { id: "p3", name: "Cabai Rawit", category: "bumbu", price: 18000, unit: "100g", image: "🌶️", rating: 4.8, isFresh: true },
  { id: "p4", name: "Wortel Lokal", category: "umbi_umbian", price: 10500, unit: "500g", image: "🥕", rating: 4.9, isFresh: true },
];

export default function ShoppingPlayground() {
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "sayur_hijau" | "buah" | "bumbu" | "umbi_umbian">("all");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Cart total calculations
  const totalItems = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);
  const totalPrice = (Object.entries(cart) as [string, number][]).reduce((sum: number, [id, qty]: [string, number]) => {
    const product = PLAYGROUND_PRODUCTS.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    if (!cart[id]) return;
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleCheckoutSimulate = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      setCart({});
      setIsOrderPlaced(false);
    }, 4000);
  };

  const filteredProducts = PLAYGROUND_PRODUCTS.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-4 border border-green-100">
              <Sparkles className="w-3.5 h-3.5" />
              Demo Interaktif Dapur
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Eksplorasi Katalog Dapur Anda
            </h2>
            <p className="mt-3 text-base text-gray-600 font-normal">
              Rasakan mulusnya navigasi belanja Sayurku langsung dari halaman ini. Pilih produk, kumpulkan diskon, dan simulasikan checkout Dompet Digital!
            </p>
          </div>

          {/* Categories select pills with smooth horizontal swiping on mobile viewports */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {[
              { id: "all", label: "Semua Produk" },
              { id: "sayur_hijau", label: "Sayur Hijau" },
              { id: "buah", label: "Buah" },
              { id: "bumbu", label: "Bumbu" },
              { id: "umbi_umbian", label: "Umbi-umbian" },
            ].map((cat) => (
              <button
                key={cat.id}
                id={`playground-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-green-600 text-white shadow-sm shadow-green-600/10"
                    : "bg-slate-50 hover:bg-slate-100 text-gray-600 hover:text-gray-905 border border-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Playground Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const qty = (cart[product.id] || 0) as number;
              const isFav = favoriteIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  id={`playground-item-${product.id}`}
                  className="bg-white rounded-3xl border border-gray-150/60 p-5 flex flex-col justify-between group hover:border-green-100 hover:shadow-xs transition-all duration-300 relative"
                >
                  {/* Favorite Badge button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-gray-400 hover:text-red-500 transition-colors cursor-pointer z-10"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  {/* Image Badge Illustration */}
                  <div className="aspect-square w-full rounded-2xl bg-slate-50/70 group-hover:bg-green-50/50 transition-colors flex items-center justify-center text-5xl select-none relative mb-4">
                    <span className={product.image === "🪵" ? "text-4xl" : ""}>{product.image}</span>
                    {product.isFresh && (
                      <span className="absolute bottom-3 left-3 bg-green-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                        <Leaf className="w-2.5 h-2.5" /> FRESH
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors text-sm md:text-base line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-400">Porsi {product.unit}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-extrabold text-green-600">Rp {product.price.toLocaleString("id-ID")}</span>
                      <span className="text-xs text-amber-500 font-bold">★ {product.rating}</span>
                    </div>
                  </div>

                  {/* Interactive Cart Buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-green-50 rounded-xl p-1">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-green-100 text-green-750 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-green-800">{qty} {product.unit}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-green-100 text-green-750 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full py-2.5 bg-slate-50 hover:bg-green-700 hover:text-white group-hover:bg-green-600 group-hover:text-white text-gray-700 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Belanjaan
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Checkout Cart Summary card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-slate-50 rounded-3xl p-6 border border-gray-150/65 relative overflow-hidden">
              
              {/* Order Placed Success Simulation */}
              <AnimatePresence>
                {isOrderPlaced && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mb-4 border border-green-200">
                      <Check className="w-8 h-8 text-green-600 animate-bounce" />
                    </div>
                    <h4 className="font-extrabold text-gray-900 text-lg">Checkout Berhasil!</h4>
                    <p className="text-xs text-gray-500 mt-2">
                      Terbaca melalui Dompet Digital. Tim gudang kami sedang memilah belanjaan organik segar Anda secara higienis!
                    </p>
                    <div className="mt-4 flex h-2.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-600 animate-[pulse_1s_infinite] w-full rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-green-600" />
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Daftar Belanja Anda</h3>
                </div>
                {totalItems > 0 && (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {totalItems} item
                  </span>
                )}
              </div>

              {totalItems > 0 ? (
                <div className="space-y-4">
                  {/* Cart Item Row List */}
                  <div className="max-h-60 overflow-y-auto pr-1 space-y-3">
                    {(Object.entries(cart) as [string, number][]).map(([id, qty]) => {
                      const p = PLAYGROUND_PRODUCTS.find((item) => item.id === id);
                      if (!p) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{p.image}</span>
                            <div>
                              <h5 className="font-bold text-gray-900 line-clamp-1">{p.name}</h5>
                              <p className="text-[10px] text-gray-400">Rp {p.price.toLocaleString("id-ID")} x {qty}</p>
                            </div>
                          </div>
                          <span className="font-extrabold text-gray-950">
                            Rp {(p.price * qty).toLocaleString("id-ID")}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-gray-150 pt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Total Belanja</span>
                      <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Estimasi Ongkir</span>
                      <span className="text-green-600 font-bold">Gratis Ongkir</span>
                    </div>
                    <div className="flex justify-between text-xs font-extrabold text-gray-950 text-sm pt-2 border-t border-slate-200">
                      <span>Total Bayar</span>
                      <span className="text-green-700">Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Purchase CTA */}
                  <button
                    onClick={handleCheckoutSimulate}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-green-600/10 transition-all duration-300 transform active:scale-98 cursor-pointer"
                  >
                    Bayar via Dompet Digital
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-400 max-w-[180px] mx-auto">
                    Keranjang kosong. Pilih bahan makanan segar di samping kiri untuk menguji keranjang belanja!
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
