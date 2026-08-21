import React, { useState, useEffect } from "react";
import { Play, Pause, Circle } from "lucide-react";

// ---- Mock data — swap this for your real catalog once wired to real files ----
const TRACKS = [
  { id: 1, title: "Undertow", status: "finished", duration: "3:42", year: "2019", note: "first thing I ever finished" },
  { id: 2, title: "Glass Weather", status: "finished", duration: "2:58", year: "2020" },
  { id: 3, title: "Kite String (sketch)", status: "sketch", duration: "1:14", year: "2021" },
  { id: 4, title: "Low Tide Radio", status: "finished", duration: "4:21", year: "2022" },
  { id: 5, title: "Static Bloom", status: "sketch", duration: "0:52", year: "2023" },
  { id: 6, title: "Coastal Drift II", status: "finished", duration: "3:15", year: "2023" },
  { id: 7, title: "Everything At Once", status: "finished", duration: "5:03", year: "2024" },
  { id: 8, title: "Hallway Loop (sketch)", status: "sketch", duration: "2:07", year: "2024" },
];

function Waveform({ active }) {
  const bars = 40;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 20 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 4 + Math.abs(Math.sin(i * 0.7 + (active ? Date.now() / 300 : 0))) * 14;
        return (
          <div
            key={i}
            style={{
              width: 2,
              height: active ? h : 4 + (i % 5) * 2,
              background: active ? "var(--accent)" : "var(--line)",
              borderRadius: 1,
              transition: "height 0.15s ease",
            }}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (playingId === null) return;
    const t = setInterval(() => {}, 150);
    return () => clearInterval(t);
  }, [playingId]);

  const finishedCount = TRACKS.filter((t) => t.status === "finished").length;
  const sketchCount = TRACKS.length - finishedCount;

  return (
    <div
      style={{
        "--ink": "#151313",
        "--paper": "#EDE6DA",
        "--accent": "#C6672B",
        "--sketch": "#5C7A73",
        "--line": "#3A3532",
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--paper)",
        fontFamily: "'Iowan Old Style', 'Georgia', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap');
        .catalog-root { font-family: 'Fraunces', Georgia, serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .track-row:hover { background: rgba(198,103,43,0.08); }
        .track-row:focus-visible, .play-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>

      <div className="catalog-root" style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px 100px" }}>
        <div style={{ marginBottom: 56 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--accent)", marginBottom: 14 }}>
            REEL 001 — {TRACKS.length} TRACKS LOGGED
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 58px)", fontWeight: 600, lineHeight: 1.05, margin: 0, letterSpacing: "-0.01em" }}>
            A working log,<br /><span style={{ color: "var(--accent)" }}>not a feed.</span>
          </h1>
          <p style={{ maxWidth: 440, marginTop: 20, fontSize: 16, lineHeight: 1.6, color: "rgba(237,230,218,0.72)" }}>
            Ten years of sound, some finished, some still open. This is the room
            before the room — everything gets logged here first, off the platforms,
            on its own terms.
          </p>
          <div className="mono" style={{ display: "flex", gap: 24, marginTop: 28, fontSize: 12, color: "rgba(237,230,218,0.55)" }}>
            <span><Circle size={7} fill="var(--accent)" color="var(--accent)" style={{ verticalAlign: "middle", marginRight: 6 }} />{finishedCount} FINISHED</span>
            <span><Circle size={7} fill="var(--sketch)" color="var(--sketch)" style={{ verticalAlign: "middle", marginRight: 6 }} />{sketchCount} SKETCHES</span>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {TRACKS.map((track, i) => {
            const isPlaying = playingId === track.id;
            return (
              <div
                key={track.id}
                className="track-row"
                tabIndex={0}
                style={{ display: "grid", gridTemplateColumns: "32px 1fr 120px 60px 44px", alignItems: "center", gap: 16, padding: "16px 8px", borderBottom: "1px solid var(--line)", cursor: "pointer" }}
                onClick={() => setPlayingId(isPlaying ? null : track.id)}
              >
                <span className="mono" style={{ fontSize: 12, color: "rgba(237,230,218,0.4)" }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                    {track.title}
                    {track.status === "sketch" && (
                      <span className="mono" style={{ fontSize: 10, color: "var(--sketch)", border: "1px solid var(--sketch)", borderRadius: 3, padding: "1px 5px", letterSpacing: 1 }}>SKETCH</span>
                    )}
                  </div>
                  {track.note && <div style={{ fontSize: 13, color: "rgba(237,230,218,0.5)", marginTop: 2 }}>{track.note}</div>}
                </div>
                <Waveform active={isPlaying} />
                <span className="mono" style={{ fontSize: 12, color: "rgba(237,230,218,0.5)", textAlign: "right" }}>{track.duration}</span>
                <button
                  className="play-btn"
                  aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${isPlaying ? "var(--accent)" : "var(--line)"}`, background: isPlaying ? "var(--accent)" : "transparent", color: isPlaying ? "var(--ink)" : "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setPlayingId(isPlaying ? null : track.id); }}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mono" style={{ marginTop: 40, fontSize: 12, color: "rgba(237,230,218,0.35)", textAlign: "center" }}>
          MORE REELS COMING — VIDEO LOG NEXT
        </div>
      </div>
    </div>
  );
}