import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

const SUPABASE_BASE = "https://sfcdblplahbykivwhiaa.supabase.co/storage/v1/object/public/music/";

const AUDIO_TRACKS = [
  { id: "rapid-arrival", title: "Rapid Arrival", file: "RapidArival.m4a" },
];

export default function Reel2() {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const playTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  const togglePlay = (index) => {
    if (currentIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      playTrack(index);
    }
  };

  const handleEnded = () => {
    const next = currentIndex + 1;
    if (next < AUDIO_TRACKS.length) {
      playTrack(next);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="reel-page">
      <div style={{ position: "relative", minHeight: "70vh" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "130%",
              backgroundImage: "url('/preview.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
              transform: `translateY(${scrollY * 0.35}px)`,
              willChange: "transform",
            }}
          />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,19,19,0.35) 0%, rgba(21,19,19,0.85) 75%, var(--ink) 100%)" }} />
        <div className="catalog-root" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>
          <a href="https://music.youtube.com/@chitcray?si=xToZ5NkJPf7HxsV0" target="_blank" rel="noopener noreferrer" aria-label="Listen on YouTube Music" style={{ display: "inline-flex", alignItems: "center", opacity: 0.9, marginBottom: 16 }}>
            <img src="/youtube-music-zkkh10gbed6ker8x0adgd.png" alt="YouTube Music" style={{ height: 80, width: 80 }} />
          </a>
          <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--accent)", marginBottom: 14 }}>
            REEL 002 — {AUDIO_TRACKS.length} TRACKS LOGGED
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 58px)", fontWeight: 600, lineHeight: 1.05, margin: 0, letterSpacing: "-0.01em" }}>
            Chit<br /><span style={{ color: "var(--accent)" }}>Cray</span>
          </h1>
        </div>
      </div>

      <div className="catalog-root" style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 60px" }}>
        {currentIndex !== null && (
          <audio ref={audioRef} src={SUPABASE_BASE + AUDIO_TRACKS[currentIndex].file} onEnded={handleEnded} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
        )}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {AUDIO_TRACKS.map((track, i) => {
            const isActive = currentIndex === i;
            return (
              <div key={track.id} className="track-row" tabIndex={0} style={{ display: "grid", gridTemplateColumns: "32px 1fr 44px", alignItems: "center", gap: 16, padding: "16px 8px", borderBottom: "1px solid var(--line)", cursor: "pointer" }} onClick={() => togglePlay(i)}>
                <span className="mono" style={{ fontSize: 12, color: "rgba(237,230,218,0.4)" }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{track.title}</div>
                <button className="play-btn" aria-label={isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`} style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`, background: isActive && isPlaying ? "var(--accent)" : "transparent", color: isActive && isPlaying ? "var(--ink)" : "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); togglePlay(i); }}>
                  {isActive && isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/" className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--accent)", textDecoration: "none", border: "1px solid var(--accent)", padding: "10px 20px", borderRadius: 999 }}>
            ← BACK TO REEL 001
          </Link>
        </div>
      </div>
    </div>
  );
}