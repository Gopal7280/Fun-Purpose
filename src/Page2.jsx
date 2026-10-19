import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, Images, Sparkles, MessageCircle, X } from "lucide-react";

import img3  from "./assets/3.jpg";
import img5  from "./assets/5.jpg";
import img6  from "./assets/6.jpg";
import img8  from "./assets/8.jpg";
import img12 from "./assets/12.jpg";
import img13 from "./assets/13.jpg";
import img14 from "./assets/14.jpg";
import img16 from "./assets/16.jpg";
import letterImg from "./assets/letter.jpg";
import mineImg   from "./assets/mine.jpeg";
import mine1Img  from "./assets/mine1.jpeg";

const galleryData = [
  {
    id: 1,
    src: img8,
    title: "The Timeless Queen",
    titleEmoji: "👸",
    tag: "Heritage Elegance",
    outfit: "Red-Gold Bandhani Lehenga",
    tribute: "Diya ko kisi throne ki zarurat nahi — jahan khadi ho jayein, jagah apne aap royal ho jaati hai.",
    quote: "Kuch log outfit se sundar bante hain... Diya outfit ko sundar banati hai. ✨",
  },
  {
    id: 2,
    src: img3,
    title: "Radiant & Ethereal",
    titleEmoji: "🌸",
    tag: "Studio Royalty",
    outfit: "Embroidered Lehenga & Mehndi",
    tribute: "Studio lights, mehndi wale haath, aur shaant chehra — she looks like a living masterpiece.",
    quote: "Jis room mein Diya ho, wahan kisi aur decoration ki zarurat nahi. 🌸",
  },
  {
    id: 3,
    src: img6,
    title: "The Royal Rajputani",
    titleEmoji: "👑",
    tag: "Regal & Majestic",
    outfit: "Purple Rajputi Poshak & Borla",
    tribute: "Forehead pe borla aur aankhon mein shahi thehraav — scrolling khud ba khud tham jaati hai.",
    quote: "Bina crown ke bhi jo Queen lage... yahi Diya hai. 👑",
  },
  {
    id: 4,
    src: img5,
    title: "The Artist & The Art",
    titleEmoji: "💄",
    tag: "Talent Meets Beauty",
    outfit: "Bridal Glow & Maang Tikka",
    tribute: "Extraordinary talent aur natural beauty ka mel — she is both the artist and the masterpiece.",
    quote: "Wahi kisi ko itna sundar bana sakti hai, jo khud itni pyari ho. 💄",
  },
  {
    id: 5,
    src: img12,
    title: "That Everyday Glow",
    titleEmoji: "☀️",
    tag: "Natural & Fresh",
    outfit: "Blush-Pink Saree & Sunshine",
    tribute: "Rooftop ki dhoop aur unki effortless muskaan — Diya ka glow kabhi chhutti nahi leta.",
    quote: "Aankhein band karke bhi pehchaan lein — is muskaan jaisa koi nahi. ☀️",
  },
  {
    id: 6,
    src: img13,
    title: "Pure Joy, Unfiltered",
    titleEmoji: "🌻",
    tag: "Candid & Jolly",
    outfit: "Casual Grey & Real Laugh",
    tribute: "No poses, no filter. Bas Diya ki dil se nikli hansi jo poore mahaul ko roshan kar de.",
    quote: "Jab Diya hasti hai, poori duniya khil uthti hai. 🌻",
  },
  {
    id: 7,
    src: img14,
    title: "Grace Under The Sky",
    titleEmoji: "✨",
    tag: "Artistic & Serene",
    outfit: "Coral Suit & Stone Gazebo",
    tribute: "Khula aasmaan aur natural thehraav — aisi effortless grace kisi seekh se nahi, kudarati aati hai.",
    quote: "Grace practice se nahi aati, grace Diya ki fitrat hai. ✨",
  },
  {
    id: 8,
    src: mineImg,
    title: "Effortlessly Poised",
    titleEmoji: "🌿",
    tag: "Quiet Confidence",
    outfit: "Wine Silk Saree & Sequin Blouse",
    tribute: "Poised, confident aur unforgettable. Bina kuch bole bhi apni presence se dil jeet lena.",
    quote: "Kuch log bina bole hi sab kuch keh dete hain. 🌿",
  },
  {
    id: 9,
    src: mine1Img,
    title: "Festive & Full of Life",
    titleEmoji: "🎊",
    tag: "Jolly Spirit",
    outfit: "Shimmering Purple Lehenga",
    tribute: "Unka jolly nature ek frame mein! Diya function attend nahi karti, function ki jaan ban jaati hai.",
    quote: "Jahan Diya ho, wahi asli celebration hoti hai. 🎊",
  },
  {
    id: 10,
    src: letterImg,
    title: "Quietly Breathtaking",
    titleEmoji: "🌷",
    tag: "Depth & Soul",
    outfit: "Classic Jewels & Mehndi",
    tribute: "Bina rangon ke bhi itna noor. Inki aankhon ki gehraai aur saadgi seedha dil tak utar jaati hai.",
    quote: "Breathtaking kehna bhi kam pad jaye... aisi khoobsurati hai. 🌷",
  },
  {
    id: 11,
    src: img16,
    title: "Golden Hour, Golden Soul",
    titleEmoji: "🌅",
    tag: "Warm & Dreamy",
    outfit: "Heart-Print Organza Saree",
    tribute: "Golden-hour ki dhoop aur unka soft nature. Lagta hai shaam ka noor sirf Diya ke liye saja ho.",
    quote: "Golden hour toh roz aata hai, lekin Diya jaisi rooh ek hi baar milti hai. 🌅",
  },
];

export default function Page2({ onNext, onBack }) {
  const [current, setCurrent] = useState(0);
  const [showPhotoMsg, setShowPhotoMsg] = useState(false);
  const [showOooModal, setShowOooModal] = useState(false);
  const touchStartX = useRef(null);
  const totalSlides = galleryData.length;

  const prev = () => setCurrent((c) => (c - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((c) => (c + 1) % totalSlides);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  const photo = galleryData[current];

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-[#fbf8f5] text-stone-800 relative select-none flex flex-col justify-between overflow-hidden px-3 py-2 sm:px-5 sm:py-3">

      {/* TOP HEADER BAR */}
      <header className="flex items-center justify-between py-1 border-b border-stone-200/50 flex-shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 sm:px-2 sm:py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-stone-200"
              title="Go back to First Page"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <span className="text-base sm:text-lg">🌸</span>
          <span className="font-serif-luxury font-bold text-xs sm:text-base text-stone-800 tracking-wide">
            Diya's Gallery
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-rose-100 text-rose-700 font-semibold border border-rose-200">
            {current + 1}/{totalSlides}
          </span>
        </div>

        {/* CUTE "OOOO" SPECIAL MODAL BUTTON */}
        <button
          onClick={() => setShowOooModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 hover:from-amber-200 hover:to-rose-200 text-stone-800 border border-amber-200/70 text-[11px] font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3 h-3 text-amber-600" />
          <span>"oooo" Note click here also ✨</span>
        </button>
      </header>

      {/* MAIN CARD CONTAINER: FITS PHOTO + TARIF IN ONE VIEW */}
      <main className="flex-1 flex flex-col justify-center min-h-0 py-1.5 max-w-md mx-auto w-full">

        {/* IMAGE FRAME WITH AMBIENT GLOW BACKDROP */}
        <div
          className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden bg-stone-950 shadow-xl border border-stone-200/60 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient blurred backdrop for luxury aesthetic */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-35 scale-110 pointer-events-none transition-all duration-500"
            style={{ backgroundImage: `url(${photo.src})` }}
          />

          {/* Foreground Crisp Image (object-contain ensures 100% full visibility, no cuts) */}
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.title}
            className="relative z-10 w-full h-full object-contain p-1"
            style={{ animation: "fadeSlide 0.3s ease" }}
            loading="eager"
          />

          {/* Top-Left Tag Badge */}
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold tracking-wide border border-white/20">
              {photo.tag}
            </span>
          </div>

          {/* Top-Right Trait Badge */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium border border-white/25">
              ✦ {photo.outfit}
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prev}
            aria-label="Previous Photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/25 active:scale-90 transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={next}
            aria-label="Next Photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/25 active:scale-90 transition-all cursor-pointer shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center items-center gap-1 py-1 flex-shrink-0">
          {galleryData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-4 h-1.5 bg-rose-500" : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* MINIMAL QUALITY TARIF (COMPACT & BEAUTIFUL - NO SCROLL) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-stone-200/80 shadow-md p-2.5 sm:p-3 flex-shrink-0 flex flex-col gap-1 text-center">
          {/* Title & Emoji */}
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="font-serif-luxury text-stone-800 text-sm sm:text-base font-bold leading-tight">
              {photo.title}
            </h2>
            <span className="text-base">{photo.titleEmoji}</span>
          </div>

          {/* Tribute Text - Minimal, high quality, touching */}
          <p className="text-xs sm:text-[13px] text-stone-700 font-medium leading-snug line-clamp-2 px-1">
            {photo.tribute}
          </p>

          {/* Highlight Praise Quote */}
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 rounded-lg py-1 px-2 border border-rose-100">
            <p className="text-[11px] sm:text-xs text-rose-700 font-semibold italic leading-tight">
              "{photo.quote}"
            </p>
          </div>
        </div>

      </main>

      {/* BOTTOM ACTION BAR (Side-by-side, compact, zero-scroll) */}
      <footer className="pt-1 flex-shrink-0 max-w-md mx-auto w-full">
        <div className="flex gap-2">
          {/* Left Button: Mujhe Photos Dekhne Do */}
          <button
            onClick={() => setShowPhotoMsg(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-95 text-stone-700 font-semibold text-xs border border-stone-300/80 transition-all cursor-pointer shadow-sm"
          >
            <Images className="w-3.5 h-3.5 text-stone-500" />
            <span className="truncate">Photos Dekhne Do</span>
          </button>

          {/* Right Button: Aage Badhein */}
          <button
            onClick={onNext}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer hover:opacity-95"
          >
            <span>Aage Badhte Hain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* MODAL 1: CUTE "OOOO" & NATURE POPUP */}
      {showOooModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-amber-200/90 shadow-2xl p-5 sm:p-6 max-w-sm w-full text-center relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowOooModal(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-3xl mb-2">💬✨</div>
            <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-stone-800 mb-2">
              The Cute "oooo" & Soft Nature
            </h3>

            <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-3 mb-3 text-left">
              <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed mb-2">
                Jab aap chat pe <span className="font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">"oooo"</span> likhti ho na? Honestly, that is cuter than anything else in the world! 🥺
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Aur jab kabhi thoda sa gussa hoti ho, toh woh gussa kam... aur <span className="text-rose-600 font-semibold">10 guna zyada cute</span> lagta hai! 🥰
              </p>
            </div>

            <p className="text-xs text-stone-500 italic mb-4">
              "Soft nature, jolly vibes, aur unki pyari muskaan — yahi toh Diya ko sabse alag aur special banata hai." ✨
            </p>

            <button
              onClick={() => setShowOooModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold text-xs shadow-md active:scale-95"
            >
              Aww, Itna Sweet! 🙈
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: FUNNY "I KNEW IT" MESSAGE POPUP */}
      {showPhotoMsg && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-2xl p-5 sm:p-6 max-w-sm w-full text-center relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowPhotoMsg(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-4xl mb-2" style={{ animation: "bounce 1s infinite" }}>😄</div>
            <h3 className="font-serif-luxury text-lg font-bold text-stone-800 mb-1.5">
              Haan haan, mujhe pata tha!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-2 font-medium">
              I know... aap apne photos se aage itni jaldi nahi badhoge!
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              Bahut pyare hain na saare photos? ✨ Koi baat nahi — aaram se dekho, jitni baar man kare! 🌸
            </p>

            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-2.5 mb-4 text-xs text-amber-800 italic font-medium">
              "Aur agar hum bhi aapki jagah hote, toh hum bhi yahi karte!" 🙈
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPhotoMsg(false)}
                className="flex-1 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200"
              >
                Aur Photos Dekho 🌸
              </button>
              <button
                onClick={() => { setShowPhotoMsg(false); onNext(); }}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold shadow-md"
              >
                Ab Aage Chalte Hain ✨
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0.35; transform: scale(0.98); }
          to   { opacity: 1;    transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

