import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Gift, Volume2, VolumeX, Cake as CakeIcon, X, Maximize2 } from "lucide-react";
import Page2 from "./Page2";
import Page3 from "./Page3";

// Image Imports
import coverImg from "./assets/cover.jpg";
import img3 from "./assets/3.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img9 from "./assets/9.jpg";
import img16 from "./assets/16.jpg";

/* ─── WEB AUDIO API: SYNTHESIZED HAPPY BIRTHDAY MELODY ─── */
function playHappyBirthdayMelody() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Note frequencies in Hz
    const notes = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.0,
      A4: 440.0,
      B4: 493.88,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      F5: 698.46,
      G5: 783.99,
    };

    // Melody: [Note, durationInBeats]
    const melody = [
      ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
      ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
      ["G4", 0.75], ["G4", 0.25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 1.5],
      ["F5", 0.75], ["F5", 0.25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2.5],
    ];

    let startTime = ctx.currentTime + 0.1;
    const tempo = 0.38; // seconds per beat

    melody.forEach(([note, beats]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle"; // soft music-box / bell tone
      osc.frequency.setValueAtTime(notes[note], startTime);

      const duration = beats * tempo;
      // Gentle chime envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.28, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);

      startTime += duration;
    });
  } catch (e) {
    console.error("Audio autoplay notice:", e);
  }
}

export default function App() {
  // Multi-page navigation
  const [currentPage, setCurrentPage] = useState(1);

  // Splash / Intro State (Red & White Balloons + Big HBD screen)
  const [showSplash, setShowSplash] = useState(true);
  const [splashTimer, setSplashTimer] = useState(3);

  // Cake cutting states
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  // Photo Lightbox modal
  const [activePhoto, setActivePhoto] = useState(null);

  // Mobile photo wall expand toggle (clean 4 by default)
  const [showAllPhotosMobile, setShowAllPhotosMobile] = useState(false);

  // Sound enable/disable
  const [isMuted, setIsMuted] = useState(false);

  // Auto dismiss splash after 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSplashTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowSplash(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Multi-stage confetti celebration
  const triggerCelebration = () => {
    if (isCutting || isCakeCut) return;
    setIsCutting(true);

    if (!isMuted) {
      playHappyBirthdayMelody();
    }

    // After knife animation glides, cut the cake and burst confetti
    setTimeout(() => {
      setIsCutting(false);
      setIsCakeCut(true);
      setShowCelebrationModal(true);

      // Fireworks Confetti wave 1
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#ef4444", "#ffffff", "#f59e0b", "#ec4899", "#f43f5e"],
      });

      // Wave 2
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { x: 0.2, y: 0.5 },
          colors: ["#dc2626", "#ffffff", "#fbbf24", "#fda4af"],
        });
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { x: 0.8, y: 0.5 },
          colors: ["#dc2626", "#ffffff", "#fbbf24", "#fda4af"],
        });
      }, 350);

      // Wave 3 Stars & hearts
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 120,
          shapes: ["circle"],
          colors: ["#ffd700", "#ff4d6d", "#ffffff"],
        });
      }, 700);
    }, 1200);
  };

  // Wall Frames metadata
  const wallPhotos = [
    {
      id: "frame-3",
      src: img3,
      title: "Radiant & Chic",
      caption: "A look that radiates natural charm and effortless grace ✨",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "-rotate-2",
      tag: "Gorgeous Look",
    },
    {
      id: "frame-5",
      src: img5,
      title: "Golden Hour Glow",
      caption: "Lighting up every room with pure confidence and warmth 🌟",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "rotate-2",
      tag: "Glow & Glam",
    },
    {
      id: "frame-6",
      src: img6,
      title: "The Master Artist",
      caption: "The magic in your hands, shaping beauty with dedication 💄",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "rotate-3",
      tag: "Artistry & Passion",
    },
    {
      id: "frame-7",
      src: img7,
      title: "Timeless Elegance",
      caption: "Graceful in every angle, unmatched in style and poise 🌸",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "-rotate-3",
      tag: "Pure Elegance",
    },
    {
      id: "frame-9",
      src: img9,
      title: "The Boss Woman",
      caption: "Hard work, big dreams, and inspiring courage every single day 👑",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "-rotate-1",
      tag: "Inspiration",
    },
    {
      id: "frame-16",
      src: img16,
      title: "That Pretty Smile",
      caption: "A genuine, heart-melting smile that brightens any dull moment 💫",
      position: "col-span-12 md:col-span-3 lg:col-span-3",
      rotate: "rotate-2",
      tag: "Heartfelt Smile",
    },
  ];

  return currentPage === 2 ? (
    <Page2 onNext={() => setCurrentPage(3)} onBack={() => setCurrentPage(1)} />
  ) : currentPage === 3 ? (
    <Page3 onBack={() => setCurrentPage(2)} />
  ) : (
    <div className="min-h-screen bg-[#fcf9f6] text-stone-800 relative select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. INTRO SPLASH: RED & WHITE BALLOONS + BIG CELEBRATION
         ───────────────────────────────────────────────────────────── */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-red-50/95 via-rose-100/90 to-white/95 backdrop-blur-md overflow-hidden transition-all duration-700">
          {/* Floating Red and White Balloons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { color: "#ef4444", left: "6%", size: 65, delay: "0s", dur: "4.8s" },
              { color: "#ffffff", left: "14%", size: 75, delay: "0.4s", dur: "4.2s" },
              { color: "#dc2626", left: "22%", size: 85, delay: "0.1s", dur: "5.1s" },
              { color: "#ffffff", left: "33%", size: 70, delay: "0.7s", dur: "4.5s" },
              { color: "#f87171", left: "45%", size: 90, delay: "0.2s", dur: "4.3s" },
              { color: "#ffffff", left: "55%", size: 68, delay: "0.8s", dur: "4.7s" },
              { color: "#ef4444", left: "65%", size: 82, delay: "0.3s", dur: "5.2s" },
              { color: "#ffffff", left: "75%", size: 72, delay: "0.5s", dur: "4.1s" },
              { color: "#b91c1c", left: "85%", size: 88, delay: "0.2s", dur: "4.6s" },
              { color: "#ffffff", left: "93%", size: 65, delay: "0.9s", dur: "5s" },
            ].map((b, i) => (
              <div
                key={i}
                className="absolute balloon-fly flex flex-col items-center"
                style={{
                  left: b.left,
                  animationDelay: b.delay,
                  animationDuration: b.dur,
                  bottom: "-120px",
                }}
              >
                {/* 3D Glossy Balloon Body */}
                <div
                  className="rounded-full shadow-lg relative"
                  style={{
                    width: `${b.size}px`,
                    height: `${b.size * 1.25}px`,
                    background:
                      b.color === "#ffffff"
                        ? "radial-gradient(circle at 35% 30%, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%)"
                        : `radial-gradient(circle at 35% 30%, #fca5a5 0%, ${b.color} 55%, #7f1d1d 100%)`,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Gloss Highlight */}
                  <div className="absolute top-2 left-3 w-4 h-6 bg-white/60 rounded-full blur-[1px] rotate-[-25deg]" />
                </div>
                {/* Balloon Knot */}
                <div
                  className="w-2.5 h-1.5 rounded-sm mt-[-1px]"
                  style={{ background: b.color === "#ffffff" ? "#cbd5e1" : "#991b1b" }}
                />
                {/* Balloon String */}
                <div className="w-[1px] h-16 bg-stone-300/80" />
              </div>
            ))}
          </div>

          {/* Center Splash Banner */}
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-lg animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-rose-200/80 text-rose-600 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
              Today is a Special Day
              <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
            </div>

            <div className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-amber-600 font-serif-luxury mb-2 sm:mb-3 drop-shadow-sm leading-tight">
              Happy Birthday Diya!
            </div>

            <p className="text-stone-600 text-sm sm:text-base mb-5 font-medium px-2 leading-relaxed">
              Wishing the prettiest, most hardworking & talented soul a day as beautiful as your smile! 💖
            </p>

            {/* Celebration Emojis */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 text-2xl sm:text-4xl mb-6 animate-bounce">
              <span>🥳</span>
              <span>🎈</span>
              <span>🎂</span>
              <span>🎉</span>
              <span>💐</span>
            </div>

            <button
              onClick={() => setShowSplash(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide cursor-pointer"
            >
              Step Into The Celebration 🎈
            </button>
            <div className="mt-2 text-xs text-stone-400">Opening automatically in {splashTimer}s...</div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FAIRY LIGHTS STRING ACROSS TOP OF THE WALL
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-10 border-b border-stone-200/50 bg-stone-100/60 overflow-hidden flex items-center justify-around px-2">
        {/* Fairy light line */}
        <div className="absolute top-2 left-0 w-full h-[1px] bg-amber-200/60" />
        {[...Array(18)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[1px] h-2 bg-stone-400" />
            <div
              className="fairy-bulb w-2.5 h-3 rounded-full"
              style={{
                background:
                  i % 3 === 0
                    ? "#fef08a"
                    : i % 3 === 1
                    ? "#fda4af"
                    : "#fed7aa",
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Top Bar Controls */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎂</span>
          <span className="font-serif-luxury font-bold text-lg md:text-xl text-stone-800 tracking-wide">
            Diya's Birthday Celebration
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] bg-rose-100 text-rose-600 font-semibold border border-rose-200">
            Special Edition ✨
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-white shadow-sm border border-stone-200 text-stone-600 hover:text-rose-600 hover:border-rose-300 transition-all cursor-pointer"
            title={isMuted ? "Unmute Melody" : "Mute Melody"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE MAIN BIRTHDAY ROOM WALL
         ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 pt-4 pb-16">
        {/* Wall Header Greeting */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium mb-2">
            <span>✨</span>
            <span>A wall full of moments dedicated to you</span>
            <span>✨</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif-luxury text-stone-800 tracking-tight">
            Happy Birthday, Beautiful Soul 🌸
          </h1>
          <p className="mt-2 text-stone-500 text-sm md:text-base max-w-xl mx-auto">
            Surrounded by your grace, style, and unmatched dedication. Click the cake below to make your birthday wish!
          </p>
        </div>

        {/* ─── THE WALL GRID ─── */}
        <div className="relative bg-gradient-to-b from-[#fbf8f5] to-[#f4ede6] p-6 md:p-10 rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden">
          {/* Subtle Wall Texture Dots / Accents */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Surrounding Wall Photo Frames & Centerpiece */}
          <div className="relative z-10 grid grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* ── LEFT WALL COLUMN: FRAMES (3.jpg, 6.jpg, 9.jpg) (Desktop view) ── */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
              {/* Frame 1: 3.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[0])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-amber-100/90 shadow-md transform lg:-rotate-2 transition-transform duration-300 relative"
              >
                {/* Hanging Nail Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-700/80 rounded-full shadow border border-amber-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img3}
                    alt="Diya look"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    Radiant Chic ✨
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Natural grace & beauty</p>
                </div>
              </div>

              {/* Frame 2: 6.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[2])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-rose-100/90 shadow-md transform lg:rotate-2 transition-transform duration-300 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-rose-700/80 rounded-full shadow border border-rose-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img6}
                    alt="Diya Artistry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    The Makeup Artist 💄
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Pure dedication & talent</p>
                </div>
              </div>

              {/* Frame 3: 9.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[4])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-stone-200 shadow-md transform lg:-rotate-2 transition-transform duration-300 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-stone-700/80 rounded-full shadow border border-stone-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img9}
                    alt="Diya Confidence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Boss Woman 👑
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Inspiring entrepreneur</p>
                </div>
              </div>
            </div>

            {/* ── CENTER WALL COLUMN: COVER PHOTO + INTERACTIVE CAKE ── */}
            <div className="col-span-12 lg:col-span-6 flex flex-col items-center">
              
              {/* Crown / Spotlight Badge */}
              <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs font-bold shadow-sm">
                <span>👑</span>
                <span>THE BIRTHDAY QUEEN</span>
                <span>👑</span>
              </div>

              {/* The Grand Centerpiece Frame: cover.jpg */}
              <div className="relative group w-full max-w-md bg-white p-4 rounded-2xl border-8 border-amber-200/90 shadow-2xl center-glow">
                {/* Golden Hanging Ribbon Accent */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-md border-2 border-white" />
                  <div className="w-0.5 h-4 bg-amber-400/80" />
                </div>

                <div className="overflow-hidden rounded-xl aspect-[4/5] bg-stone-100 shadow-inner relative">
                  <img
                    src={coverImg}
                    alt="Diya Birthday Cake Cut"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white text-center">
                    <h3 className="font-serif-luxury text-xl font-bold tracking-wide">
                      Diya's Birthday Moment ✨
                    </h3>
                    <p className="text-xs text-rose-200 font-light mt-0.5">
                      Celebrating the sweetness, smiles & milestones of today!
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── INTERACTIVE BIRTHDAY CAKE SECTION ─── */}
              <div className="w-full max-w-sm mt-6 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-rose-200/90 shadow-lg text-center relative overflow-hidden">
                
                {/* Cake Visual Representation */}
                <div className="relative py-4 flex flex-col items-center justify-center">
                  {/* Floating Knife Animation when slicing */}
                  {isCutting && (
                    <div className="knife-slice absolute z-30 text-5xl pointer-events-none drop-shadow-lg">
                      🔪
                    </div>
                  )}

                  {/* Candle Flames & Candle */}
                  <div className="flex gap-4 mb-[-2px] z-20">
                    {[1, 2, 3].map((candle) => (
                      <div key={candle} className="flex flex-col items-center">
                        {/* Candle Flame (Blows out if cake cut) */}
                        {!isCakeCut ? (
                          <div className="flame-flicker w-3.5 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                        ) : (
                          <div className="w-1.5 h-3 text-[10px] text-stone-400 font-bold animate-fade-out">
                            💨
                          </div>
                        )}
                        {/* Candle Stick */}
                        <div className="w-2 h-7 bg-gradient-to-b from-rose-300 via-white to-rose-400 rounded-t-sm shadow-sm border border-rose-200" />
                      </div>
                    ))}
                  </div>

                  {/* Top Tier Cake */}
                  <div className="w-36 h-10 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-xl border border-rose-300 relative shadow-sm flex items-center justify-center overflow-hidden">
                    {/* Cream Drips */}
                    <div className="absolute top-0 inset-x-0 flex justify-around">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-3 bg-white rounded-b-full shadow-inner"
                        />
                      ))}
                    </div>
                    {/* Cherries / Sprinkles */}
                    <div className="flex gap-2 text-xs z-10">
                      <span>🍓</span>
                      <span>✨</span>
                      <span>🍓</span>
                    </div>
                  </div>

                  {/* Bottom Tier Cake */}
                  <div
                    className={`w-52 h-14 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-xl border border-rose-300 shadow-md relative flex items-center justify-center transition-all duration-700 ${
                      isCakeCut ? "border-dashed border-red-400 shadow-rose-200" : ""
                    }`}
                  >
                    {/* Cake cut slice indicator */}
                    {isCakeCut ? (
                      <div className="text-xs font-bold text-rose-600 bg-white/80 px-2.5 py-1 rounded-full shadow-sm animate-bounce">
                        🎂 Cake Cut Successfully! 🎉
                      </div>
                    ) : (
                      <div className="flex gap-3 text-sm text-rose-400">
                        <span>🌸</span>
                        <span className="font-cursive text-lg text-rose-700">Happy Birthday Diya</span>
                        <span>🌸</span>
                      </div>
                    )}
                  </div>

                  {/* Cake Plate Stand */}
                  <div className="w-60 h-3 bg-gradient-to-r from-amber-100 via-white to-amber-200 rounded-full shadow-md border border-amber-300 mt-1" />
                </div>

                {/* Cake Cut Button */}
                <div className="mt-3">
                  {!isCakeCut ? (
                    <button
                      onClick={triggerCelebration}
                      disabled={isCutting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <CakeIcon className="w-4 h-4 text-amber-200" />
                      {isCutting ? "Cutting The Cake with Love... 🔪" : "Cut The Cake 🎂✨"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCelebrationModal(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-sm shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <span>🎉</span> Re-Open Birthday Wishes <span>💌</span>
                    </button>
                  )}
                  <p className="text-[11px] text-stone-400 mt-2">
                    {isCakeCut
                      ? "A slice of sweet happiness for your special day!"
                      : "Tap to cut the cake & play the birthday melody!"}
                  </p>
                </div>
              </div>

            </div>

            {/* ── RIGHT WALL COLUMN: FRAMES (5.jpg, 7.jpg, 16.jpg) (Desktop view) ── */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
              {/* Frame 4: 5.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[1])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-amber-100/90 shadow-md transform lg:rotate-2 transition-transform duration-300 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-700/80 rounded-full shadow border border-amber-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img5}
                    alt="Diya Golden Glow"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Golden Glow 🌟
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Sun-kissed perfection</p>
                </div>
              </div>

              {/* Frame 5: 7.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[3])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-rose-100/90 shadow-md transform lg:-rotate-3 transition-transform duration-300 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-rose-700/80 rounded-full shadow border border-rose-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img7}
                    alt="Diya Elegance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    Pure Elegance 🌸
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Classic & graceful style</p>
                </div>
              </div>

              {/* Frame 6: 16.jpg */}
              <div
                onClick={() => setActivePhoto(wallPhotos[5])}
                className="wall-frame group cursor-pointer bg-white p-3.5 rounded-xl border-4 border-stone-200 shadow-md transform lg:rotate-2 transition-transform duration-300 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-stone-700/80 rounded-full shadow border border-stone-300" />
                <div className="overflow-hidden rounded-lg aspect-[4/5] bg-stone-100 relative">
                  <img
                    src={img16}
                    alt="Diya Smile"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 text-center">
                  <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                    Heartfelt Smile 💫
                  </span>
                  <p className="text-xs text-stone-500 mt-1">Unmatched positivity</p>
                </div>
              </div>
            </div>

            {/* ── MOBILE CURATED GALLERY: CLEAN 4-PHOTO GRID (Visible only on mobile/tablet) ── */}
            <div className="col-span-12 lg:hidden mt-6 pt-5 border-t border-rose-200/50">
              <div className="text-center mb-4">
                <span className="inline-block text-[11px] font-bold tracking-widest text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-xs">
                  📸 Diya's Memories Wall
                </span>
                <p className="text-xs text-stone-500 mt-1">
                  Tap any photo to open high-definition view ✨
                </p>
              </div>

              {/* Minimal 2-column mobile grid: clean, balanced & easy to scroll on iPhone */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {wallPhotos.slice(0, showAllPhotosMobile ? 6 : 4).map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhoto(photo)}
                    className="group cursor-pointer bg-white p-2.5 rounded-2xl border-2 border-amber-100/80 shadow-md active:scale-95 transition-all"
                  >
                    <div className="overflow-hidden rounded-xl aspect-[4/5] bg-stone-100 relative">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 text-white backdrop-blur-xs">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="pt-2 text-center">
                      <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 truncate block">
                        {photo.tag}
                      </span>
                      <p className="text-xs font-medium text-stone-700 mt-1 truncate">
                        {photo.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Toggle to see remaining photos */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllPhotosMobile(!showAllPhotosMobile)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-700 text-xs font-semibold shadow-sm border border-stone-200 active:scale-95 hover:bg-stone-50 transition-all cursor-pointer"
                >
                  {showAllPhotosMobile ? "Show Less 🌸" : "View All 6 Memories ✨"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. CELEBRATION POPUP MODAL (ON CAKE CUT)
         ───────────────────────────────────────────────────────────── */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-white via-rose-50/40 to-white rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-rose-200 text-center animate-in zoom-in-95 duration-300 max-h-[88dvh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Bouncing Emojis */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 text-3xl sm:text-4xl mb-3 animate-bounce">
              <span>🥳</span>
              <span>🎂</span>
              <span>🎉</span>
              <span>💖</span>
              <span>🌟</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              Cake Cut Complete!
            </div>

            <h2 className="text-xl sm:text-3xl font-bold font-serif-luxury text-stone-800">
              Happy Birthday Diya! 🎂✨
            </h2>

            <div className="my-4 p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-sm text-stone-700 text-xs sm:text-sm leading-relaxed text-left space-y-2.5 font-medium">
              <p>
                Diya, wishing you the happiest, sweetest birthday! 🌸
              </p>
              <p>
                From your incredible journey as an extraordinary <strong>Hair & Makeup Artist</strong> to launching your new <strong>Rental Dresses business</strong> — your growth and tireless hustle inspire everyone around you!
              </p>
              <p className="text-rose-600 font-semibold italic text-center pt-1 border-t border-rose-100">
                "May this upcoming year bring you endless success, grand milestones, and reasons to smile every single day!" ✨
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center">
              <button
                onClick={() => setShowCelebrationModal(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Enjoy Wall View
              </button>
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  setCurrentPage(2);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-rose-300 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue to Next Chapter 💌</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. PHOTO PREVIEW / LIGHTBOX MODAL
         ───────────────────────────────────────────────────────────── */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white animate-in zoom-in-95 duration-200 max-h-[90dvh] flex flex-col"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 active:scale-90 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-stone-900 overflow-hidden flex items-center justify-center max-h-[58dvh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-contain max-h-[58dvh]"
              />
            </div>
            <div className="p-3 sm:p-4 text-center bg-white">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                {activePhoto.tag}
              </span>
              <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-stone-800 mt-1.5">
                {activePhoto.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 max-w-xs mx-auto">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
