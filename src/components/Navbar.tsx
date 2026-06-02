import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Layout, Leaf } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy tracking logic
      const sections = ["fitur", "cara-kerja", "faq"];
      const scrollPosition = window.scrollY + 140; // offset for the active boundary

      if (window.scrollY < 150) {
        setActiveSection("beranda");
        return;
      }

      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Beranda", href: "#", key: "beranda" },
    { name: "Fitur Aplikasi", href: "#fitur", key: "fitur" },
    { name: "Cara Kerja", href: "#cara-kerja", key: "cara-kerja" },
    { name: "Pertanyaan", href: "#faq", key: "faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-md shadow-green-600/20 group-hover:bg-green-700 transition-colors">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Sayur<span className="text-green-600">ku</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Call-to-Action Download Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#fitur"
              className="px-5 py-2.5 bg-green-900 shadow-sm hover:bg-green-800 text-white rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <Layout className="w-4 h-4" />
              Coba Demo
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-green-600 focus:outline-none transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-green-700 bg-green-50"
                        : "text-gray-700 hover:text-green-605 hover:bg-green-50/30"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4 px-3">
                <a
                  href="#fitur"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Layout className="w-4 h-4" />
                  Coba Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
