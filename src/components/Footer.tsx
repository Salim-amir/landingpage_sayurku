import { Leaf, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-350 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Sayur<span className="text-green-500">ku</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Sayurku adalah platform belanja kebutuhan dapur modern, membawakan sayur segar petik subuh, buah-buahan lokal, bumbu lengkap, dan sembako berkualitas premium langsung ke hadapan Anda.
            </p>
            {/* Social link placeholders */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: MessageCircle, href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-8 h-8 rounded-lg bg-slate-850 hover:bg-green-600 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Perusahaan</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-green-500 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Kemitraan Petani</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Karir Lokal</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Press & Blog</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Layanan</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#fitur" className="hover:text-green-500 transition-colors">SayurPay</a></li>
              <li><a href="#fitur" className="hover:text-green-500 transition-colors">Katalog Sayur</a></li>
              <li><a href="#fitur" className="hover:text-green-500 transition-colors">Pengiriman Kilat</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Grosir Dapur</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Dukungan</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-green-500 transition-colors">Pertanyaan Umum</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Kontak Kami</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Alamat Hub</h5>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Kuningan Central Hub No. 12,<br />
              Kec. Setiabudi, Kota Jakarta Selatan,<br />
              DKI Jakarta, 12920
            </p>
          </div>

        </div>

        {/* Bottom Panel Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Sayurku. Hak Cipta Dilindungi Undang-Undang.</span>
          <span>Dibuat penuh ketulusan untuk dapur nusantara Indonesia 🇮🇩</span>
        </div>

      </div>
    </footer>
  );
}
