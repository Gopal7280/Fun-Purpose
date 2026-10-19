import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, ArrowLeft } from "lucide-react";
import successVideo from "./assets/sucess-vedio.mp4";

const traits = [
  {
    emoji: "✂️",
    title: "Hair & Makeup Artist",
    desc: "She does not just do makeup — she transforms. Every look she creates tells a story. The precision, the patience, the eye for detail that she brings is something most people spend years trying to learn. She just has it.",
  },
  {
    emoji: "👗",
    title: "Rental Dresses Entrepreneur",
    desc: "She saw an opportunity and she built something beautiful out of it. Running a rental dress business takes vision, organisation, and a deep understanding of aesthetics — all things she has in abundance.",
  },
  {
    emoji: "🎯",
    title: "Discipline & Focus",
    desc: "Behind every skill is hard work most people never see. Diya shows up consistently, learns continuously, and delivers quality every single time. That is not luck. That is discipline.",
  },
  {
    emoji: "🌱",
    title: "Always Growing",
    desc: "What makes her truly admirable is that she does not settle. She keeps learning, keeps improving, keeps pushing — quietly and without any need for validation from anyone.",
  },
];

export default function Page3({ onBack }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (!started) setStarted(true);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(!muted);
  };

  const restart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setPlaying(true);
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-stone-800 overflow-x-hidden">

      {/* FAIRY LIGHTS */}
      <div className="relative w-full h-10 border-b border-stone-200/50 bg-stone-100/60 overflow-hidden flex items-center justify-around px-2">
        <div className="absolute top-2 left-0 w-full h-px bg-amber-200/60" />
        {[...Array(18)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-2 bg-stone-400" />
            <div
              className="fairy-bulb w-2.5 h-3 rounded-full"
              style={{
                background: i % 3 === 0 ? "#fef08a" : i % 3 === 1 ? "#fda4af" : "#fed7aa",
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-stone-200 shadow-sm"
              title="Go back to Photos"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-xl">🌸</span>
          <span className="font-serif-luxury font-bold text-sm sm:text-base md:text-xl text-stone-800 tracking-wide">
            Diya's Birthday Tribute
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700 font-semibold border border-amber-200">
            Chapter Three
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-12">

        {/* HERO HEADER */}
        <div className="text-center py-6 sm:py-8">
          <div className="text-4xl sm:text-5xl mb-3">🌟</div>
          <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-stone-800 mb-2 leading-tight">
            Your Journey. Your Success.
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-medium">
            Hardwork. Passion. Discipline. — This chapter is all about you.
          </p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
        </div>

        {/* INTRO QUOTE */}
        <div className="mb-6 bg-gradient-to-r from-amber-50 via-rose-50/60 to-amber-50 border border-amber-200/70 rounded-3xl px-5 py-5 shadow-sm text-center">
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            "Success ke peeche sirf talent nahi hota — hoti hai
            <span className="text-amber-700 font-bold"> mehnat</span>,
            hota hai <span className="text-rose-600 font-bold">junoon</span>,
            aur hoti hai <span className="text-stone-700 font-bold">woh discipline</span> jo bina kisi se bole,
            roz subah uthke kaam karne ki baat karti hai."
          </p>
          <p className="text-xs text-stone-400 mt-2 font-medium">— That is exactly what Diya does. ✨</p>
        </div>

        {/* TRAIT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {traits.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-200/70 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{t.emoji}</div>
              <h3 className="font-serif-luxury font-bold text-base text-stone-800 mb-1.5">{t.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* VIDEO SECTION */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎬</span>
            <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-stone-800">
              A Glimpse of Your Success
            </h2>
          </div>
          <p className="text-sm text-stone-500 mb-4 leading-relaxed">
            Words can describe her work, but this video shows it. Watch, appreciate, and feel proud — because what she creates is genuinely extraordinary.
          </p>

          <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl border border-stone-200/50">
            <video
              ref={videoRef}
              src={successVideo}
              className="w-full rounded-2xl"
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(false)}
              style={{ maxHeight: "65vw", minHeight: "200px", objectFit: "cover" }}
            />

            {/* Video overlay controls */}
            {!started && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                  <Play className="w-7 h-7 text-rose-600 ml-1" />
                </div>
              </div>
            )}

            {/* Control bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={restart}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-stone-400 mt-2">Tap the video or press play to watch 🎬</p>
        </div>

        {/* HARDWORK TRIBUTE */}
        <div className="mb-8 bg-white rounded-3xl border border-stone-200/70 shadow-sm p-5 sm:p-6">
          <h3 className="font-serif-luxury font-bold text-lg sm:text-xl text-stone-800 mb-3">
            What Makes Her Truly Inspiring ✦
          </h3>
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Being good at something is one thing. Waking up every day, building a skill that requires
              precision and creativity, turning it into a profession — that takes a different kind of strength.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Diya does not just do makeup — she reads a face, understands a look, and creates something
              that makes someone feel their best. Her rental dress business is not just commerce — it is
              curation. An eye for what looks beautiful, built into a service.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              That kind of work? That combination of artistry, business sense, and quiet dedication?
              <span className="font-semibold text-stone-800"> That is genuinely admirable.</span>
            </p>
          </div>
        </div>

        {/* ANGER / CUTE MENTION */}
        <div className="mb-8 bg-gradient-to-br from-rose-50/70 to-amber-50/60 border border-rose-200/50 rounded-3xl p-5 sm:p-6 shadow-sm text-center">
          <div className="text-3xl mb-2">🫢</div>
          <h3 className="font-serif-luxury font-bold text-lg text-stone-800 mb-2">
            Even Her Angry Face is Cute, Honestly
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Woh gussa hoti hai toh bhi ek chhoti si muskaan lip ke kone par rheti hai. Jisko seriously
            lena chahiye tha, woh cute lag jaata hai. That is a very Diya thing to do — somehow making
            even frustration look endearing. ✨
          </p>
        </div>

        {/* SUPPORT MESSAGE */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden text-center">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />
            <div className="relative z-10">
              <div className="text-3xl mb-3">🌸</div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Ek Baat Sunni Hi Chahiye
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-3">
                I will support you. Mujhse jo hoga, jitna hoga —
                <span className="text-white font-semibold"> if you need me, I will help you.</span>
              </p>
              <p className="text-sm text-stone-400 leading-relaxed mb-5">
                Chahe situation jo bhi ho. As a friend — genuinely. Koi expectation nahi, koi condition nahi.
                Sirf yeh baat ki agar kabhi zarurat ho, main hoon.
              </p>
              <div className="inline-block border border-stone-600/60 rounded-2xl px-4 py-2.5 bg-white/5">
                <p className="text-xs sm:text-sm text-stone-300 italic font-medium">
                  "Aisi dost milna bhi ek achievement hai — aur tum meri uss achievement mein ho." ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL BIRTHDAY WISH */}
        <div className="text-center py-6 px-4 bg-gradient-to-br from-amber-50 to-rose-50/60 rounded-3xl border border-amber-200/60 shadow-sm">
          <div className="text-4xl mb-3">🎂</div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-800 mb-3 leading-tight">
            Happy Birthday, Diya!
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-md mx-auto mb-4">
            Aaj ka din sirf ek date nahi hai — yeh ek reminder hai ki duniya mein kuch log hote hain jinke hone se
            sab kuch thoda better lagta hai. Tum unhi mein se ek ho.
          </p>
          <p className="text-sm text-stone-500 font-medium mb-2">
            Har sapna poora ho. Har kaam mein success mile. Aur woh "oooo" waali energy kabhi kam na ho. ✨
          </p>
          <div className="flex justify-center gap-2 flex-wrap mt-4 text-xl">
            {["🌸", "✨", "🎊", "🌻", "🌿", "🎬", "👑"].map((e, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM BACK NAVIGATION BUTTON */}
        {onBack && (
          <div className="text-center mt-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-rose-500" />
              <span>← Wapas Photo Gallery Par Jayein</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

