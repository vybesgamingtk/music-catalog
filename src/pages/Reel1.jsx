import React, { useState, useEffect } from "react";
import { Play, Pause, Circle } from "lucide-react";
import { Link } from "react-router-dom";

const TRACKS = [
  { id: "IjlZBQzbpoc", title: "Crash out", status: "finished" },
  { id: "o5IeL0_tIys", title: "Cantaloupes", status: "finished" },
  { id: "dr85VIVQJVk", title: "Drama", status: "finished" },
  { id: "pcX5haA185U", title: "Elevator freestyle 1", status: "finished" },
  { id: "XU4_QGSf94A", title: "Benghazi", status: "finished" },
  { id: "VJYM_mtkNGk", title: "Ballin 4 no reason", status: "finished" },
  { id: "Ez9n5RrNrVE", title: "sub", status: "finished" },
  { id: "ityxyMylXoI", title: "Cahoots", status: "finished" },
];

export default function Reel1() {
  const [openId, setOpenId] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const finishedCount = TRACKS.filter((t) => t.status === "finished").length;
  const sketchCount = TRACKS.length - finishedCount;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            REEL 001 — {TRACKS.length} TRACKS LOGGED
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 58px)", fontWeight: 600, lineHeight: 1.05, margin: 0, letterSpacing: "-0.01em" }}>
            A working log,<br /><span style={{ color: "var(--accent)" }}>not a feed.</span>
          </h1>
          <p style={{ maxWidth: 440, marginTop: 20, fontSize: 16, lineHeight: 1.6, color: "rgba(237,230,218,0.85)" }}>
            Ten years of sound, some finished, some still open. This is the room
            before the room — everything gets logged here first, off the platforms,
            on its own terms.
          </p>
          <div className="mono" style={{ display: "flex", gap: 24, marginTop: 28, fontSize: 12, color: "rgba(237,230,218,0.7)" }}>
            <span><Circle size={7} fill="var(--accent)" color="var(--accent)" style={{ verticalAlign: "middle", marginRight: 6 }} />{finishedCount} FINISHED</span>
            {sketchCount > 0 && <span><Circle size={7} fill="var(--sketch)" color="var(--sketch)" style={{ verticalAlign: "middle", marginRight: 6 }} />{sketchCount} SKETCHES</span>}
          </div>
        </div>
      </div>

      <div className="catalog-root" style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 60px" }}>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {TRACKS.map((track, i) => {
            const isOpen = openId === track.id;
            return (
              <div key={track.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <div className="track-row" tabIndex={0} style={{ display: "grid", gridTemplateColumns: "32px 1fr 100px 44px", alignItems: "center", gap: 16, padding: "16px 8px", cursor: "pointer" }} onClick={() => setOpenId(isOpen ? null : track.id)}>
                  <span className="mono" style={{ fontSize: 12, color: "rgba(237,230,218,0.4)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ fontSize: 17, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                    {track.title}
                    {track.status === "sketch" && <span className="mono" style={{ fontSize: 10, color: "var(--sketch)", border: "1px solid var(--sketch)", borderRadius: 3, padding: "1px 5px", letterSpacing: 1 }}>SKETCH</span>}
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: "rgba(237,230,218,0.4)", textAlign: "right" }}>YOUTUBE</span>
                  <button className="play-btn" aria-label={isOpen ? `Close ${track.title}` : `Open ${track.title}`} style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${isOpen ? "var(--accent)" : "var(--line)"}`, background: isOpen ? "var(--accent)" : "transparent", color: isOpen ? "var(--ink)" : "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setOpenId(isOpen ? null : track.id); }}>
                    {isOpen ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
                  </button>
                </div>
                {isOpen && (
                  <div style={{ padding: "0 8px 20px" }}>
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 8, overflow: "hidden" }}>
                      <iframe src={`https://www.youtube.com/embed/${track.id}`} title={track.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/reel-two" className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--accent)", textDecoration: "none", border: "1px solid var(--accent)", padding: "10px 20px", borderRadius: 999 }}>
            LISTEN — AUDIO ONLY →
          </Link>
        </div>
      </div>
    </div>
  );
}