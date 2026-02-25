import { useState, useEffect, useRef } from "react";
import PHOTO_ENVELOPE from "./assets/mine1.jpeg";
import PHOTO_LETTER from "./assets/letter.jpeg";
/* ─── FONT LOADER ─── */
const FontLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

/* ─── SWAP THESE with real image URLs or import ─── */
// const PHOTO_ENVELOPE = ".assets/letter.jpeg";
// const PHOTO_LETTER   = "https://placehold.co/280x340/fdf0f3/f43f5e?text=Photo+2+✨";

/* ─── CONFETTI ─── */
function useConfetti(active) {
  useEffect(() => {
    if (!active) return;
    const root = document.getElementById("confetti-root");
    if (!root) return;
    const colors = ["#60a5fa","#3b82f6","#bfdbfe","#eff6ff","#fbbf24","#fff","#93c5fd","#93c5fd"];
    const pieces = [];
    for (let i = 0; i < 140; i++) {
      const el = document.createElement("div");
      const sz = Math.random() * 9 + 5;
      Object.assign(el.style, {
        position:"fixed", width:sz+"px", height:(Math.random()>0.5?sz:sz*1.6)+"px",
        borderRadius:Math.random()>0.5?"50%":"3px",
        background:colors[Math.floor(Math.random()*colors.length)],
        left:Math.random()*100+"vw", top:"-20px", zIndex:9999, pointerEvents:"none",
        animation:`cfall ${Math.random()*2+1.8}s ${Math.random()*1.2}s linear forwards`,
      });
      root.appendChild(el); pieces.push(el);
    }
    if (!document.getElementById("cfall-style")) {
      const s = document.createElement("style"); s.id="cfall-style";
      s.textContent=`@keyframes cfall{0%{transform:translateY(0) rotate(0deg);opacity:1}85%{opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`;
      document.head.appendChild(s);
    }
    const t = setTimeout(()=>pieces.forEach(p=>p.remove()), 4500);
    return ()=>{ clearTimeout(t); pieces.forEach(p=>p.remove()); };
  }, [active]);
}

/* ─── FLOWER BURST ─── */
function FlowerBurst({ x, y, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return ()=>clearTimeout(t); }, []);
  const flowers = ["🌸","🌺","🌼","✨","💮","🌷","🌻","💐"];
  return (
    <div style={{ position:"fixed", left:x, top:y, pointerEvents:"none", zIndex:8000 }}>
      {[...Array(8)].map((_,i) => {
        const angle = (i/8)*360;
        const dist  = 55 + Math.random()*35;
        const rad   = angle*(Math.PI/180);
        return (
          <div key={i} style={{
            position:"absolute", fontSize:"1.3rem",
            animation:`flyburst 1.2s ease-out forwards`,
            "--tx": `${Math.cos(rad)*dist}px`,
            "--ty": `${Math.sin(rad)*dist}px`,
            animationDelay:`${i*0.04}s`,
          }}>
            {flowers[i%flowers.length]}
          </div>
        );
      })}
    </div>
  );
}

/* ─── TITLE EASTER EGG ─── */
function useTitleEasterEgg() {
  useEffect(() => {
    const original = document.title;
    const msgs = [
      "🌸 Hey Diya...", "✨ Still here?", "💌 Someone made this for you",
      "🌷 With a lot of care...", "😊 Hope you're smiling", "🎀 You deserve this",
      "💫 You're amazing", original,
    ];
    let i = 0;
    const tick = setInterval(() => {
      document.title = msgs[i % msgs.length];
      i++;
      if (i >= msgs.length) clearInterval(tick);
    }, 2800);
    const onHide = () => { if (document.hidden) { clearInterval(tick); document.title = original; } };
    document.addEventListener("visibilitychange", onHide);
    return () => { clearInterval(tick); document.removeEventListener("visibilitychange", onHide); document.title = original; };
  }, []);
}

/* ══════════════════════════════════════════════════
   PAGE 1 — NAME CONFIRMATION
══════════════════════════════════════════════════ */
function ConfirmPage({ onYes }) {
  const [noCount,   setNoCount]   = useState(0);
  const [noPos,     setNoPos]     = useState({ x:0, y:0 });
  const [confirmed, setConfirmed] = useState(false);
  const cardRef = useRef(null);
  const noMsgs  = ["No","Really?? 🥺","Are you sure...","Please 🙏","Think again! 😭","Noooo 😢"];

  const runAway = () => {
    const card = cardRef.current;
    if (!card) return;
    const w = card.offsetWidth, h = card.offsetHeight;
    setNoPos({ x:(Math.random()-0.5)*w*0.65, y:(Math.random()-0.5)*h*0.5 });
    setNoCount(c => Math.min(c+1, noMsgs.length-1));
  };

  const handleYes = () => { setConfirmed(true); setTimeout(onYes, 1700); };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{ background:"linear-gradient(140deg,#f0f7ff 0%,#f8fbff 60%,#f0f7ff 100%)" }}>
      <style>{`
        @keyframes blobFloat { from{transform:scale(1) translate(0,0)} to{transform:scale(1.18) translate(16px,12px)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn   { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
        @keyframes heartPop  { 0%,100%{transform:scale(1)} 40%{transform:scale(1.22)} 70%{transform:scale(.96)} }
        @keyframes flyburst  { to{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0} }
        .au { animation:fadeUp .65s ease both }
        .yes-btn:hover { transform:translateY(-3px) scale(1.05)!important; box-shadow:0 16px 40px rgba(59,130,246,.44)!important }
        .yes-btn { transition:transform .2s,box-shadow .2s }
      `}</style>

      <div style={{position:"absolute",top:"-120px",left:"-100px",width:"420px",height:"420px",borderRadius:"50%",
        background:"radial-gradient(circle,rgba(147,197,253,.25),transparent 70%)",
        animation:"blobFloat 7s ease-in-out infinite alternate",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-80px",right:"-60px",width:"320px",height:"320px",borderRadius:"50%",
        background:"radial-gradient(circle,rgba(59,130,246,.18),transparent 70%)",
        animation:"blobFloat 9s ease-in-out infinite alternate-reverse",pointerEvents:"none"}}/>

      {confirmed ? (
        <div style={{ textAlign:"center", animation:"scaleIn .5s ease both" }}>
          <div style={{ fontSize:"5rem", animation:"heartPop .7s ease infinite" }}>🌸</div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", color:"#1d4ed8",
            fontStyle:"italic", marginTop:"16px" }}>
            Yay! Opening something special...
          </p>
        </div>
      ) : (
        <div ref={cardRef} style={{
          background:"rgba(255,255,255,.9)", backdropFilter:"blur(18px)",
          border:"1.5px solid rgba(59,130,246,.15)", borderRadius:"28px",
          padding:"clamp(36px,6vw,60px) clamp(28px,5vw,52px)",
          maxWidth:"460px", width:"100%", overflow:"visible",
          boxShadow:"0 24px 64px rgba(59,130,246,.1),0 4px 20px rgba(0,0,0,.05)",
        }}>
          <p className="au text-center" style={{ animationDelay:".05s", fontSize:".7rem",
            letterSpacing:"3.5px", textTransform:"uppercase", color:"#4a7bad",
            marginBottom:"20px", fontFamily:"'Outfit',sans-serif" }}>
            ✦ &nbsp;a little something, just for you&nbsp; ✦
          </p>
          <h1 className="au text-center" style={{ animationDelay:".15s",
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,6vw,3rem)",
            color:"#0d1f38", lineHeight:1.2, marginBottom:"10px" }}>
            Are you <br/><em style={{ color:"#3b82f6" }}>Miss Diya?</em> 🌸
          </h1>
          <p className="au text-center" style={{ animationDelay:".25s", fontSize:".87rem",
            color:"#4a7bad", marginBottom:"38px", fontFamily:"'Outfit',sans-serif" }}>
            Before we begin, just need to confirm...
          </p>

          <div className="au" style={{ animationDelay:".35s", display:"flex", alignItems:"center",
            justifyContent:"center", gap:"20px", flexWrap:"wrap", minHeight:"56px", position:"relative" }}>
            <button className="yes-btn" onClick={handleYes} style={{
              padding:"13px 44px", borderRadius:"50px", border:"none", cursor:"pointer",
              background:"linear-gradient(135deg,#60a5fa,#2563eb)", color:"white",
              fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:".95rem",
              boxShadow:"0 10px 28px rgba(59,130,246,.32)", letterSpacing:".3px",
            }}>
              Yes, that's me! ✨
            </button>
            <div style={{ position:"relative", display:"inline-block" }}>
              <button onMouseEnter={runAway} onClick={runAway} style={{
                position:"relative",
                transform:`translate(${noPos.x}px,${noPos.y}px)`,
                transition:"transform .2s cubic-bezier(.34,1.56,.64,1)",
                padding:"12px 30px", borderRadius:"50px", cursor:"pointer",
                border:"1.5px solid rgba(159,107,122,.28)", background:"transparent",
                color:"#4a7bad", fontFamily:"'Outfit',sans-serif", fontSize:".88rem", whiteSpace:"nowrap",
              }}>
                {noMsgs[noCount]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE 2 — ENVELOPE OPEN + PHOTO
══════════════════════════════════════════════════ */
function EnvelopePage({ onNext }) {
  const [opened,  setOpened]  = useState(false);
  const [photoIn, setPhotoIn] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setPhotoIn(true), 750);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8"
      style={{ background:"linear-gradient(150deg,#f0f7ff,#f8fbff,#f0f9ff)" }}>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lidFlip  { from{transform:rotateX(0deg)} to{transform:rotateX(-165deg)} }
        @keyframes photoRise{ from{opacity:0;transform:translateY(70px) scale(.9)} to{opacity:1;transform:translateY(-70px) scale(1)} }
        @keyframes envGlow  { 0%,100%{box-shadow:0 8px 32px rgba(59,130,246,.14)} 50%{box-shadow:0 14px 52px rgba(59,130,246,.3)} }
        @keyframes nudge    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
      `}</style>

      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".72rem", letterSpacing:"4px",
        textTransform:"uppercase", color:"#4a7bad", animation:"fadeUp .6s ease both" }}>
        ✦ &nbsp;you've got mail&nbsp; ✦
      </p>

      {/* Envelope */}
      <div style={{ position:"relative", width:"280px", height:"196px",
        cursor:"pointer", perspective:"900px" }} onClick={open}>

        {/* Body */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(160deg,#eff6ff,#dbeafe)",
          borderRadius:"4px 4px 14px 14px",
          border:"1.5px solid rgba(59,130,246,.22)",
          boxShadow: opened ? "0 20px 60px rgba(59,130,246,.22)" : undefined,
          animation: opened ? "none" : "envGlow 2.5s ease-in-out infinite",
          overflow:"hidden",
        }}>
          {/* V-crease lines */}
          <div style={{ position:"absolute", bottom:0, left:0, width:"50%", height:"50%",
            borderRight:"1.5px solid rgba(59,130,246,.12)", borderTop:"1.5px solid rgba(59,130,246,.12)",
            transformOrigin:"bottom left", transform:"skewY(-20deg)" }}/>
          <div style={{ position:"absolute", bottom:0, right:0, width:"50%", height:"50%",
            borderLeft:"1.5px solid rgba(59,130,246,.12)", borderTop:"1.5px solid rgba(59,130,246,.12)",
            transformOrigin:"bottom right", transform:"skewY(20deg)" }}/>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"2.2rem",
            opacity: opened ? 0 : .65, transition:"opacity .3s" }}>💌</div>
        </div>

        {/* Lid */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:"110px",
          background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",
          clipPath:"polygon(0 0,50% 62%,100% 0)",
          transformOrigin:"top center",
          animation: opened ? "lidFlip .6s ease forwards" : "none",
          transformStyle:"preserve-3d", zIndex:10,
          filter:"drop-shadow(0 4px 10px rgba(59,130,246,.2))",
        }}/>

        {/* Tap hint */}
        {!opened && (
          <p style={{ position:"absolute", bottom:"-30px", left:"50%",
            transform:"translateX(-50%)", whiteSpace:"nowrap",
            fontSize:".75rem", color:"#3b82f6", fontFamily:"'Outfit',sans-serif",
            animation:"nudge 1.8s ease-in-out infinite" }}>
            tap to open ✨
          </p>
        )}

        {/* Photo rises */}
        {photoIn && (
          <div style={{
            position:"absolute", top:"-15px", left:"50%", transform:"translateX(-50%)",
            width:"118px", height:"128px", zIndex:5,
            animation:"photoRise .8s cubic-bezier(.34,1.4,.64,1) both",
          }}>
            <img src={PHOTO_ENVELOPE} alt="Diya" style={{
              width:"100%", height:"100%", objectFit:"cover",
              borderRadius:"12px", border:"3px solid white",
              boxShadow:"0 12px 36px rgba(59,130,246,.25)",
            }}/>
          </div>
        )}
      </div>

      {photoIn && (
        <div style={{ textAlign:"center", animation:"fadeUp .7s .3s ease both",
          opacity:0, animationFillMode:"forwards", marginTop:"76px" }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem",
            color:"#0d1f38", fontStyle:"italic", marginBottom:"8px" }}>
            A little letter for you 🌸
          </p>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".85rem",
            color:"#4a7bad", marginBottom:"28px" }}>
            Go ahead, read it...
          </p>
          <button onClick={onNext} style={{
            padding:"12px 38px", borderRadius:"50px", border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#60a5fa,#2563eb)", color:"white",
            fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:".9rem",
            boxShadow:"0 8px 24px rgba(59,130,246,.3)",
          }}>
            Read the letter →
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE 3 — LETTER + PHOTO
══════════════════════════════════════════════════ */
function LetterPage({ onNext }) {
  const [confetti, setConfetti] = useState(false);
  useConfetti(confetti);
  const go = () => { setConfetti(true); setTimeout(() => { setConfetti(false); onNext(); }, 2800); };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background:"linear-gradient(150deg,#f8fbff,#f0f7ff,#f0f9ff)" }}>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes paperIn  { from{opacity:0;transform:translateY(40px) rotate(-1.5deg)} to{opacity:1;transform:rotate(-1.5deg)} }
        @keyframes shimmer  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .shimmer-text {
          background:linear-gradient(90deg,#3b82f6,#1d4ed8,#3b82f6);
          background-size:200% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 4s ease infinite;
        }
        .go-btn:hover { transform:translateY(-2px) scale(1.04)!important; box-shadow:0 14px 36px rgba(59,130,246,.42)!important }
        .go-btn { transition:transform .2s,box-shadow .2s }
      `}</style>

      <div style={{ maxWidth:"680px", width:"100%" }}>
        {/* Paper */}
        <div style={{
          background:"#fffdf9", borderRadius:"4px",
          padding:"clamp(32px,5vw,52px) clamp(24px,5vw,48px)",
          boxShadow:"0 20px 60px rgba(0,0,0,.09),0 4px 16px rgba(0,0,0,.05)",
          animation:"paperIn .8s cubic-bezier(.34,1.4,.64,1) both",
          transform:"rotate(-1.5deg)", border:"1px solid rgba(59,130,246,.08)",
          position:"relative",
        }}>
          {/* Ruled lines */}
          {[...Array(9)].map((_,i) => (
            <div key={i} style={{ position:"absolute", left:"68px", right:"30px",
              top:`${136+i*38}px`, height:"1px", background:"rgba(59,130,246,.065)" }}/>
          ))}
          <div style={{ position:"absolute", left:"58px", top:0, bottom:0,
            width:"1px", background:"rgba(59,130,246,.13)" }}/>

          <div style={{ display:"flex", gap:"24px", alignItems:"flex-start", flexWrap:"wrap" }}>
            {/* Photo */}
            <div style={{ flexShrink:0, animation:"fadeUp .7s .2s ease both", opacity:0 }}>
              <img src={PHOTO_LETTER} alt="Diya" style={{
                width:"128px", height:"158px", objectFit:"cover",
                borderRadius:"8px", border:"3px solid white",
                boxShadow:"0 8px 28px rgba(59,130,246,.22)",
                transform:"rotate(2deg)",
              }}/>
            </div>

            {/* Text */}
            <div style={{ flex:1, minWidth:"220px" }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".7rem", letterSpacing:"3px",
                textTransform:"uppercase", color:"#4a7bad", marginBottom:"16px",
                animation:"fadeUp .6s .1s ease both", opacity:0 }}>
                ✦ a little note
              </p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(1.6rem,4vw,2.2rem)", lineHeight:1.2,
                marginBottom:"20px", animation:"fadeUp .6s .2s ease both", opacity:0 }}>
                My Friend <span className="shimmer-text">Diya</span>,
              </h2>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:".9rem", color:"#2d4a6b",
                lineHeight:1.88, animation:"fadeUp .6s .3s ease both", opacity:0 }}>
                <p style={{ marginBottom:"14px" }}>
                  Some days are just heavier than others — and that's completely okay. You don't always have to be strong.
                </p>
                <p style={{ marginBottom:"14px" }}>
                  But I want you to know: the girl who built her own diya_makeover, who shows up every single day, who has a kind heart and quiet strength — <em>that girl is you.</em>
                </p>
                <p>
                  I made this little thing because I wanted you to feel — even for just a minute — that someone out here genuinely cares. You deserve good days, good people, and all the warmth in the world. 🌸
                </p>
              </div>
              <div style={{ marginTop:"28px", textAlign:"right",
                animation:"fadeUp .6s .45s ease both", opacity:0 }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                  fontSize:"1rem", color:"#4a7bad" }}>— with care, always 🌷</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:"34px",
          animation:"fadeUp .6s .55s ease both", opacity:0 }}>
          <button className="go-btn" onClick={go} style={{
            padding:"13px 42px", borderRadius:"50px", border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#60a5fa,#2563eb)", color:"white",
            fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:".92rem",
            boxShadow:"0 10px 28px rgba(59,130,246,.3)",
          }}>
            Continue ✨
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE 4 — MOOD SELECTOR
══════════════════════════════════════════════════ */
const MOODS = [
  { emoji:"😴", label:"Tired",    color:"#818cf8", msg:"Rest is not laziness — it's how you recharge your superpowers. Take it easy today. 💜" },
  { emoji:"🤕", label:"In pain",  color:"#3b82f6", msg:"Your body is working hard right now. Be gentle with it. Warmth, rest, comfort — you deserve it all. 🌸" },
  { emoji:"😔", label:"Low mood", color:"#6b7280", msg:"Feelings pass like weather. This cloud won't stay forever. You're allowed to just... be. 🌧️→🌤️" },
  { emoji:"😤", label:"Annoyed",  color:"#f97316", msg:"Valid! Annoyed days happen. Maybe some chai and peace is the medicine today. ☕" },
  { emoji:"🙂", label:"Okay-ish", color:"#22c55e", msg:"Okay-ish is still good. Not every day needs to be amazing. You're doing just fine. 💚" },
  { emoji:"😊", label:"Happy",    color:"#3b82f6", msg:"That smile suits you SO well. Hold on to whatever made today good. 🌸✨" },
];

function MoodPage({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [shown,    setShown]    = useState(false);

  const pick = (m) => { setSelected(m); setShown(false); setTimeout(()=>setShown(true), 80); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8"
      style={{ background:"linear-gradient(140deg,#f0f9ff,#f8fbff,#f0f7ff)" }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes msgPop  { from{opacity:0;transform:scale(.92) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .mood-btn:hover { transform:translateY(-5px) scale(1.08)!important }
        .mood-btn { transition:transform .18s,box-shadow .18s }
        .next-btn:hover { transform:translateY(-2px)!important; box-shadow:0 14px 36px rgba(59,130,246,.42)!important }
        .next-btn { transition:transform .2s,box-shadow .2s }
      `}</style>

      <div style={{ textAlign:"center", animation:"fadeUp .6s ease both" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".72rem", letterSpacing:"4px",
          textTransform:"uppercase", color:"#4a7bad", marginBottom:"16px" }}>
          ✦ &nbsp;tell me&nbsp; ✦
        </p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(1.9rem,5vw,2.8rem)", color:"#0d1f38", lineHeight:1.2 }}>
          How are you feeling <br/><em style={{ color:"#3b82f6" }}>right now?</em>
        </h2>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"14px", justifyContent:"center",
        maxWidth:"480px", animation:"fadeUp .6s .15s ease both",
        opacity:0, animationFillMode:"forwards" }}>
        {MOODS.map(m => (
          <button key={m.label} className="mood-btn" onClick={() => pick(m)} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
            padding:"18px 20px", borderRadius:"18px", border:"none", cursor:"pointer",
            background: selected?.label===m.label ? m.color : "white",
            color:       selected?.label===m.label ? "white" : "#2d4a6b",
            boxShadow:   selected?.label===m.label
              ? `0 10px 32px ${m.color}55` : "0 4px 16px rgba(0,0,0,.06)",
            transition:"all .22s", minWidth:"100px",
          }}>
            <span style={{ fontSize:"2rem" }}>{m.emoji}</span>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:".82rem", fontWeight:500 }}>{m.label}</span>
          </button>
        ))}
      </div>

      {shown && selected && (
        <div style={{
          maxWidth:"440px", width:"100%", background:"white", borderRadius:"20px",
          padding:"28px", border:`1.5px solid ${selected.color}33`,
          boxShadow:`0 12px 40px ${selected.color}22`,
          animation:"msgPop .45s cubic-bezier(.34,1.4,.64,1) both", textAlign:"center",
        }}>
          <div style={{ fontSize:"2.2rem", marginBottom:"12px" }}>{selected.emoji}</div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".92rem", color:"#2d4a6b", lineHeight:1.8 }}>
            {selected.msg}
          </p>
        </div>
      )}

      {selected && (
        <button className="next-btn" onClick={onNext} style={{
          padding:"12px 40px", borderRadius:"50px", border:"none", cursor:"pointer",
          background:"linear-gradient(135deg,#60a5fa,#2563eb)", color:"white",
          fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:".9rem",
          boxShadow:"0 8px 24px rgba(59,130,246,.28)",
          animation:"fadeUp .5s ease both",
        }}>
          Keep going ✨
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE 5 — COMFORT BUTTONS + FLOWER BURST
══════════════════════════════════════════════════ */
const COMFORTS = [
  { label:"You're doing great 💪",  reply:"And I mean it! Every single day you show up. That's huge. 🌟" },
  { label:"You look beautiful 🌸",  reply:"Inside and out — always. Don't let anyone tell you otherwise. 💕" },
  { label:"Take a deep breath 🌬️", reply:"In... and out. There. The world can wait a moment. You're okay. 🌿" },
  { label:"You are loved 💌",       reply:"More than you might realise right now. Truly. 🌷" },
  { label:"Rest is okay 🌙",        reply:"You don't have to earn rest. It's yours. Take it. 💜" },
  { label:"Proud of you ✨",        reply:"For building your own thing. For showing up. For being you. 🎀" },
];

function ComfortPage({ onNext }) {
  const [bursts,   setBursts]   = useState([]);
  const [messages, setMessages] = useState({});

  const handleClick = (e, c) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id   = Date.now() + Math.random();
    setBursts(b => [...b, { id, x:rect.left+rect.width/2, y:rect.top+rect.height/2 }]);
    setMessages(m => ({ ...m, [c.label]: c.reply }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8 relative"
      style={{ background:"linear-gradient(150deg,#f0f7ff,#f8fbff,#f0f9ff)" }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes flyburst{ to{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0} }
        @keyframes replyIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .cbtn:hover { transform:translateY(-3px) scale(1.04)!important; box-shadow:0 12px 32px rgba(59,130,246,.2)!important }
        .cbtn { transition:all .18s }
        .next-btn:hover { transform:translateY(-2px)!important; box-shadow:0 14px 36px rgba(59,130,246,.42)!important }
        .next-btn { transition:transform .2s,box-shadow .2s }
      `}</style>

      {bursts.map(b => (
        <FlowerBurst key={b.id} x={b.x} y={b.y}
          onDone={() => setBursts(prev => prev.filter(p => p.id !== b.id))} />
      ))}

      <div style={{ textAlign:"center", animation:"fadeUp .6s ease both" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".72rem", letterSpacing:"4px",
          textTransform:"uppercase", color:"#4a7bad", marginBottom:"16px" }}>
          ✦ &nbsp;tap one&nbsp; ✦
        </p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(1.9rem,5vw,2.8rem)", color:"#0d1f38", lineHeight:1.2 }}>
          What do you need <br/><em style={{ color:"#3b82f6" }}>to hear today?</em>
        </h2>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"14px", justifyContent:"center",
        maxWidth:"540px", animation:"fadeUp .6s .15s ease both",
        opacity:0, animationFillMode:"forwards" }}>
        {COMFORTS.map(c => (
          <div key={c.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
            <button className="cbtn" onClick={e => handleClick(e, c)} style={{
              padding:"13px 22px", borderRadius:"50px", border:"none", cursor:"pointer",
              background: messages[c.label] ? "linear-gradient(135deg,#60a5fa,#2563eb)" : "white",
              color: messages[c.label] ? "white" : "#2d4a6b",
              fontFamily:"'Outfit',sans-serif", fontSize:".85rem", fontWeight:500,
              boxShadow: messages[c.label]
                ? "0 8px 24px rgba(59,130,246,.32)" : "0 4px 16px rgba(0,0,0,.07)",
            }}>
              {c.label}
            </button>
            {messages[c.label] && (
              <p style={{ textAlign:"center", fontSize:".78rem", color:"#4a7bad",
                maxWidth:"160px", lineHeight:1.55, animation:"replyIn .35s ease both",
                fontFamily:"'Outfit',sans-serif" }}>
                {messages[c.label]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button className="next-btn" onClick={onNext} style={{
        padding:"12px 40px", borderRadius:"50px", border:"none", cursor:"pointer",
        background:"linear-gradient(135deg,#60a5fa,#2563eb)", color:"white",
        fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:".9rem",
        boxShadow:"0 8px 24px rgba(59,130,246,.28)",
        animation:"fadeUp .5s .3s ease both", opacity:0, animationFillMode:"forwards",
      }}>
        One more thing... ✨
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE 6 — FINAL + EASTER EGG
══════════════════════════════════════════════════ */
function FinalPage() {
  useTitleEasterEgg();
  const [clicks,   setClicks]   = useState(0);
  const [eggFound, setEggFound] = useState(false);
  const [confetti, setConfetti] = useState(false);
  useConfetti(confetti);

  const hitSecret = () => {
    const n = clicks + 1;
    setClicks(n);
    if (n >= 5) { setEggFound(true); setConfetti(true); setTimeout(()=>setConfetti(false),4500); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8 text-center relative overflow-hidden"
      style={{ background:"linear-gradient(150deg,#f0f7ff,#f8fbff,#f0f9ff)" }}>
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes eggReveal { from{opacity:0;transform:scale(.8) rotate(-2deg)} to{opacity:1;transform:scale(1) rotate(0)} }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .shimmer-text {
          background:linear-gradient(90deg,#3b82f6,#1d4ed8,#3b82f6);
          background-size:200% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 4s ease infinite;
        }
      `}</style>

      <div style={{ position:"absolute", top:"-80px", left:"-80px", width:"300px", height:"300px",
        borderRadius:"50%", background:"radial-gradient(circle,rgba(147,197,253,.2),transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"260px", height:"260px",
        borderRadius:"50%", background:"radial-gradient(circle,rgba(186,230,255,.18),transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ animation:"fadeUp .6s ease both" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".72rem", letterSpacing:"4px",
          textTransform:"uppercase", color:"#4a7bad", marginBottom:"16px" }}>
          ✦ &nbsp;lastly&nbsp; ✦
        </p>
        <div style={{ fontSize:"3.5rem", marginBottom:"20px", animation:"floatUp 3s ease-in-out infinite" }}>🌸</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(2rem,5vw,3rem)", color:"#0d1f38", lineHeight:1.2, marginBottom:"16px" }}>
          You are <span className="shimmer-text">enough</span>,<br/>just as you are.
        </h2>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".92rem", color:"#4a7bad",
          maxWidth:"360px", margin:"0 auto 36px", lineHeight:1.8 }}>
          On good days and tough days both. Someone out here is quietly rooting for you — always. 💌
        </p>

        {/* ── Shayari ── */}
        <div style={{
          maxWidth: "400px", margin: "0 auto",
          padding: "28px 30px",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(59,130,246,0.08)",
          animation: "fadeUp .7s .3s ease both", opacity: 0, animationFillMode: "forwards",
        }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".65rem", letterSpacing:"3px",
            textTransform:"uppercase", color:"#3b82f6", marginBottom:"18px" }}>
            ✦ &nbsp;Apke liye&nbsp; ✦
          </p>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
            fontSize:"clamp(1rem,2.6vw,1.18rem)", color:"#1e3a5f", lineHeight:2 }}>
            <p>Thakaan mein bhi jo muskurati hai,</p>
            <p>woh ladki kuch khaas hoti hai.</p>
            <p style={{ marginTop:"12px" }}>Apne haathon se sapne bunti hai,</p>
            <p style={{ marginTop:0 }}>
              <span style={{
                background: "linear-gradient(90deg,#3b82f6,#1d4ed8,#3b82f6)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease infinite",
                fontWeight: 600,
              }}>
                woh Diya — roshan hoti hai.
              </span>
            </p>
          </div>
          <div style={{ marginTop:"18px", width:"36px", height:"1px", margin:"18px auto 0",
            background:"linear-gradient(90deg,transparent,rgba(59,130,246,.4),transparent)" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".72rem",
            color:"#7ab0d4", marginTop:"14px", letterSpacing:"1px" }}>
            — Try kiya hai , Bs Apke Liye 
          </p>
        </div>
      </div>

      {eggFound ? (
        <div style={{
          maxWidth:"400px", width:"100%", background:"white", borderRadius:"24px",
          padding:"32px 28px", border:"1.5px solid rgba(59,130,246,.2)",
          boxShadow:"0 12px 48px rgba(59,130,246,.15)",
          animation:"eggReveal .5s cubic-bezier(.34,1.4,.64,1) both",
        }}>
          <div style={{ fontSize:"2rem", marginBottom:"12px" }}>🥚✨</div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".7rem", letterSpacing:"3px",
            textTransform:"uppercase", color:"#3b82f6", marginBottom:"14px" }}>
            you found it!
          </p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem",
            color:"#0d1f38", lineHeight:1.65, fontStyle:"italic", marginBottom:"14px" }}>
            "I spent way too long making this perfect — and I'd do it all over again, just to see you smile."
          </p>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:".78rem", color:"#4a7bad" }}>
            — the developer 🌷
          </p>
        </div>
      ) : (
        /* Secret dot — 5 clicks to find the egg */
        <div
          onClick={hitSecret}
          title=""
          style={{
            position:"fixed", bottom:"18px", right:"20px",
            width:"9px", height:"9px", borderRadius:"50%", cursor:"default",
            background: clicks > 0 ? `rgba(59,130,246,${0.12*clicks+0.06})` : "rgba(59,130,246,.07)",
            transition:"background .3s",
          }}
        />
      )}

      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
        fontSize:".95rem", color:"#7ab0d4",
        animation:"fadeUp .6s .4s ease both", opacity:0, animationFillMode:"forwards" }}>
        Made with care, for someone worth it 🌸
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("confirm");
  const go = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <>
      <FontLoader/>
      <div id="confetti-root" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9999 }}/>
      {page==="confirm"  && <ConfirmPage  onYes={()=>go("envelope")}/>}
      {page==="envelope" && <EnvelopePage onNext={()=>go("letter")}/>}
      {page==="letter"   && <LetterPage   onNext={()=>go("mood")}/>}
      {page==="mood"     && <MoodPage     onNext={()=>go("comfort")}/>}
      {page==="comfort"  && <ComfortPage  onNext={()=>go("final")}/>}
      {page==="final"    && <FinalPage/>}
    </>
  );
}
